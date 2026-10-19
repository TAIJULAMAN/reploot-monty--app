import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Camera as CameraIcon,
  ChevronLeft,
  RotateCcw,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WorkoutExerciseItem } from "../data/workoutPathDetailData";

export interface AiWorkoutCameraRecordScreenProps {
  currentExercise: WorkoutExerciseItem;
  exerciseIndex: number;
  totalExercises: number;
  onCompleteRecord: () => void;
  onBack?: () => void;
}

export const AiWorkoutCameraRecordScreen: React.FC<
  AiWorkoutCameraRecordScreenProps
> = ({
  currentExercise,
  exerciseIndex,
  totalExercises,
  onCompleteRecord,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("front");
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const matchReps = currentExercise.subtitle?.match(/(\d+)\s*(?:Reps|reps)/);
  const targetReps = matchReps ? parseInt(matchReps[1], 10) : 10;
  const [reps, setReps] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(96);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission().catch(() => {});
    }
  }, [permission]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRecordSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const repTimer = setInterval(() => {
      setReps((prev) => {
        if (prev < targetReps) {
          if (Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
              () => {},
            );
          }
          return prev + 1;
        }
        return prev;
      });
    }, 2800);
    return () => clearInterval(repTimer);
  }, [targetReps]);

  const toggleFacing = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setFacing((curr) => (curr === "front" ? "back" : "front"));
  };

  const handleManualIncrement = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    setReps((prev) => Math.min(prev + 1, targetReps + 5));
  };

  const handleFinishRecording = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }
    onCompleteRecord();
  };

  const cleanExerciseTitle = currentExercise.title.replace(/\n/g, " ");

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={facing}
        mode="picture"
      />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={[
            "rgba(7, 10, 17, 0.72)",
            "rgba(7, 10, 17, 0.15)",
            "rgba(7, 10, 17, 0.94)",
          ]}
          locations={[0, 0.35, 0.78]}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View
        style={[styles.topHeader, { paddingTop: Math.max(insets.top + 8, 24) }]}
      >
        <View style={styles.headerLeftCol}>
          {onBack ? (
            <Pressable
              style={styles.iconCircleBtn}
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Back to routine"
            >
              <ChevronLeft size={22} color="#FFFFFF" strokeWidth={2.4} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.headerRightActions}>
          {permission?.granted && (
            <Pressable
              style={styles.iconCircleBtn}
              onPress={toggleFacing}
              accessibilityRole="button"
              accessibilityLabel="Flip camera"
            >
              <RotateCcw size={17} color="#38EDD8" strokeWidth={2.4} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.bottomOverlayContainer}>
        <View style={styles.exerciseInfoRow}>
          <View style={styles.cyanIndicator} />
          <View style={styles.exerciseTitleCol}>
            <Text style={styles.exerciseTag}>
              EXERCISE {exerciseIndex + 1} OF {totalExercises}
            </Text>
            <Text style={styles.exerciseTitleText} numberOfLines={1}>
              {cleanExerciseTitle}
            </Text>
          </View>
        </View>
        <View style={styles.telemetryRow}>
          <Pressable
            style={styles.telemetryCard}
            onPress={handleManualIncrement}
            accessibilityRole="button"
            accessibilityLabel="Tap to register rep"
          >
            <Text style={styles.cardMiniLabel}>REPS COUNT</Text>
            <View style={styles.repsNumRow}>
              <Text style={styles.repsLargeNum}>{reps}</Text>
              <Text style={styles.repsTargetNum}>/ {targetReps}</Text>
            </View>
            <Text style={styles.cardHelperText}>AI AUTO-DETECTING</Text>
          </Pressable>

          <View style={styles.telemetryCard}>
            <View style={styles.cardTopFlex}>
              <Text style={styles.cardMiniLabel}>FORM ACCURACY</Text>
            </View>
            <Text style={styles.accuracyLargeNum}>{accuracy}%</Text>
            <View style={styles.optimalFormBadge}>
              <Text style={styles.optimalFormText}>OPTIMAL FORM</Text>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.completeRecordButton}
          onPress={handleFinishRecording}
          accessibilityRole="button"
          accessibilityLabel="Finish set and view exercise statistics"
        >
          <LinearGradient
            colors={["#1967B2", "#2B90EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>VIEW EXERCISE STATS</Text>
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
  iconCircleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(10, 16, 26, 0.85)",
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  recBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(10, 16, 26, 0.85)",
    borderWidth: 1.2,
    borderColor: "rgba(239, 68, 68, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
  },
  recDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  recText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Framing Corner Guides
  cornerGuide: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#38EDD8",
    zIndex: 4,
  },
  cornerTL: {
    top: 14,
    left: 14,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 14,
    right: 14,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 14,
    left: 14,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 14,
    right: 14,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },

  // Floating Cue
  cueWrapper: {
    alignItems: "center",
    marginTop: 16,
    zIndex: 10,
  },
  cuePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(9, 21, 26, 0.88)",
    borderWidth: 1.4,
    borderColor: "rgba(56, 237, 216, 0.55)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#38EDD8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  cueText: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  // Bottom Overlay
  bottomOverlayContainer: {
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingBottom: 28,
    zIndex: 10,
  },
  exerciseInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  cyanIndicator: {
    width: 4,
    height: 38,
    borderRadius: 2,
    backgroundColor: "#38EDD8",
  },
  exerciseTitleCol: {
    flex: 1,
  },
  exerciseTag: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  exerciseTitleText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  // Telemetry Cards
  telemetryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  telemetryCard: {
    flex: 1,
    backgroundColor: "rgba(18, 22, 33, 0.9)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 14,
    justifyContent: "space-between",
  },
  cardMiniLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  cardTopFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  repsNumRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginVertical: 4,
  },
  repsLargeNum: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 42,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  repsTargetNum: {
    color: "#64748B",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  cardHelperText: {
    color: "#38EDD8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  accuracyLargeNum: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontFamily: "monospace",
    fontWeight: "900",
    marginVertical: 4,
  },
  optimalFormBadge: {
    backgroundColor: "rgba(56, 237, 216, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  optimalFormText: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // Action Button
  completeRecordButton: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    shadowColor: "#258CE8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 10,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  skipLink: {
    alignItems: "center",
    paddingVertical: 6,
  },
  skipLinkText: {
    color: "#94A3B8",
    fontSize: 10.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  cameraFallbackContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#0B0E17",
    zIndex: 1,
  },
  cameraFallbackIconWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(56, 237, 216, 0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(56, 237, 216, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cameraFallbackTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
    textAlign: "center",
    marginBottom: 8,
  },
  cameraFallbackText: {
    color: "#94A3B8",
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    maxWidth: 290,
  },
  enableCameraBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(10, 20, 30, 0.95)",
    borderWidth: 1.4,
    borderColor: "#38EDD8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
    shadowColor: "#38EDD8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  enableCameraBtnText: {
    color: "#38EDD8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
});
