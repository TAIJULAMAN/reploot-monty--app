import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Dumbbell,
  Flame,
  LayoutGrid,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";
import {
  DynamicWorkoutPathDetail,
  WORKOUT_PATH_DETAILS_MAP,
} from "../data/workoutPathDetailData";
import { useNavigation } from "expo-router";
import { GenericWorkoutDetailScreen } from "./GenericWorkoutDetailScreen";
import { WorkoutLibraryScreen } from "./WorkoutLibraryScreen";

const { width } = Dimensions.get("window");

export type WorkoutPathId =
  | "push"
  | "pull"
  | "upper"
  | "lower"
  | "fullbody"
  | "library";

interface GymPathCardConfig {
  id: WorkoutPathId;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  arrowColor: string;
  iconBg: string;
  iconBorder: string;
  glowAura: string;
  icon: React.ReactNode;
}

export interface GymWorkoutPathScreenProps {
  onSelectPath?: (pathId: WorkoutPathId) => void;
}

export const GymWorkoutPathScreen: React.FC<GymWorkoutPathScreenProps> = ({
  onSelectPath,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activePath, setActivePath] = useState<WorkoutPathId | null>(null);

  React.useEffect(() => {
    try {
      navigation.setOptions({
        tabBarStyle: activePath ? { display: "none" } : undefined,
      });
    } catch {
      // ignore
    }
  }, [activePath, navigation]);

  const handleCardPress = (pathId: WorkoutPathId) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    setActivePath(pathId);

    if (onSelectPath) {
      onSelectPath(pathId);
    }
  };

  // If user selected Workout Library, open library screen
  if (activePath === "library") {
    return <WorkoutLibraryScreen onBack={() => setActivePath(null)} />;
  }

  // Dynamic Workout Handler: Use single common screen for Push, Pull, Upper, Lower, Full Body
  if (activePath && WORKOUT_PATH_DETAILS_MAP[activePath]) {
    return (
      <GenericWorkoutDetailScreen
        workout={WORKOUT_PATH_DETAILS_MAP[activePath]}
        onBack={() => setActivePath(null)}
      />
    );
  }

  const PATH_CARDS: GymPathCardConfig[] = [
    {
      id: "push",
      title: "PUSH DAY",
      subtitle: "Chest, Shoulders & Triceps focus",
      tag: "+50 XP",
      tagColor: "#C5C0FF",
      tagBg: "rgba(129, 140, 248, 0.15)",
      arrowColor: "#818CF8",
      iconBg: "rgba(108, 92, 255, 0.18)",
      iconBorder: "rgba(129, 140, 248, 0.35)",
      glowAura: "rgba(129, 140, 248, 0.12)",
      icon: <Zap size={20} color="#C5C0FF" />,
    },
    {
      id: "pull",
      title: "PULL DAY",
      subtitle: "Back, Biceps & Rear Delts focus",
      tag: "+50 XP",
      tagColor: "#38EDD8",
      tagBg: "rgba(56, 237, 216, 0.12)",
      arrowColor: "#38EDD8",
      iconBg: "rgba(56, 237, 216, 0.16)",
      iconBorder: "rgba(56, 237, 216, 0.35)",
      glowAura: "rgba(56, 237, 216, 0.12)",
      icon: <User size={20} color="#38EDD8" />,
    },
    {
      id: "upper",
      title: "UPPER BODY",
      subtitle: "Chest, Back, Arms & Delts",
      tag: "+60 XP",
      tagColor: "#C5C0FF",
      tagBg: "rgba(129, 140, 248, 0.15)",
      arrowColor: "#818CF8",
      iconBg: "rgba(108, 92, 255, 0.18)",
      iconBorder: "rgba(129, 140, 248, 0.35)",
      glowAura: "rgba(129, 140, 248, 0.12)",
      icon: <Dumbbell size={20} color="#C5C0FF" />,
    },
    {
      id: "lower",
      title: "LOWER BODY",
      subtitle: "Quads, Glutes, Calves & Hams",
      tag: "+60 XP",
      tagColor: "#38EDD8",
      tagBg: "rgba(56, 237, 216, 0.12)",
      arrowColor: "#38EDD8",
      iconBg: "rgba(56, 237, 216, 0.16)",
      iconBorder: "rgba(56, 237, 216, 0.35)",
      glowAura: "rgba(56, 237, 216, 0.12)",
      icon: <Activity size={20} color="#38EDD8" />,
    },
    {
      id: "fullbody",
      title: "FULL BODY",
      subtitle: "Total compound power & endurance",
      tag: "+75 XP",
      tagColor: "#C5C0FF",
      tagBg: "rgba(129, 140, 248, 0.15)",
      arrowColor: "#818CF8",
      iconBg: "rgba(108, 92, 255, 0.18)",
      iconBorder: "rgba(129, 140, 248, 0.35)",
      glowAura: "rgba(129, 140, 248, 0.12)",
      icon: <Flame size={20} color="#C5C0FF" />,
    },
    {
      id: "library",
      title: "LIBRARY",
      subtitle: "Browse all gym routine programs",
      tag: "EXPLORE",
      tagColor: "#38EDD8",
      tagBg: "rgba(56, 237, 216, 0.12)",
      arrowColor: "#38EDD8",
      iconBg: "rgba(56, 237, 216, 0.16)",
      iconBorder: "rgba(56, 237, 216, 0.35)",
      glowAura: "rgba(56, 237, 216, 0.12)",
      icon: <LayoutGrid size={20} color="#38EDD8" />,
    },
  ];

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <CustomHeader transparent={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom + 100, 120),
          },
        ]}
      >
        {/* Title Section with Masked Gradient Title (Exact progress.tsx pattern) */}
        <View style={styles.titleSection}>
          <Text style={styles.categoryBadge}>GYM WORKOUT</Text>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={2}>
                    {"SELECT YOUR\nPATH"}
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </MaskedView>
          </View>
          <Text style={styles.subtitle}>
            Choose your athletic focus & telemetry for today's session
          </Text>
        </View>

        {/* 2-Column Workout Path Cards Grid matching screenshot */}
        <View style={styles.cardsGrid}>
          {PATH_CARDS.map((item) => (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => handleCardPress(item.id)}
            >
              {/* Radial Glow Overlay */}
              <View
                style={[styles.glowAura, { backgroundColor: item.glowAura }]}
                pointerEvents="none"
              />

              {/* Card Top Row: Icon Badge + XP Pill */}
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: item.iconBg,
                      borderColor: item.iconBorder,
                    },
                  ]}
                >
                  {item.icon}
                </View>

                <View style={[styles.tagPill, { backgroundColor: item.tagBg }]}>
                  <Text style={[styles.tagText, { color: item.tagColor }]}>
                    {item.tag}
                  </Text>
                </View>
              </View>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <ArrowRight size={17} color={item.arrowColor} />
              </View>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  titleSection: {
    marginBottom: 26,
    marginTop: 4,
  },
  categoryBadge: {
    color: "#44EAC3",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  maskedTitleWrapper: {
    height: 84,
    width: "100%",
    marginBottom: 4,
    justifyContent: "center",
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    textAlign: "left",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
  },

  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  card: {
    width: (width - 54) / 2,
    height: 194,
    backgroundColor: "rgba(18, 22, 33, 0.72)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  glowAura: {
    position: "absolute",
    bottom: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.15,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 6,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  cardSubtitle: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "monospace",
    fontWeight: "600",
  },
});
