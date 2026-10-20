import MaskedView from "@react-native-masked-view/masked-view";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Clock,
  Flame,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  HOME_WORKOUT_LIBRARY_DATA,
  HomeChallengeItem,
} from "../data/homeWorkoutLibraryData";

export interface ChallengesScreenProps {
  onBack?: () => void;
  onSelectChallenge?: (challenge: HomeChallengeItem) => void;
}

export const ChallengesScreen: React.FC<ChallengesScreenProps> = ({
  onBack,
  onSelectChallenge,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/workouts/home" as any);
    }
  };

  const handleChallengePress = (challenge: HomeChallengeItem) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onSelectChallenge) {
      onSelectChallenge(challenge);
    } else {
      router.push({
        pathname: "/workouts/ai-session" as any,
        params: { pathId: challenge.id },
      });
    }
  };

  const challengesList = [
    ...HOME_WORKOUT_LIBRARY_DATA.upcomingChallenges,
    {
      id: "hyper-hiit",
      dayBadge: "IN 3 DAYS",
      title: "HYPER HIIT BLITZ",
      xp: "+350 XP",
      image: require("../../../../assets/library/l5.png"),
    },
    {
      id: "titan-mobility",
      dayBadge: "WEEKEND SPECIAL",
      title: "TITAN MOBILITY FLOW",
      xp: "+400 XP",
      image: require("../../../../assets/library/l4.png"),
    },
    {
      id: "valkyrie-strength",
      dayBadge: "UPCOMING",
      title: "VALKYRIE CORE MATRIX",
      xp: "+500 XP",
      image: require("../../../../assets/library/l8.png"),
    },
  ];

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <CustomHeader
        transparent={true}
        showBackButton={true}
        onPressBack={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 32, 60) },
        ]}
      >
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.categoryBadge}>SPECIAL EVENTS</Text>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={2}>
                    {"UPCOMING\nCHALLENGES"}
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
            Compete in time-limited neural challenges to earn bonus XP, unlock
            badges, and test your physical limits.
          </Text>
        </View>

        {/* Challenges List */}
        <View style={styles.challengesContainer}>
          {challengesList.map((challenge, index) => (
            <TouchableOpacity
              key={challenge.id}
              activeOpacity={0.88}
              onPress={() => handleChallengePress(challenge)}
              style={styles.challengeCard}
            >
              <Image
                source={challenge.image}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
              />
              <LinearGradient
                colors={[
                  "rgba(7, 10, 17, 0.25)",
                  "rgba(7, 10, 17, 0.65)",
                  "rgba(7, 10, 17, 0.95)",
                ]}
                locations={[0, 0.45, 1]}
                style={StyleSheet.absoluteFill}
              />

              <View style={styles.cardContent}>
                <View style={styles.topRow}>
                  <View style={styles.dayBadge}>
                    <Text style={styles.dayBadgeText}>
                      {challenge.dayBadge}
                    </Text>
                  </View>

                  <View style={styles.xpPill}>
                    <Zap size={12} color="#44EAC3" fill="#44EAC3" />
                    <Text style={styles.xpText}>{challenge.xp}</Text>
                  </View>
                </View>

                <View style={styles.bottomSection}>
                  <Text style={styles.cardTitle}>{challenge.title}</Text>

                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Clock size={12} color="#94A3B8" />
                      <Text style={styles.statText}>35 MIN</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Flame size={12} color="#FF6B4A" fill="#FF6B4A" />
                      <Text style={styles.statText}>280 KCAL</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
    paddingTop: 8,
  },
  titleContainer: {
    marginTop: 6,
    marginBottom: 24,
  },
  categoryBadge: {
    color: "#44EAC3",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  maskedTitleWrapper: {
    height: 84,
    width: "100%",
    marginBottom: 6,
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
    letterSpacing: 0.5,
    fontFamily: "monospace",
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
  challengesContainer: {
    gap: 16,
  },
  challengeCard: {
    width: "100%",
    height: 180,
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "#11141C",
  },
  cardContent: {
    ...StyleSheet.absoluteFill,
    padding: 16,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "rgba(10, 15, 26, 0.75)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  dayBadgeText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "rgba(10, 26, 32, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.35)",
  },
  xpText: {
    color: "#44EAC3",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.6,
  },
  bottomSection: {
    gap: 6,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
});
