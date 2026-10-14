import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Activity,
  ArrowRight,
  Bot,
  Calendar,
  Check,
  Clock,
  Flame,
  Gauge,
  RotateCcw,
  Share2,
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
import Svg, { Circle as SvgCircle, Line as SvgLine } from "react-native-svg";

const { width } = Dimensions.get("window");

export interface WorkoutSummaryScreenProps {
  score?: number;
  xpEarned?: number;
  accuracy?: number;
  completedExercisesCount?: number;
  totalExercisesCount?: number;
  durationFormatted?: string;
  caloriesBurned?: number;
  paceMps?: string;
  onBackToHome?: () => void;
  onRepeatWorkout?: () => void;
}

export const WorkoutSummaryScreen: React.FC<WorkoutSummaryScreenProps> = ({
  score = 992,
  xpEarned = 850,
  accuracy = 98.4,
  completedExercisesCount = 8,
  totalExercisesCount = 8,
  durationFormatted = "45:12",
  caloriesBurned = 560,
  paceMps = "1.25 m/s",
  onBackToHome,
  onRepeatWorkout,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Circular gauge calculations for 992 score
  const ringRadius = 78;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * ringRadius;
  const progressPercent = 0.88; // 88% circular sweep
  const strokeDashoffset = circumference * (1 - progressPercent);

  const handleHome = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.replace("/(tabs)/workouts" as any);
    }
  };

  const handleRepeat = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    if (onRepeatWorkout) {
      onRepeatWorkout();
    } else {
      router.replace("/workouts");
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Kinetic Ambient Gradient & Accent Lines */}
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
        </Svg>
      </View>

      <CustomHeader
        transparent={true}
        showBackButton={true}
        onPressBack={handleHome}
        rightContent={
          <Pressable
            style={styles.shareIconButton}
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
                  () => {}
                );
              }
            }}
          >
            <Share2 size={18} color="#FFFFFF" />
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 24, 40) },
        ]}
      >
        {/* Title Section: WORKOUT SUMMARY */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>WORKOUT</Text>
          <Text style={styles.mainTitle}>SUMMARY</Text>
          <View style={styles.dateRow}>
            <Calendar size={13} color="#94A3B8" />
            <Text style={styles.dateText}>OCTOBER 24, 2023</Text>
          </View>
        </View>

        {/* Section Header: TOTAL SCORE */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionCyanBar} />
          <Text style={styles.sectionHeaderText}>TOTAL SCORE</Text>
        </View>

        {/* Big Circular Score Dial (992 + 850 XP) */}
        <View style={styles.dialContainer}>
          <Svg width="180" height="180" viewBox="0 0 180 180">
            {/* Background Dial Track */}
            <SvgCircle
              cx="90"
              cy="90"
              r={ringRadius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Glow Neon Arc Track */}
            <SvgCircle
              cx="90"
              cy="90"
              r={ringRadius}
              stroke="#38EDD8"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              transform="rotate(-90 90 90)"
            />
          </Svg>

          <View style={styles.dialInnerContent}>
            <Text style={styles.scoreNumberLarge}>{score}</Text>
            <Text style={styles.scoreXpPill}>+{xpEarned} XP</Text>
          </View>
        </View>

        {/* Section Header: SESSION METRICS */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionCyanBar} />
          <Text style={styles.sectionHeaderText}>SESSION METRICS</Text>
        </View>

        {/* 3 Metric Pills: ACCURACY / COMPLETED / LOAD */}
        <View style={styles.metricPillsRow}>
          {/* ACCURACY */}
          <View style={[styles.metricPillCard, styles.pillBorderCyan]}>
            <Text style={[styles.metricPillLabel, { color: "#38EDD8" }]}>
              ACCURACY
            </Text>
            <Text style={[styles.metricPillValue, { color: "#38EDD8" }]}>
              {accuracy}%
            </Text>
          </View>

          {/* COMPLETED */}
          <View style={[styles.metricPillCard, styles.pillBorderOrange]}>
            <Text style={[styles.metricPillLabel, { color: "#FB923C" }]}>
              COMPLETED
            </Text>
            <Text style={[styles.metricPillValue, { color: "#FB923C" }]}>
              {completedExercisesCount}/{totalExercisesCount}
            </Text>
          </View>

          {/* LOAD */}
          <View style={[styles.metricPillCard, styles.pillBorderPurple]}>
            <Text style={[styles.metricPillLabel, { color: "#C084FC" }]}>
              LOAD
            </Text>
            <Text style={[styles.metricPillValue, { color: "#C084FC" }]}>
              OPTIMAL
            </Text>
          </View>
        </View>

        {/* Control & Speed Pace Card with progress meter */}
        <View style={styles.paceCard}>
          <View style={styles.paceTopRow}>
            <View style={styles.paceTitleLeft}>
              <Activity size={18} color="#38EDD8" />
              <View>
                <Text style={styles.paceHeaderLabel}>Control & Speed</Text>
                <Text style={styles.paceMainValue}>
                  {paceMps} · <Text style={styles.paceSubText}>Optimal Pace</Text>
                </Text>
              </View>
            </View>
            <View style={styles.steadyBadge}>
              <Check size={12} color="#38EDD8" strokeWidth={3} />
              <Text style={styles.steadyText}>Steady</Text>
            </View>
          </View>

          {/* Pace Progress Bar */}
          <View style={styles.paceBarTrack}>
            <LinearGradient
              colors={["#38EDD8", "#6366F1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.paceBarFill}
            />
          </View>
        </View>

        {/* 2-Column Row: Calories Burned & Time */}
        <View style={styles.twoColRow}>
          {/* KCAL BURNED */}
          <View style={styles.statSquareCard}>
            <View style={styles.statIconCircleOrange}>
              <Flame size={16} color="#FB923C" />
            </View>
            <Text style={styles.statBigValue}>{caloriesBurned}</Text>
            <Text style={styles.statUnitLabel}>KCAL BURNED</Text>
          </View>

          {/* DURATION */}
          <View style={styles.statSquareCard}>
            <View style={styles.statIconCirclePurple}>
              <Clock size={16} color="#818CF8" />
            </View>
            <Text style={styles.statBigValue}>{durationFormatted}</Text>
            <Text style={styles.statUnitLabel}>MIN</Text>
          </View>
        </View>

        {/* AI COACH FEEDBACK Card */}
        <View style={styles.coachFeedbackCard}>
          <View style={styles.coachHeaderRow}>
            <View style={styles.coachIconBadge}>
              <Bot size={16} color="#38EDD8" />
            </View>
            <Text style={styles.coachHeaderText}>AI COACH FEEDBACK</Text>
            <View style={styles.coachDot} />
          </View>

          <Text style={styles.coachFeedbackBody}>
            Outstanding kinetic form today. Your squat depth showed a{" "}
            <Text style={styles.coachHighlightPill}>+12% gain</Text> compared to
            last session, while thoracic spine neutrality was maintained across
            all {totalExercisesCount} sets.
          </Text>
        </View>

        {/* Bottom CTA 1: BACK TO HOME -> */}
        <Pressable
          style={({ pressed }) => [
            styles.homeButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}
          onPress={handleHome}
        >
          <LinearGradient
            colors={["#1E6BB8", "#258CE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.homeButtonGradient}
          >
            <Text style={styles.homeButtonText}>BACK TO HOME</Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>

        {/* Bottom CTA 2: REPEAT WORKOUT */}
        <Pressable
          style={({ pressed }) => [
            styles.repeatButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleRepeat}
        >
          <RotateCcw size={16} color="#FFFFFF" />
          <Text style={styles.repeatButtonText}>REPEAT WORKOUT</Text>
        </Pressable>
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
    paddingTop: 10,
  },
  shareIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: {
    marginBottom: 20,
    marginTop: 2,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  dateText: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    marginTop: 10,
  },
  sectionCyanBar: {
    width: 4,
    height: 14,
    borderRadius: 2,
    backgroundColor: "#38EDD8",
  },
  sectionHeaderText: {
    color: "#E2E8F0",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  // Dial Container
  dialContainer: {
    width: 180,
    height: 180,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
  },
  dialInnerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNumberLarge: {
    color: "#FFFFFF",
    fontSize: 48,
    fontFamily: "monospace",
    fontWeight: "900",
    lineHeight: 52,
  },
  scoreXpPill: {
    color: "#C084FC",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    fontStyle: "italic",
    marginTop: 2,
  },

  // 3 Metric Pills
  metricPillsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  metricPillCard: {
    flex: 1,
    backgroundColor: "rgba(17, 20, 30, 0.85)",
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  pillBorderCyan: {
    borderColor: "rgba(56, 237, 216, 0.3)",
  },
  pillBorderOrange: {
    borderColor: "rgba(251, 146, 60, 0.3)",
  },
  pillBorderPurple: {
    borderColor: "rgba(192, 132, 252, 0.3)",
  },
  metricPillLabel: {
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  metricPillValue: {
    fontSize: 15,
    fontFamily: "monospace",
    fontWeight: "900",
  },

  // Pace Card
  paceCard: {
    backgroundColor: "#11141E",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    marginBottom: 16,
  },
  paceTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  paceTitleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paceHeaderLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  paceMainValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "monospace",
    fontWeight: "900",
    marginTop: 2,
  },
  paceSubText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  steadyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(56, 237, 216, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  steadyText: {
    color: "#38EDD8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  paceBarTrack: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  paceBarFill: {
    width: "75%",
    height: "100%",
  },

  // 2-Column Row
  twoColRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statSquareCard: {
    flex: 1,
    backgroundColor: "#11141E",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
  },
  statIconCircleOrange: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(251, 146, 60, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statIconCirclePurple: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(129, 140, 248, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statBigValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "monospace",
    fontWeight: "900",
    marginBottom: 2,
  },
  statUnitLabel: {
    color: "#64748B",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  // AI Coach Feedback Card
  coachFeedbackCard: {
    backgroundColor: "rgba(17, 20, 30, 0.85)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.25)",
    padding: 16,
    marginBottom: 24,
  },
  coachHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  coachIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(56, 237, 216, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  coachHeaderText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  coachDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#38EDD8",
  },
  coachFeedbackBody: {
    color: "#94A3B8",
    fontSize: 12.5,
    lineHeight: 18,
  },
  coachHighlightPill: {
    color: "#38EDD8",
    fontFamily: "monospace",
    fontWeight: "800",
  },

  // CTA Buttons
  homeButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    shadowColor: "#258CE8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
    marginBottom: 12,
  },
  homeButtonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  repeatButton: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.22)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  repeatButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
