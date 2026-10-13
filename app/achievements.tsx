import { WorkoutHeader } from "@/features/workouts";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Award,
  Flame,
  Info,
  Lock,
  Medal,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react-native";
import React from "react";
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

const { width } = Dimensions.get("window");

interface BadgeItem {
  id: string;
  name: string;
  type: "medal" | "lightning" | "drop" | "flame" | "arm" | "salad" | "ribbon" | "trophy";
  glowColor: string;
}

const UNLOCKED_BADGES: BadgeItem[] = [
  { id: "1", name: "Today Workout", type: "medal", glowColor: "rgba(250, 204, 21, 0.25)" },
  { id: "2", name: "Healthy Day", type: "lightning", glowColor: "rgba(234, 179, 8, 0.25)" },
  { id: "3", name: "Hydration Hero", type: "drop", glowColor: "rgba(56, 189, 248, 0.35)" },
  { id: "4", name: "3 Day Streak", type: "flame", glowColor: "rgba(249, 115, 22, 0.35)" },
  { id: "5", name: "2/12 Workouts", type: "arm", glowColor: "rgba(251, 146, 60, 0.25)" },
  { id: "6", name: "Healthy Week", type: "salad", glowColor: "rgba(34, 197, 94, 0.25)" },
  { id: "7", name: "2/16 Workouts", type: "ribbon", glowColor: "rgba(234, 179, 8, 0.25)" },
  { id: "8", name: "2/25 Workouts", type: "trophy", glowColor: "rgba(245, 158, 11, 0.35)" },
];

export default function AchievementsScreen() {
  const insets = useSafeAreaInsets();

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleStartWorkout = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/workouts");
  };

  const renderBadgeIcon = (type: BadgeItem["type"]) => {
    switch (type) {
      case "medal":
        return <Text style={{ fontSize: 26 }}>🏅</Text>;
      case "lightning":
        return <Text style={{ fontSize: 26 }}>⚡</Text>;
      case "drop":
        return <Text style={{ fontSize: 26 }}>💧</Text>;
      case "flame":
        return <Text style={{ fontSize: 26 }}>🔥</Text>;
      case "arm":
        return <Text style={{ fontSize: 26 }}>💪</Text>;
      case "salad":
        return <Text style={{ fontSize: 26 }}>🥗</Text>;
      case "ribbon":
        return <Text style={{ fontSize: 26 }}>🎖️</Text>;
      case "trophy":
        return <Text style={{ fontSize: 26 }}>🏆</Text>;
      default:
        return <Trophy size={24} color="#FBBF24" />;
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Kinetic Ambient Gradient & Accent Lines (Exact progress.tsx structure) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          <SvgLine
            x1="420"
            y1="-20"
            x2="-40"
            y2="440"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
          />
          <SvgLine
            x1="460"
            y1="260"
            x2="-40"
            y2="760"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeWidth="1"
          />
          <SvgLine
            x1="480"
            y1="560"
            x2="-40"
            y2="1080"
            stroke="rgba(56, 237, 216, 0.04)"
            strokeWidth="1"
          />
        </Svg>
      </View>

      {/* Unified WorkoutHeader with back button enabled */}
      <WorkoutHeader
        transparent={true}
        showBackButton={true}
        onPressBack={() => {
          triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
          router.canGoBack() ? router.back() : router.replace("/(tabs)/progress");
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom + 100, 120) },
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
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    UNLOCK NEXT LEVEL
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
            Milestones, unlocked badges & athletic season progression
          </Text>
        </View>

        {/* Next Unlock Card (styles.card from progress.tsx) */}
        <View style={styles.card}>
          <View style={styles.unlockHeaderRow}>
            <View>
              <View style={styles.nextUnlockTagRow}>
                <Zap size={12} color="#2DD4BF" style={{ marginRight: 5 }} />
                <Text style={styles.nextUnlockLabel}>NEXT UNLOCK</Text>
              </View>
              <Text style={styles.nextUnlockTitle}>30 Workouts</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.sessionsNumber}>25 / 30</Text>
              <Text style={styles.sessionsLabel}>SESSIONS</Text>
            </View>
          </View>

          {/* Progress Bar (Dual Gradient Fill Track) */}
          <View style={styles.progressBarTrack}>
            <LinearGradient
              colors={["#00f2fe", "#4facfe", "#2DD4BF"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.progressBarFill, { width: `${(25 / 30) * 100}%` }]}
            />
          </View>

          {/* Workouts Left info */}
          <View style={styles.infoRow}>
            <Info size={12} color="#38BDF8" style={{ marginRight: 6 }} />
            <Text style={styles.infoText}>ONLY 5 WORKOUTS LEFT TO TIER ADVANCEMENT!</Text>
          </View>
        </View>

        {/* UNLOCKED Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>UNLOCKED BADGES</Text>
          <View style={styles.badgesCountPill}>
            <Text style={styles.badgesCountText}>8 BADGES</Text>
          </View>
          <View style={styles.sectionLine} />
        </View>

        {/* 2-Column Badges Grid */}
        <View style={styles.badgesGrid}>
          {UNLOCKED_BADGES.map((badge) => (
            <View key={badge.id} style={styles.badgeCard}>
              <View
                style={[
                  styles.badgeIconCircle,
                  { backgroundColor: badge.glowColor },
                ]}
              >
                {renderBadgeIcon(badge.type)}
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
            </View>
          ))}
        </View>

        {/* UPCOMING Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>UPCOMING MILESTONES</Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.upcomingList}>
          {/* Item 1: Century Club */}
          <View style={styles.upcomingCard}>
            <View style={styles.upcomingIconCol}>
              <Lock size={15} color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.upcomingTopRow}>
                <Text style={styles.upcomingTitle}>CENTURY CLUB</Text>
                <View style={styles.upcomingXpRow}>
                  <Text style={[styles.upcomingXpText, { color: "#F59E0B" }]}>+500 XP</Text>
                  <Text style={styles.upcomingRatio}>3/10</Text>
                </View>
              </View>
              <View style={styles.upcomingProgressTrack}>
                <View style={[styles.upcomingProgressFill, { width: "30%", backgroundColor: "#F59E0B" }]} />
              </View>
            </View>
          </View>

          {/* Item 2: Early Bird */}
          <View style={styles.upcomingCard}>
            <View style={styles.upcomingIconCol}>
              <Lock size={15} color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.upcomingTopRow}>
                <Text style={styles.upcomingTitle}>EARLY BIRD</Text>
                <View style={styles.upcomingXpRow}>
                  <Text style={[styles.upcomingXpText, { color: "#2DD4BF" }]}>+250 XP</Text>
                  <Text style={styles.upcomingRatio}>6/10</Text>
                </View>
              </View>
              <View style={styles.upcomingProgressTrack}>
                <View style={[styles.upcomingProgressFill, { width: "60%", backgroundColor: "#2DD4BF" }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Start Today's Workout Button (Matching progress.tsx startWorkoutBtn) */}
        <Pressable
          style={({ pressed }) => [
            styles.startWorkoutBtn,
            pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
          ]}
          onPress={handleStartWorkout}
        >
          <LinearGradient
            colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.startWorkoutGradient}
          >
            <Text style={styles.startWorkoutText}>START TODAY'S WORKOUT</Text>
          </LinearGradient>
        </Pressable>
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
    height: 48,
    width: "100%",
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
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

  /* Card */
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 18,
    marginBottom: 20,
  },
  unlockHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  nextUnlockTagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  nextUnlockLabel: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  nextUnlockTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  sessionsNumber: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    fontFamily: "monospace",
  },
  sessionsLabel: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.8,
    marginTop: 2,
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.8,
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
  badgesCountPill: {
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
    marginLeft: 10,
  },
  badgesCountText: {
    color: "#2DD4BF",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginLeft: 12,
  },

  /* Badges Grid */
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    rowGap: 12,
  },
  badgeCard: {
    width: (width - 52) / 2,
    height: 112,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.22)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  badgeIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeName: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
    textAlign: "center",
  },

  /* Upcoming Section */
  upcomingList: {
    gap: 10,
    marginBottom: 20,
  },
  upcomingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  upcomingIconCol: {
    marginRight: 14,
  },
  upcomingTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  upcomingTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  upcomingXpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  upcomingXpText: {
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  upcomingRatio: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
  },
  upcomingProgressTrack: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 2,
    overflow: "hidden",
  },
  upcomingProgressFill: {
    height: "100%",
    borderRadius: 2,
  },

  /* Start Workout Button */
  startWorkoutBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  startWorkoutGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  startWorkoutText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
