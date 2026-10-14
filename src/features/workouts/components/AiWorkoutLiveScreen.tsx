import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Clock,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Waves,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Circle as SvgCircle,
  Line as SvgLine,
  Polygon as SvgPolygon,
} from "react-native-svg";
import { WorkoutExerciseItem } from "../data/workoutPathDetailData";

const { width, height } = Dimensions.get("window");

export interface AiWorkoutLiveScreenProps {
  currentExercise: WorkoutExerciseItem;
  exerciseIndex: number;
  totalExercises: number;
  onNextExercise: () => void;
  onEndWorkout: () => void;
}

export const AiWorkoutLiveScreen: React.FC<AiWorkoutLiveScreenProps> = ({
  currentExercise,
  exerciseIndex,
  totalExercises,
  onNextExercise,
  onEndWorkout,
}) => {
  const insets = useSafeAreaInsets();

  // Dynamic Workout Tracking State
  const [reps, setReps] = useState<number>(12);
  const [targetReps] = useState<number>(15);
  const [accuracy] = useState<number>(94);
  const [nextBreakSec, setNextBreakSec] = useState<number>(45);
  const [currentSet] = useState<number>(2);
  const [totalSets] = useState<number>(4);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Live Timer countdown simulation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setNextBreakSec((prev) => (prev > 0 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Form Accuracy Ring Calculations
  const radius = 28;
  const strokeWidth = 4;
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
        () => {}
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

  const cleanExerciseTitle = currentExercise.title.replace(/\n/g, " ");

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Fullscreen Video / Studio Athlete Background with exact neon pose mesh */}
      <Image
        source={require("../../../../assets/workout/aiWorkoutAthletePose.png")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      {/* Cyber Subtle Gradient Vignette Overlay */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={[
            "rgba(7, 10, 17, 0.45)",
            "transparent",
            "rgba(7, 10, 17, 0.9)",
          ]}
          locations={[0, 0.4, 0.88]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Top Header Bar */}
      <View style={[styles.topHeader, { paddingTop: Math.max(insets.top + 8, 24) }]}>
        <View>
          <Text style={styles.headerTitle}>AI</Text>
          <Text style={styles.headerTitle}>WORKOUT</Text>
        </View>

        {/* Pause / Resume Button */}
        <Pressable style={styles.pauseCircleBtn} onPress={togglePause}>
          {isPaused ? (
            <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Pause size={18} color="#FFFFFF" />
          )}
        </Pressable>
      </View>

      {/* Live AI Form Cue Pill */}
      <View style={styles.aiCueWrapper}>
        <View style={styles.aiCuePill}>
          <Waves size={16} color="#38EDD8" />
          <Text style={styles.aiCueText}>STRAIGHTEN YOUR BACK</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.telemetryOverlayContainer}>
        {/* Row 1: REPS Card + ACCURACY Card */}
        <View style={styles.telemetryRow1}>
          {/* Left Glass Card: REPS */}
          <View style={styles.repsGlassCard}>
            <Text style={styles.cardMiniLabel}>REPS</Text>
            <Text style={styles.repsLargeNumber}>{reps}</Text>
            <Text style={styles.cardTargetLabel}>TARGET: {targetReps}</Text>
          </View>

          {/* Right Glass Card: ACCURACY */}
          <View style={styles.accuracyGlassCard}>
            <View style={styles.accuracyTopRow}>
              <Text style={styles.cardMiniLabel}>ACCURACY</Text>
              <Sparkles size={13} color="#38EDD8" />
            </View>

            {/* Circular Ring Gauge */}
            <View style={styles.ringCenterBox}>
              <Svg width="72" height="72" viewBox="0 0 72 72">
                <SvgCircle
                  cx="36"
                  cy="36"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <SvgCircle
                  cx="36"
                  cy="36"
                  r={radius}
                  stroke="#38EDD8"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(-90 36 36)"
                />
              </Svg>
              <Text style={styles.accuracyValueText}>{accuracy}%</Text>
            </View>
          </View>
        </View>

        {/* Row 2: NEXT BREAK Card */}
        <View style={styles.telemetryRow2}>
          <View style={styles.breakGlassCard}>
            <Text style={styles.cardMiniLabel}>NEXT BREAK</Text>
            <View style={styles.breakTimeRow}>
              <Text style={styles.breakTimerText}>
                {formatSeconds(nextBreakSec)}
              </Text>
              <Clock size={16} color="#38EDD8" />
            </View>
          </View>
        </View>

        {/* Current Exercise Title & Sets Completed */}
        <View style={styles.currentExerciseRow}>
          <View style={styles.exerciseTitleCol}>
            <View style={styles.cyanIndicatorBar} />
            <View>
              <Text style={styles.currentExerciseTag}>CURRENT EXERCISE</Text>
              <Text style={styles.exerciseNameText} numberOfLines={1}>
                {cleanExerciseTitle}
              </Text>
            </View>
          </View>

          <View style={styles.setsProgressBox}>
            <Text style={styles.setsProgressNumber}>
              {exerciseIndex + 1}/{totalExercises}
            </Text>
            <Text style={styles.setsProgressLabel}>EXERCISE</Text>
          </View>
        </View>

        {/* Action Button: NEXT EXERCISE -> */}
        <Pressable
          style={({ pressed }) => [
            styles.nextExerciseButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}
          onPress={handleNext}
        >
          <LinearGradient
            colors={["#1E6BB8", "#258CE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {exerciseIndex + 1 >= totalExercises
                ? "FINISH WORKOUT"
                : "NEXT EXERCISE"}
            </Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>

        {/* End Workout Session link */}
        <Pressable style={styles.endWorkoutLink} onPress={onEndWorkout}>
          <Text style={styles.endWorkoutText}>END WORKOUT SESSION</Text>
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
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    zIndex: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textShadowColor: "rgba(56, 237, 216, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    ...(Platform.OS === "web"
      ? ({
          filter: "drop-shadow(0 0 16px rgba(56, 237, 216, 0.7))",
        } as any)
      : {}),
  },
  pauseCircleBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(10, 14, 24, 0.7)",
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  // AI Cue Pill
  aiCueWrapper: {
    alignItems: "center",
    marginTop: 18,
    zIndex: 10,
  },
  aiCuePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(10, 14, 24, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.45)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  aiCueText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  // Telemetry Overlay
  telemetryOverlayContainer: {
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingBottom: 28,
    zIndex: 10,
  },
  telemetryRow1: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  repsGlassCard: {
    flex: 1,
    backgroundColor: "rgba(10, 14, 24, 0.72)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    padding: 16,
    justifyContent: "space-between",
  },
  cardMiniLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  repsLargeNumber: {
    color: "#FFFFFF",
    fontSize: 48,
    lineHeight: 52,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  cardTargetLabel: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  accuracyGlassCard: {
    flex: 1,
    backgroundColor: "rgba(10, 14, 24, 0.72)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    padding: 16,
    alignItems: "center",
  },
  accuracyTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 6,
  },
  ringCenterBox: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  accuracyValueText: {
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
  },

  telemetryRow2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  breakGlassCard: {
    width: "48%",
    backgroundColor: "rgba(10, 14, 24, 0.72)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  breakTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  breakTimerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "monospace",
    fontWeight: "900",
  },

  // Exercise Title Col
  currentExerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  exerciseTitleCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    marginRight: 10,
  },
  cyanIndicatorBar: {
    width: 4,
    height: 38,
    borderRadius: 2,
    backgroundColor: "#6366F1",
  },
  currentExerciseTag: {
    color: "#64748B",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  exerciseNameText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  setsProgressBox: {
    alignItems: "flex-end",
  },
  setsProgressNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  setsProgressLabel: {
    color: "#64748B",
    fontSize: 8.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  // Next Exercise Button
  nextExerciseButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    shadowColor: "#258CE8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
    marginBottom: 14,
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
    fontSize: 13.5,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  endWorkoutLink: {
    alignItems: "center",
    paddingVertical: 6,
  },
  endWorkoutText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
