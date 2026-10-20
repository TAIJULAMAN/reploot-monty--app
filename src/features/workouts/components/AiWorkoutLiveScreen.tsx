import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Activity,
  ArrowRight,
  Check,
  ChevronLeft,
  Clock,
  Dumbbell,
  Flame,
  Minus,
  Pause,
  Play,
  Plus,
  Sparkles,
  TrendingUp,
  Waves,
  Zap,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
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
import { WorkoutExerciseItem } from "../data/workoutPathDetailData";

const { width } = Dimensions.get("window");

export interface AiWorkoutLiveScreenProps {
  currentExercise: WorkoutExerciseItem;
  exerciseIndex: number;
  totalExercises: number;
  onNextExercise: () => void;
  onEndWorkout: () => void;
  onBack?: () => void;
}

export const AiWorkoutLiveScreen: React.FC<AiWorkoutLiveScreenProps> = ({
  currentExercise,
  exerciseIndex,
  totalExercises,
  onNextExercise,
  onEndWorkout,
  onBack,
}) => {
  const insets = useSafeAreaInsets();

  // Dynamic Workout Tracking State
  const [reps, setReps] = useState<number>(exerciseIndex === 0 ? 12 : 0);
  const [targetReps, setTargetReps] = useState<number>(15);
  const [accuracy, setAccuracy] = useState<number>(
    exerciseIndex === 0 ? 94 : 98,
  );
  const [nextBreakSec, setNextBreakSec] = useState<number>(45);
  const [currentSet, setCurrentSet] = useState<number>(
    exerciseIndex === 0 ? 2 : 1,
  );
  const [totalSets, setTotalSets] = useState<number>(4);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // When exercise changes (e.g. clicking NEXT EXERCISE to redirect to Exercise 2)
  useEffect(() => {
    const matchReps = currentExercise.subtitle?.match(/(\d+)\s*(?:Reps|reps)/);
    const parsedTarget = matchReps ? parseInt(matchReps[1], 10) : 12;
    const matchSets = currentExercise.subtitle?.match(/(\d+)\s*(?:Sets|sets)/);
    const parsedSets = matchSets ? parseInt(matchSets[1], 10) : 4;

    setTargetReps(parsedTarget);
    setTotalSets(parsedSets);
    setCurrentSet(1);

    if (exerciseIndex === 0) {
      setReps(12);
      setAccuracy(94);
    } else {
      setReps(0);
      setAccuracy(98);
    }
    setNextBreakSec(45);
    setIsPaused(false);
  }, [currentExercise.id, exerciseIndex]);

  // Live Timer countdown simulation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setNextBreakSec((prev) => (prev > 0 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Ring Gauge Calculations
  const radius = 32;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - accuracy / 100);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainingSec).padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }
    onNextExercise();
  };

  const togglePause = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setIsPaused((prev) => !prev);
  };

  const adjustReps = (delta: number) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    setReps((prev) => Math.max(0, Math.min(30, prev + delta)));
  };

  const adjustBreakTime = (delta: number) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setNextBreakSec((prev) => Math.max(0, prev + delta));
  };

  const cleanExerciseTitle = currentExercise.title.replace(/\n/g, " ");
  const repsProgress = Math.min(100, Math.round((reps / targetReps) * 100));

  // Dynamic set breakdown
  const setsData = Array.from({ length: totalSets }, (_, i) => {
    const setNum = i + 1;
    const isCompleted = setNum < currentSet;
    const isCurrent = setNum === currentSet;
    const targetSetReps = targetReps;
    const setRepsLogged = isCompleted ? targetSetReps : isCurrent ? reps : "-";
    const weightKg = 60 + i * 2.5;
    const acc = isCompleted ? 96 - i : isCurrent ? accuracy : "-";
    return {
      setNum,
      isCompleted,
      isCurrent,
      reps: setRepsLogged,
      weightKg,
      acc,
    };
  });

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Top Header Bar */}
      <View
        style={[styles.topHeader, { paddingTop: Math.max(insets.top + 8, 20) }]}
      >
        <View style={styles.headerLeftCol}>
          {onBack ? (
            <Pressable
              style={styles.backButton}
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Back to exercise routine"
            >
              <ChevronLeft size={22} color="#FFFFFF" strokeWidth={2.4} />
            </Pressable>
          ) : null}
          <View>
            <Text style={styles.headerCategory}>EXERCISE TELEMETRY</Text>
          </View>
        </View>

        {/* Right Action: Pause / Resume Button */}
        <Pressable
          style={[styles.pauseBtn, isPaused && styles.pauseBtnActive]}
          onPress={togglePause}
        >
          {isPaused ? (
            <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Pause size={16} color="#38EDD8" />
          )}
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 16) + 120 },
        ]}
      >
        {/* Active Exercise Hero Card */}
        <View style={styles.exerciseHeroCard}>
          <View style={styles.heroImageWrapper}>
            {currentExercise.image ? (
              <Image
                source={currentExercise.image}
                style={styles.heroThumbnail}
                contentFit="cover"
              />
            ) : null}
            <View style={styles.indexBadge}>
              <Text style={styles.indexBadgeText}>
                {currentExercise.index || `0${exerciseIndex + 1}`}
              </Text>
            </View>
          </View>

          <View style={styles.heroTextCol}>
            <View style={styles.heroStatusRow}>
              <View style={styles.activePill}>
                <View style={styles.pulsingDot} />
                <Text style={styles.activePillText}>IN PROGRESS</Text>
              </View>
              <Text style={styles.progressCounterText}>
                {exerciseIndex + 1} OF {totalExercises}
              </Text>
            </View>

            <Text style={styles.exerciseNameText} numberOfLines={2}>
              {cleanExerciseTitle}
            </Text>
            <Text style={styles.exerciseSubtitleText}>
              {currentExercise.subtitle}
            </Text>
          </View>
        </View>

        {/* Primary Statistics Grid (Bento Layout) */}
        <View style={styles.statsGridRow}>
          {/* Bento Card 1: REPS TRACKER */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>REPS LOGGED</Text>
              <Dumbbell size={15} color="#38EDD8" strokeWidth={2.4} />
            </View>

            <View style={styles.repsDisplayRow}>
              <Text style={styles.repsMainNumber}>{reps}</Text>
              <Text style={styles.repsTargetText}>/ {targetReps}</Text>
            </View>

            {/* Reps Progress Bar */}
            <View style={styles.repsProgressBarTrack}>
              <View
                style={[
                  styles.repsProgressBarFill,
                  { width: `${repsProgress}%` },
                ]}
              />
            </View>
            <Text style={styles.repsProgressSub}>
              {repsProgress}% OF TARGET COMPLETED
            </Text>

            {/* Reps Adjusters (+ / -) */}
            <View style={styles.repAdjustRow}>
              <Pressable
                style={styles.adjustBtn}
                onPress={() => adjustReps(-1)}
                accessibilityRole="button"
                accessibilityLabel="Decrease rep"
              >
                <Minus size={14} color="#FFFFFF" />
              </Pressable>
              <Pressable
                style={[styles.adjustBtn, styles.adjustBtnAdd]}
                onPress={() => adjustReps(1)}
                accessibilityRole="button"
                accessibilityLabel="Increase rep"
              >
                <Plus size={14} color="#0B0F19" strokeWidth={3} />
              </Pressable>
            </View>
          </View>

          {/* Bento Card 2: FORM ACCURACY */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>FORM ACCURACY</Text>
              <Sparkles size={15} color="#38EDD8" strokeWidth={2.4} />
            </View>

            <View style={styles.ringCenterContainer}>
              <Svg width="80" height="80" viewBox="0 0 80 80">
                <SvgCircle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <SvgCircle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="#38EDD8"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(-90 40 40)"
                />
              </Svg>
              <View style={styles.ringAbsoluteCenter}>
                <Text style={styles.accuracyNumberText}>{accuracy}%</Text>
              </View>
            </View>

            <View style={styles.accuracyRatingPill}>
              <Text style={styles.accuracyRatingText}>
                {accuracy >= 90 ? "OPTIMAL FORM" : "STEADY FORM"}
              </Text>
            </View>
            <Text style={styles.accuracySubText}>AI REAL-TIME FEEDBACK</Text>
          </View>
        </View>

        {/* Secondary Row: REST TIMER & VOLUME */}
        <View style={styles.statsGridRow}>
          {/* Card 3: NEXT BREAK */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>REST INTERVAL</Text>
              <Clock size={15} color="#38EDD8" strokeWidth={2.4} />
            </View>

            <Text style={styles.timerLargeText}>
              {formatSeconds(nextBreakSec)}
            </Text>
            <Text style={styles.timerSubText}>NEXT SET REST</Text>

            <View style={styles.timerQuickRow}>
              <Pressable
                style={styles.quickTimerBtn}
                onPress={() => adjustBreakTime(-15)}
              >
                <Text style={styles.quickTimerText}>-15S</Text>
              </Pressable>
              <Pressable
                style={styles.quickTimerBtn}
                onPress={() => adjustBreakTime(15)}
              >
                <Text style={styles.quickTimerText}>+15S</Text>
              </Pressable>
            </View>
          </View>

          {/* Card 4: INTENSITY & ENERGY */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>ENERGY BURN</Text>
              <Flame size={15} color="#F59E0B" strokeWidth={2.4} />
            </View>

            <View style={styles.metricPairRow}>
              <Text style={styles.burnNumber}>92</Text>
              <Text style={styles.burnUnit}>KCAL</Text>
            </View>
            <Text style={styles.burnSubText}>ESTIMATED OUTPUT</Text>

            <View style={styles.volumeMiniRow}>
              <TrendingUp size={12} color="#38EDD8" />
              <Text style={styles.volumeMiniText}>VOL LOAD: 720 KG</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Area */}
      <View
        style={[
          styles.bottomActionBar,
          { paddingBottom: Math.max(insets.bottom, 14) + 8 },
        ]}
      >
        <Pressable
          style={styles.nextExerciseButton}
          onPress={handleNext}
          accessibilityRole="button"
          accessibilityLabel={
            exerciseIndex + 1 >= totalExercises
              ? "Finish workout"
              : "Next exercise"
          }
        >
          <LinearGradient
            colors={["#1967B2", "#2B90EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {exerciseIndex + 1 >= totalExercises
                ? "FINISH WORKOUT"
                : "NEXT EXERCISE"}
            </Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  headerLeftCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(18, 22, 33, 0.85)",
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCategory: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  pauseBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(18, 22, 33, 0.85)",
    borderWidth: 1.2,
    borderColor: "rgba(56, 237, 216, 0.45)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  pauseBtnActive: {
    backgroundColor: "rgba(37, 140, 232, 0.35)",
    borderColor: "#38BDF8",
  },
  pauseBtnText: {
    color: "#38EDD8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  pauseBtnTextActive: {
    color: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // Active Exercise Hero Card
  exerciseHeroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(18, 22, 33, 0.92)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    marginBottom: 16,
  },
  heroImageWrapper: {
    width: 68,
    height: 68,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#0F121A",
    position: "relative",
    borderWidth: 1.2,
    borderColor: "rgba(56, 237, 216, 0.35)",
  },
  heroThumbnail: {
    width: "100%",
    height: "100%",
  },
  indexBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(8, 10, 16, 0.85)",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
  },
  indexBadgeText: {
    color: "#38EDD8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  heroTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  heroStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(56, 237, 216, 0.12)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38EDD8",
  },
  activePillText: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  progressCounterText: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  exerciseNameText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "monospace",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  exerciseSubtitleText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "500",
    marginTop: 2,
  },

  // Bento Stats Grid
  statsGridRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(18, 22, 33, 0.88)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    justifyContent: "space-between",
  },
  statCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statCardLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  repsDisplayRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  repsMainNumber: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 42,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  repsTargetText: {
    color: "#64748B",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  repsProgressBarTrack: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 3,
    overflow: "hidden",
    marginVertical: 8,
  },
  repsProgressBarFill: {
    height: "100%",
    backgroundColor: "#38EDD8",
    borderRadius: 3,
  },
  repsProgressSub: {
    color: "#38EDD8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  repAdjustRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  adjustBtn: {
    flex: 1,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  adjustBtnAdd: {
    backgroundColor: "#38EDD8",
  },

  // Ring Center
  ringCenterContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    position: "relative",
    height: 80,
  },
  ringAbsoluteCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  accuracyNumberText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  accuracyRatingPill: {
    alignSelf: "center",
    backgroundColor: "rgba(56, 237, 216, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 10,
    marginTop: 4,
  },
  accuracyRatingText: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  accuracySubText: {
    color: "#64748B",
    fontSize: 8.5,
    fontFamily: "monospace",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 4,
    letterSpacing: 0.5,
  },

  // Timer Card
  timerLargeText: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  timerSubText: {
    color: "#94A3B8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  timerQuickRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  quickTimerBtn: {
    flex: 1,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickTimerText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },

  // Metric Pair
  metricPairRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  burnNumber: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  burnUnit: {
    color: "#F59E0B",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  burnSubText: {
    color: "#94A3B8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  volumeMiniRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
  },
  volumeMiniText: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // AI Form Insight Card
  aiInsightCard: {
    backgroundColor: "rgba(14, 25, 36, 0.9)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.35)",
    padding: 16,
    marginBottom: 16,
  },
  aiInsightHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  aiBadgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  aiBadgeText: {
    color: "#38EDD8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  aiLiveTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(251, 191, 36, 0.15)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  aiLiveTagText: {
    color: "#FBBF24",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  aiCueText: {
    color: "#E2E8F0",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "500",
    marginBottom: 12,
  },
  aiMetricsRow: {
    flexDirection: "row",
    gap: 8,
  },
  aiMetricChip: {
    flex: 1,
    backgroundColor: "rgba(8, 14, 24, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  aiMetricChipLabel: {
    color: "#94A3B8",
    fontSize: 8.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  aiMetricChipVal: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    marginTop: 2,
  },

  // Sets Progression Table
  setsTableContainer: {
    backgroundColor: "rgba(18, 22, 33, 0.88)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    marginBottom: 16,
  },
  setsTableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  setsTableTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  setsTableSubtitle: {
    color: "#38EDD8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  setsListWrapper: {
    gap: 8,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(10, 14, 22, 0.6)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  setRowCurrent: {
    borderColor: "rgba(56, 237, 216, 0.5)",
    backgroundColor: "rgba(14, 25, 36, 0.95)",
  },
  setRowCompleted: {
    borderColor: "rgba(56, 237, 216, 0.25)",
  },
  setRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  setNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  setNumberCircleCompleted: {
    backgroundColor: "rgba(56, 237, 216, 0.2)",
    borderWidth: 1,
    borderColor: "#38EDD8",
  },
  setNumberCircleCurrent: {
    backgroundColor: "#38EDD8",
  },
  setNumberText: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  setNumberTextCurrent: {
    color: "#0B0F19",
  },
  setLabelText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  setLabelTextCurrent: {
    color: "#FFFFFF",
  },
  setRowMetrics: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  setMetricText: {
    color: "#E2E8F0",
    fontSize: 11.5,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  setDotDivider: {
    color: "#475569",
    fontSize: 10,
  },
  setMetricAcc: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  setMetricAccCompleted: {
    color: "#38EDD8",
  },
  setStatusCol: {
    minWidth: 54,
    alignItems: "flex-end",
  },
  statusDoneBadge: {
    backgroundColor: "rgba(56, 237, 216, 0.15)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusDoneText: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statusActiveBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.2)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusActiveText: {
    color: "#38BDF8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statusPendingText: {
    color: "#64748B",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Bottom Sticky Action Bar
  bottomActionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "rgba(7, 10, 17, 0.94)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  nextExerciseButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 8,
  },
  nextButtonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  secondaryLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  exitLinkBtn: {
    alignItems: "center",
    paddingVertical: 4,
  },
  exitLinkText: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
