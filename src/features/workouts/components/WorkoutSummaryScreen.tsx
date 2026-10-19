import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Activity,
  ArrowRight,
  Bot,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Dumbbell,
  Flame,
  RotateCcw,
  Share2,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
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
import Svg, { Circle as SvgCircle, Line as SvgLine } from "react-native-svg";
import { WorkoutExerciseItem } from "../data/workoutPathDetailData";

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
  workoutTitle?: string;
  workoutSubtitle?: string;
  description?: string;
  dateFormatted?: string;
  exercises?: WorkoutExerciseItem[];
  onBackToHome?: () => void;
  onRepeatWorkout?: () => void;
}

const DEFAULT_EXERCISE_ITEMS = [
  {
    id: "bench-press",
    index: "01",
    title: "BENCH PRESS (BARBELL)",
    setsReps: "4 Sets • 10 Reps • 60 kg",
    acc: 96,
    image: require("../../../../assets/pushDay/pd4.png"),
  },
  {
    id: "overhead-press",
    index: "02",
    title: "OVERHEAD PRESS (DUMBBELL)",
    setsReps: "3 Sets • 12 Reps • 24 kg",
    acc: 98,
    image: require("../../../../assets/pushDay/pd3.png"),
  },
  {
    id: "incline-fly",
    index: "03",
    title: "INCLINE CHEST FLY",
    setsReps: "3 Sets • 12 Reps • 16 kg",
    acc: 95,
    image: require("../../../../assets/pushDay/pd2.png"),
  },
  {
    id: "incline-barbell-press",
    index: "04",
    title: "INCLINE BENCH PRESS",
    setsReps: "4 Sets • 10 Reps • 55 kg",
    acc: 98,
    image: require("../../../../assets/pushDay/pd4.png"),
  },
  {
    id: "dips-chest-triceps",
    index: "05",
    title: "PARALLEL BAR DIPS",
    setsReps: "3 Sets • 15 Reps • Bodyweight",
    acc: 97,
    image: require("../../../../assets/workoutLibraryDetails/wld1.png"),
  },
  {
    id: "cable-lateral-raise",
    index: "06",
    title: "CABLE LATERAL RAISES",
    setsReps: "4 Sets • 15 Reps • 12.5 kg",
    acc: 99,
    image: require("../../../../assets/pushDay/pd3.png"),
  },
  {
    id: "tricep-rope-pushdown",
    index: "07",
    title: "TRICEP ROPE PUSHDOWN",
    setsReps: "3 Sets • 15 Reps • 25 kg",
    acc: 98,
    image: require("../../../../assets/workoutLibraryDetails/wld2.png"),
  },
  {
    id: "skull-crushers",
    index: "08",
    title: "LYING SKULL CRUSHERS",
    setsReps: "3 Sets • 12 Reps • 30 kg",
    acc: 96,
    image: require("../../../../assets/workoutLibraryDetails/wld3.png"),
  },
];

export const WorkoutSummaryScreen: React.FC<WorkoutSummaryScreenProps> = ({
  score = 992,
  xpEarned = 850,
  accuracy = 98.4,
  completedExercisesCount = 8,
  totalExercisesCount = 8,
  durationFormatted = "45:12",
  caloriesBurned = 560,
  paceMps = "1.25 m/s",
  workoutTitle = "PUSH DAY PROTOCOL",
  workoutSubtitle = "Chest, Shoulders & Triceps Focus",
  description,
  dateFormatted,
  exercises,
  onBackToHome,
  onRepeatWorkout,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showAllExercises, setShowAllExercises] = useState(false);

  const summaryDescription =
    description ||
    (workoutSubtitle && workoutSubtitle.length > 40
      ? workoutSubtitle
      : "High-intensity hypertrophy protocol targeting chest, shoulders, and triceps. Exceptional biomechanical execution and steady tempo maintained across all cleared sets.");

  // Dynamic circular gauge calculations for score (radius: 78, stroke: 8)
  const ringRadius = 78;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * ringRadius;
  // Sweep dynamically proportional to score (e.g. 992/1000 = ~0.89 sweep)
  const progressPercent = Math.min(Math.max((score / 1000) * 0.9, 0.1), 0.96);
  const strokeDashoffset = circumference * (1 - progressPercent);

  // Formatted date string
  const resolvedDate = useMemo(() => {
    if (dateFormatted) return dateFormatted;
    try {
      const now = new Date();
      return now
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase();
    } catch {
      return "OCTOBER 19, 2026";
    }
  }, [dateFormatted]);

  const handleHome = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.replace("/(tabs)/home" as any);
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

  const handleShare = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    try {
      if (Platform.OS !== "web") {
        await Share.share({
          message: `🔥 Just crushed ${workoutTitle}! Scored ${score} with ${accuracy}% form accuracy, burned ${caloriesBurned} kcal in ${durationFormatted} min on KINETQX!`,
        });
      }
    } catch {}
  };

  // Resolved list of completed exercises
  const exerciseList = useMemo(() => {
    if (exercises && exercises.length > 0) {
      return exercises.map((item, idx) => ({
        id: item.id || `ex-${idx}`,
        index: item.index || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
        title: item.title.replace(/\n/g, " "),
        setsReps: item.subtitle,
        acc: Math.min(95 + (idx % 4), 99),
        image: item.image,
      }));
    }
    return DEFAULT_EXERCISE_ITEMS;
  }, [exercises]);

  const displayedExercises = showAllExercises
    ? exerciseList
    : exerciseList.slice(0, 4);

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
        showSearch={false}
        showNotifications={false}
        showAvatar={false}
        rightContent={
          <Pressable
            style={({ pressed }) => [
              styles.shareIconButton,
              pressed && { opacity: 0.75, transform: [{ scale: 0.94 }] },
            ]}
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel="Share workout performance summary"
          >
            <Share2 size={18} color="#FFFFFF" strokeWidth={2.2} />
          </Pressable>
        }
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 120, 160) },
        ]}
      >
        {/* Title Section: WORKOUT SUMMARY */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>WORKOUT SUMMARY</Text>
          {summaryDescription ? (
            <Text style={styles.summaryDescription}>{summaryDescription}</Text>
          ) : null}

          <View style={styles.dateRow}>
            <Calendar size={13} color="#94A3B8" />
            <Text style={styles.dateText}>{resolvedDate}</Text>
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
            {/* Outer Glow Halo Layer */}
            <SvgCircle
              cx="90"
              cy="90"
              r={ringRadius}
              stroke="rgba(56, 237, 216, 0.18)"
              strokeWidth={strokeWidth + 4}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              transform="rotate(-90 90 90)"
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
            <View style={styles.xpRow}>
              <Zap size={13} color="#FBBF24" fill="#FBBF24" />
              <Text style={styles.scoreXpPill}>+{xpEarned} XP</Text>
            </View>
            <View style={styles.tierPill}>
              <Text style={styles.tierPillText}>ELITE ATHLETE</Text>
            </View>
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
              <View style={styles.paceIconBox}>
                <Activity size={18} color="#38EDD8" strokeWidth={2.4} />
              </View>
              <View>
                <Text style={styles.paceHeaderLabel}>Control & Speed</Text>
                <Text style={styles.paceMainValue}>
                  {paceMps} ·{" "}
                  <Text style={styles.paceSubText}>Optimal Pace</Text>
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
              <Flame size={18} color="#FB923C" />
            </View>
            <Text style={styles.statBigValue}>{caloriesBurned}</Text>
            <Text style={styles.statUnitLabel}>KCAL BURNED</Text>
          </View>

          {/* DURATION */}
          <View style={styles.statSquareCard}>
            <View style={styles.statIconCirclePurple}>
              <Clock size={18} color="#818CF8" />
            </View>
            <Text style={styles.statBigValue}>{durationFormatted}</Text>
            <Text style={styles.statUnitLabel}>MIN ACTIVE</Text>
          </View>
        </View>

        {/* AI COACH FEEDBACK Card */}
        <View style={styles.coachFeedbackCard}>
          <View style={styles.coachHeaderRow}>
            <View style={styles.coachIconBadge}>
              <Bot size={16} color="#38EDD8" strokeWidth={2.2} />
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

          {/* Customized Telemetry Chips */}
          <View style={styles.coachChipsRow}>
            <View style={styles.coachChip}>
              <Sparkles size={11} color="#38EDD8" />
              <Text style={styles.coachChipText}>ROM 98%</Text>
            </View>
            <View style={styles.coachChip}>
              <Zap size={11} color="#FBBF24" />
              <Text style={styles.coachChipText}>POWER 410W</Text>
            </View>
            <View style={styles.coachChip}>
              <TrendingUp size={11} color="#818CF8" />
              <Text style={styles.coachChipText}>STABILITY 97%</Text>
            </View>
          </View>
        </View>

        {/* Customized Section: EXERCISE BREAKDOWN */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionCyanBar} />
          <Text style={styles.sectionHeaderText}>EXERCISE BREAKDOWN</Text>
          <View style={styles.exerciseCounterBadge}>
            <Text style={styles.exerciseCounterBadgeText}>
              {completedExercisesCount}/{totalExercisesCount} CLEARED
            </Text>
          </View>
        </View>

        <View style={styles.breakdownContainer}>
          {displayedExercises.map((item) => (
            <View key={item.id} style={styles.exerciseCardRow}>
              {/* Exercise Thumbnail */}
              <View style={styles.exerciseThumbBox}>
                {item.image ? (
                  <Image
                    source={item.image}
                    style={styles.exerciseImage}
                    contentFit="cover"
                  />
                ) : (
                  <View style={styles.exerciseImagePlaceholder}>
                    <Dumbbell size={18} color="#38EDD8" />
                  </View>
                )}
                <View style={styles.exerciseIndexPill}>
                  <Text style={styles.exerciseIndexPillText}>{item.index}</Text>
                </View>
              </View>

              {/* Title & Sets */}
              <View style={styles.exerciseInfoCol}>
                <Text style={styles.exerciseTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.exerciseSubtitle}>{item.setsReps}</Text>
              </View>

              {/* Accuracy & Check Badge */}
              <View style={styles.exerciseAccCol}>
                <Text style={styles.exerciseAccNumber}>{item.acc}% acc</Text>
                <View style={styles.completedMiniPill}>
                  <Check size={10} color="#38EDD8" strokeWidth={3.5} />
                  <Text style={styles.completedMiniText}>DONE</Text>
                </View>
              </View>
            </View>
          ))}

          {exerciseList.length > 4 && (
            <Pressable
              style={styles.toggleMoreBtn}
              onPress={() => {
                if (Platform.OS !== "web") {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
                    () => {},
                  );
                }
                setShowAllExercises((prev) => !prev);
              }}
              accessibilityRole="button"
              accessibilityLabel={
                showAllExercises ? "Show less exercises" : "Show all exercises"
              }
            >
              <Text style={styles.toggleMoreText}>
                {showAllExercises
                  ? "COLLAPSE EXERCISES"
                  : `VIEW ALL ${exerciseList.length} EXERCISES`}
              </Text>
              {showAllExercises ? (
                <ChevronUp size={15} color="#38EDD8" />
              ) : (
                <ChevronDown size={15} color="#38EDD8" />
              )}
            </Pressable>
          )}
        </View>
        {/* Bottom CTA 1: BACK TO HOME -> */}
        <Pressable
          style={({ pressed }) => [
            styles.homeButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}
          onPress={handleHome}
          accessibilityRole="button"
          accessibilityLabel="Return to home screen"
        >
          <LinearGradient
            colors={["#1E6BB8", "#258CE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.homeButtonGradient}
          >
            <Text style={styles.homeButtonText}>BACK TO HOME</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />
          </LinearGradient>
        </Pressable>

        {/* Bottom CTA 2: REPEAT WORKOUT */}
        <Pressable
          style={({ pressed }) => [
            styles.repeatButton,
            pressed && { opacity: 0.8, transform: [{ scale: 0.99 }] },
          ]}
          onPress={handleRepeat}
          accessibilityRole="button"
          accessibilityLabel="Repeat this workout"
        >
          <View style={styles.repeatButtonInner}>
            <RotateCcw size={16} color="#FFFFFF" strokeWidth={2.2} />
            <Text style={styles.repeatButtonText}>REPEAT WORKOUT</Text>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  shareIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: {
    marginBottom: 20,
    marginTop: 2,
  },
  routineTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  routinePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  routinePillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38EDD8",
  },
  routinePillText: {
    color: "#38EDD8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  clearedPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  clearedPillText: {
    color: "#10B981",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  summaryDescription: {
    color: "#94A3B8",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "500",
    letterSpacing: 0.2,
    marginTop: 6,
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
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
  exerciseCounterBadge: {
    marginLeft: "auto",
    backgroundColor: "rgba(56, 237, 216, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  exerciseCounterBadgeText: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
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
    lineHeight: 52,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  scoreXpPill: {
    color: "#C084FC",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    fontStyle: "italic",
  },
  tierPill: {
    backgroundColor: "rgba(56, 237, 216, 0.14)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  tierPillText: {
    color: "#38EDD8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
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
  paceIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(56, 237, 216, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  paceHeaderLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    textTransform: "uppercase",
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
    fontFamily: "monospace",
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
    height: 5,
    borderRadius: 2.5,
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
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(251, 146, 60, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statIconCirclePurple: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
    marginBottom: 16,
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
    fontFamily: "monospace",
    lineHeight: 18,
  },
  coachHighlightPill: {
    color: "#38EDD8",
    fontFamily: "monospace",
    fontWeight: "800",
  },
  coachChipsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
  },
  coachChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  coachChipText: {
    color: "#CBD5E1",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  // Exercise Breakdown Container
  breakdownContainer: {
    backgroundColor: "#11141E",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    gap: 10,
    marginBottom: 20,
  },
  exerciseCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(18, 22, 33, 0.6)",
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  exerciseThumbBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#1A2030",
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
  },
  exerciseImagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseIndexPill: {
    position: "absolute",
    top: 3,
    left: 3,
    backgroundColor: "rgba(7, 10, 17, 0.8)",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  exerciseIndexPillText: {
    color: "#38EDD8",
    fontSize: 8.5,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  exerciseInfoCol: {
    flex: 1,
  },
  exerciseTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  exerciseSubtitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    marginTop: 2,
  },
  exerciseAccCol: {
    alignItems: "flex-end",
    gap: 4,
  },
  exerciseAccNumber: {
    color: "#CBD5E1",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  completedMiniPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(56, 237, 216, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.3)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  completedMiniText: {
    color: "#38EDD8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  toggleMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    marginTop: 2,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 10,
  },
  toggleMoreText: {
    color: "#38EDD8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  // Action Buttons
  homeButton: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    shadowColor: "#258CE8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
    marginBottom: 12,
  },
  homeButtonGradient: {
    width: "100%",
    height: 54,
    borderRadius: 27,
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
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.28)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  repeatButtonInner: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  repeatButtonText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
