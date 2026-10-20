import { WorkoutHeader } from "@/features/workouts";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  BarChart2,
  Clock,
  Dumbbell,
  Flame,
  Share2,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Line as SvgLine } from "react-native-svg";

const { width } = Dimensions.get("window");

type TabType = "TODAY" | "WEEK" | "MONTH";

interface StatItemData {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function YourWorkoutsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>("TODAY");

  const triggerHaptic = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleTabChange = (tab: TabType) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const handleShare = async () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await Share.share({
        message:
          "🔥 Milestone Achieved on Kinetic AI Fitness: 127 Total Workouts Completed! Keep pushing limits! 🚀 #KineticAI #FitnessMilestone",
        title: "Kinetic AI Fitness Milestone",
      });
    } catch {
      // dismissed
    }
  };

  // Stat data customized per tab
  const statsData: Record<TabType, StatItemData[]> = {
    TODAY: [
      {
        id: "time",
        label: "TIME",
        value: "4h 20m",
        icon: <Clock color="#38BDF8" size={18} />,
        iconBg: "rgba(56, 189, 248, 0.12)",
      },
      {
        id: "workouts",
        label: "WORKOUTS",
        value: "5",
        icon: <Dumbbell color="#818CF8" size={18} />,
        iconBg: "rgba(129, 140, 248, 0.12)",
      },
      {
        id: "calories",
        label: "CALORIES",
        value: "2,450",
        icon: <Flame color="#FB923C" size={18} />,
        iconBg: "rgba(251, 146, 60, 0.12)",
      },
      {
        id: "earned",
        label: "EARNED",
        value: "+120 XP",
        icon: <Sparkles color="#34D399" size={18} />,
        iconBg: "rgba(52, 211, 153, 0.12)",
      },
      {
        id: "score",
        label: "SCORE",
        value: "94%",
        icon: <BarChart2 color="#F472B6" size={18} />,
        iconBg: "rgba(244, 114, 182, 0.12)",
      },
      {
        id: "accuracy",
        label: "ACCURACY",
        value: "94%",
        icon: <Zap color="#38BDF8" size={18} />,
        iconBg: "rgba(56, 189, 248, 0.12)",
      },
    ],
    WEEK: [
      {
        id: "time",
        label: "TIME",
        value: "18h 45m",
        icon: <Clock color="#38BDF8" size={18} />,
        iconBg: "rgba(56, 189, 248, 0.12)",
      },
      {
        id: "workouts",
        label: "WORKOUTS",
        value: "22",
        icon: <Dumbbell color="#818CF8" size={18} />,
        iconBg: "rgba(129, 140, 248, 0.12)",
      },
      {
        id: "calories",
        label: "CALORIES",
        value: "11,820",
        icon: <Flame color="#FB923C" size={18} />,
        iconBg: "rgba(251, 146, 60, 0.12)",
      },
      {
        id: "earned",
        label: "EARNED",
        value: "+680 XP",
        icon: <Sparkles color="#34D399" size={18} />,
        iconBg: "rgba(52, 211, 153, 0.12)",
      },
      {
        id: "score",
        label: "SCORE",
        value: "96%",
        icon: <BarChart2 color="#F472B6" size={18} />,
        iconBg: "rgba(244, 114, 182, 0.12)",
      },
      {
        id: "accuracy",
        label: "ACCURACY",
        value: "92%",
        icon: <Zap color="#38BDF8" size={18} />,
        iconBg: "rgba(56, 189, 248, 0.12)",
      },
    ],
    MONTH: [
      {
        id: "time",
        label: "TIME",
        value: "74h 10m",
        icon: <Clock color="#38BDF8" size={18} />,
        iconBg: "rgba(56, 189, 248, 0.12)",
      },
      {
        id: "workouts",
        label: "WORKOUTS",
        value: "84",
        icon: <Dumbbell color="#818CF8" size={18} />,
        iconBg: "rgba(129, 140, 248, 0.12)",
      },
      {
        id: "calories",
        label: "CALORIES",
        value: "48,500",
        icon: <Flame color="#FB923C" size={18} />,
        iconBg: "rgba(251, 146, 60, 0.12)",
      },
      {
        id: "earned",
        label: "EARNED",
        value: "+2,400 XP",
        icon: <Sparkles color="#34D399" size={18} />,
        iconBg: "rgba(52, 211, 153, 0.12)",
      },
      {
        id: "score",
        label: "SCORE",
        value: "95%",
        icon: <BarChart2 color="#F472B6" size={18} />,
        iconBg: "rgba(244, 114, 182, 0.12)",
      },
      {
        id: "accuracy",
        label: "ACCURACY",
        value: "93%",
        icon: <Zap color="#38BDF8" size={18} />,
        iconBg: "rgba(56, 189, 248, 0.12)",
      },
    ],
  };

  const currentStats = statsData[activeTab];

  // Circular progress dimensions
  const circleSize = 52;
  const strokeWidth = 4;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressPercent =
    activeTab === "TODAY" ? 0.75 : activeTab === "WEEK" ? 0.88 : 0.94;
  const strokeDashoffset = circumference * (1 - progressPercent);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Unified WorkoutHeader with back button enabled */}
      <WorkoutHeader
        transparent={true}
        showBackButton={true}
        onPressBack={() => {
          triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
          router.canGoBack()
            ? router.back()
            : router.replace("/(tabs)/progress");
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom + 140, 160) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section with Masked Gradient Title (progress.tsx pattern) */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    YOUR WORKOUTS
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
            Session telemetry, historical curves & volume logs
          </Text>
        </View>

        {/* Tab Selection Filter (Pills matching progress.tsx pattern) */}
        <View style={styles.tabContainer}>
          {(["TODAY", "WEEK", "MONTH"] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                style={styles.tabButton}
                onPress={() => handleTabChange(tab)}
              >
                {isActive ? (
                  <LinearGradient
                    colors={["#00f2fe", "#4facfe"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tabActiveGradient}
                  >
                    <Text style={styles.tabTextActive}>{tab}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.tabInactiveInner}>
                    <Text style={styles.tabTextInactive}>{tab}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Recent Activity Label */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
          <View style={styles.sectionLine} />
        </View>

        {/* Workout Summary Card (styles.card from progress.tsx) */}
        <View style={styles.card}>
          {/* Card Header Row with Goal Ring */}
          <View style={styles.summaryHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.summaryTitle}>
                {activeTab === "TODAY"
                  ? "Today's Workout Summary"
                  : activeTab === "WEEK"
                    ? "Weekly Workout Summary"
                    : "Monthly Workout Summary"}
              </Text>
              <Text style={styles.summarySub}>
                Aggregated output & energy telemetry
              </Text>
            </View>

            {/* Circular Goal Badge */}
            <View style={styles.goalBadgeContainer}>
              <Svg width={circleSize} height={circleSize}>
                <Circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <Circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={radius}
                  stroke="#2DD4BF"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  rotation="-90"
                  origin={`${circleSize / 2}, ${circleSize / 2}`}
                />
              </Svg>
              <View style={styles.goalTextContainer}>
                <Text style={styles.goalPercent}>
                  {Math.round(progressPercent * 100)}%
                </Text>
                <Text style={styles.goalSub}>GOAL</Text>
              </View>
            </View>
          </View>

          {/* 6-Grid Stats */}
          <View style={styles.statsGrid}>
            {currentStats.map((item) => (
              <View key={item.id} style={styles.statTile}>
                <View style={styles.statTopRow}>
                  <View
                    style={[
                      styles.statIconBadge,
                      { backgroundColor: item.iconBg },
                    ]}
                  >
                    {item.icon}
                  </View>
                </View>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Milestone Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MILESTONE ACHIEVED</Text>
          <View style={styles.sectionLine} />
        </View>

        {/* MILESTONE Card (progress.tsx styles.card format) */}
        <View style={styles.card}>
          <View style={styles.milestoneHeader}>
            <View style={styles.colIconBadge}>
              <Trophy color="#FFB68C" size={16} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.milestoneTag}>KINETIC RECORD</Text>
              <Text style={styles.milestoneMainTitle}>TOTAL WORKOUTS</Text>
            </View>
            <Text style={styles.milestoneNumber}>127</Text>
          </View>

          {/* AI Generated Victory Artwork Container */}
          <View style={styles.milestoneImageContainer}>
            <Image
              source={require("../assets/workout/milestone-celebrate.jpg")}
              style={styles.milestoneImage}
              contentFit="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(15, 23, 42, 0.4)"]}
              style={StyleSheet.absoluteFill}
            />
          </View>

          {/* Share Achievement CTA (startWorkoutBtn pattern) */}
          <Pressable style={styles.shareWorkoutBtn} onPress={handleShare}>
            <LinearGradient
              colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.shareWorkoutGradient}
            >
              <Share2 color="#FFFFFF" size={16} style={{ marginRight: 8 }} />
              <Text style={styles.shareWorkoutText}>SHARE ACHIEVEMENT</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleSection: {
    marginTop: 4,
    marginBottom: 18,
  },
  maskedTitleWrapper: {
    height: 44,
    width: "100%",
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
    fontSize: 28,
    lineHeight: 36,
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
    marginTop: 4,
  },

  /* Segment Tabs */
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    padding: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  tabButton: {
    flex: 1,
    height: 36,
    borderRadius: 11,
    overflow: "hidden",
  },
  tabInactiveInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabActiveGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
  },
  tabTextInactive: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "monospace",
  },

  /* Section Header */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginLeft: 12,
  },

  /* Card Container */
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 18,
    marginBottom: 20,
  },

  /* Summary Card Inner */
  summaryHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  summarySub: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
  },
  goalBadgeContainer: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  goalTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  goalPercent: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  goalSub: {
    color: "#94A3B8",
    fontSize: 8,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  /* Stats Grid */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  statTile: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    padding: 12,
  },
  statTopRow: {
    marginBottom: 10,
  },
  statIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "900",
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  statLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  /* Milestone Header */
  milestoneHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  colIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255, 182, 140, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 182, 140, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  milestoneTag: {
    color: "#FFB68C",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  milestoneMainTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  milestoneNumber: {
    color: "#38BDF8",
    fontSize: 32,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: -1,
  },
  milestoneImageContainer: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    marginBottom: 16,
  },
  milestoneImage: {
    width: "100%",
    height: "100%",
  },

  /* CTA Button */
  shareWorkoutBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  shareWorkoutGradient: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shareWorkoutText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
