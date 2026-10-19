import { WorkoutHeader } from "@/features/workouts";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Award,
  BarChart2,
  ChevronRight,
  Flame,
  History,
  Sparkles,
  TrendingUp,
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

export default function ProgressTabRoute() {
  const insets = useSafeAreaInsets();

  const triggerHaptic = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleStartWorkout = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/workouts");
  };

  const handleNavigate = (path: string) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.push(path as any);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Kinetic Ambient Gradient & Accent Lines */}
      <View style={[StyleSheet.absoluteFill, { overflow: "hidden" }]} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={[StyleSheet.absoluteFill, { overflow: "hidden" }]} pointerEvents="none">
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

      <WorkoutHeader transparent={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom + 140, 160) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section with Masked Gradient Title */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    LEVEL UP...
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
            Athletic ranking, season progression & performance records
          </Text>
        </View>

        {/* Level & XP Progression Card */}
        <View style={styles.card}>
          <View style={styles.levelHeaderRow}>
            <View style={styles.sparkleBadge}>
              <Sparkles color="#38BDF8" size={22} />
            </View>
            <View style={styles.levelInfoCol}>
              <Text style={styles.statusLabel}>CURRENT STATUS</Text>
              <Text style={styles.levelMainText}>LEVEL 12</Text>
            </View>
          </View>

          {/* XP Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={["#00f2fe", "#4facfe", "#2DD4BF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill, { width: "81%" }]}
              />
            </View>
            <View style={styles.xpRow}>
              <View style={styles.xpLeftCol}>
                <Text style={styles.xpValue}>2,450</Text>
                <Text style={styles.xpTotal}> / 3,000 XP</Text>
              </View>
              <View style={styles.xpRightCol}>
                <Zap size={11} color="#2DD4BF" style={{ marginRight: 4 }} />
                <Text style={styles.xpNotice}>550 XP TO NEXT TIER</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Personal Records Card */}
        <View style={styles.card}>
          <View style={styles.prHeaderFull}>
            <View style={styles.colIconBadge}>
              <Trophy color="#38BDF8" size={16} />
            </View>
            <View style={styles.prTitleCol}>
              <Text style={styles.prCardTitle}>PERSONAL RECORDS</Text>
              <Text style={styles.prCardSub}>
                Benchmark maxes & strength telemetry
              </Text>
            </View>
          </View>

          <View style={styles.prProgressRowFull}>
            <TrendingUp color="#FFB68C" size={15} style={{ marginRight: 8 }} />
            <Text style={styles.prProgressLabel}>OVERALL PROGRESS</Text>
            <Text style={styles.prProgressValue}>PEAK</Text>
          </View>

          <Pressable
            style={styles.viewRecordsBtn}
            onPress={() => handleNavigate("/profile/global-rankings")}
          >
            <Text style={styles.viewRecordsText}>VIEW ALL RECORDS</Text>
          </Pressable>
        </View>

        {/* Motivation Quote Card */}
        <View style={styles.card}>
          <View style={styles.quoteHeaderFull}>
            <View style={{ flex: 1 }}>
              <Text style={styles.quoteTextFull}>
                "Every single rep reconstructs your physical limits."
              </Text>
            </View>
          </View>
        </View>

        {/* 12-Day Streak Card */}
        <View style={styles.card}>
          <View style={styles.streakHeaderRow}>
            <View>
              <View style={styles.flameBadge}>
                <Flame color="#FFB68C" size={14} style={{ marginRight: 6 }} />
                <Text style={styles.flameBadgeText}>ACTIVE CONSISTENCY</Text>
              </View>
              <Text style={styles.streakTitle}>12 DAY STREAK</Text>
              <Text style={styles.streakDesc}>
                Complete today's kinetic workout session to preserve streak
                momentum.
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.startWorkoutBtn}
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
        </View>

        {/* Weekly Challenge Card */}
        <View style={styles.card}>
          <View style={styles.challengeHeader}>
            <View>
              <Text style={styles.challengeTitle}>WEEKLY CHALLENGE</Text>
            </View>
            <View style={styles.xpPill}>
              <Text style={styles.xpPillText}>+500 XP</Text>
            </View>
          </View>

          <Text style={styles.challengeDesc}>
            Log 5 full workout routines across the 7-day training cycle.
          </Text>

          {/* Challenge Segments */}
          <View style={styles.segmentsRow}>
            {[1, 2, 3, 4, 5].map((item, index) => {
              const isFilled = index < 3;
              return (
                <View key={index} style={styles.segmentWrapper}>
                  {isFilled ? (
                    <LinearGradient
                      colors={["#00f2fe", "#4facfe"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.segmentFilled}
                    />
                  ) : (
                    <View style={styles.segmentUnfilled} />
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.challengeFooterRow}>
            <Text style={styles.challengeProgressText}>3 OF 5 COMPLETED</Text>
            <Text style={styles.challengePercent}>60% TARGET</Text>
          </View>
        </View>

        {/* Protocol & History Navigation Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PERFORMANCE PROTOCOLS</Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.menuList}>
          {/* Reports -> Weight Progress */}
          <Pressable
            style={styles.menuItem}
            onPress={() => handleNavigate("/weight-progress")}
          >
            <View style={styles.menuIconWrapper}>
              <BarChart2 color="#38BDF8" size={17} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>PERFORMANCE REPORTS</Text>
              <Text style={styles.menuSub}>
                Weight progress, trend telemetry & metabolic efficiency
              </Text>
            </View>
            <View style={styles.chevronWrapper}>
              <ChevronRight color="#38BDF8" size={16} />
            </View>
          </Pressable>

          {/* Workout History -> Your Workouts */}
          <Pressable
            style={styles.menuItem}
            onPress={() => handleNavigate("/your-workouts")}
          >
            <View
              style={[
                styles.menuIconWrapper,
                {
                  backgroundColor: "rgba(45, 212, 191, 0.12)",
                  borderColor: "rgba(45, 212, 191, 0.25)",
                },
              ]}
            >
              <History color="#2DD4BF" size={17} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>YOUR WORKOUTS & LOGS</Text>
              <Text style={styles.menuSub}>
                Historical routines, volume telemetry & milestone achievements
              </Text>
            </View>
            <View style={styles.chevronWrapper}>
              <ChevronRight color="#38BDF8" size={16} />
            </View>
          </Pressable>

          {/* Global Rankings / Achievements -> Unlock Next Level Badges */}
          <Pressable
            style={styles.menuItem}
            onPress={() => handleNavigate("/achievements")}
          >
            <View
              style={[
                styles.menuIconWrapper,
                {
                  backgroundColor: "rgba(255, 182, 140, 0.12)",
                  borderColor: "rgba(255, 182, 140, 0.25)",
                },
              ]}
            >
              <Award color="#FFB68C" size={17} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>ACHIEVEMENTS & BADGES</Text>
              <Text style={styles.menuSub}>
                Unlocked milestones, badges & level progression
              </Text>
            </View>
            <View style={styles.chevronWrapper}>
              <ChevronRight color="#38BDF8" size={16} />
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleSection: {
    marginTop: 4,
    marginBottom: 20,
  },
  maskedTitleWrapper: {
    height: 48,
    width: "100%",
  },
  maskedTitleView: {
    height: 48,
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
    fontSize: 30,
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
    marginTop: 4,
  },
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    marginBottom: 20,
  },
  levelHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  sparkleBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  levelInfoCol: {
    flex: 1,
  },
  statusLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  levelMainText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  tierPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
  },
  tierDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#2DD4BF",
    marginRight: 5,
  },
  tierPillText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    overflow: "hidden",
    marginBottom: 10,
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xpLeftCol: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  xpValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  xpTotal: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
    marginLeft: 3,
  },
  xpRightCol: {
    flexDirection: "row",
    alignItems: "center",
  },
  xpNotice: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  prHeaderFull: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  prTitleCol: {
    flex: 1,
    marginLeft: 12,
  },
  prCardTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  prCardSub: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 2,
  },
  colIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  prProgressRowFull: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  prProgressLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    flex: 1,
  },
  prProgressValue: {
    color: "#FFB68C",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  optimalPill: {
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.25)",
  },
  optimalText: {
    color: "#2DD4BF",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  viewRecordsBtn: {
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
  },
  viewRecordsText: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  quoteHeaderFull: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quoteTag: {
    color: "#FFB68C",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  quoteTextFull: {
    color: "#CBD5E1",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 18,
    fontStyle: "italic",
  },
  streakHeaderRow: {
    marginBottom: 16,
  },
  flameBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  flameBadgeText: {
    color: "#FFB68C",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  streakTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  streakDesc: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 16,
  },
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
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  challengeBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  challengeBadgeText: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  challengeTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  xpPill: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  xpPillText: {
    color: "#38BDF8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  challengeDesc: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 16,
    marginBottom: 16,
  },
  segmentsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  segmentWrapper: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    overflow: "hidden",
  },
  segmentFilled: {
    flex: 1,
    borderRadius: 3,
  },
  segmentUnfilled: {
    flex: 1,
  },
  challengeFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  challengeProgressText: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  challengePercent: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
  },
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
  menuList: {
    gap: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  menuSub: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
  },
  chevronWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
});
