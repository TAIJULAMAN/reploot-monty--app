import { useAppDispatch } from "@/store/hooks";
import {
  markExerciseComplete,
  setCurrentExerciseIndex as setReduxExerciseIndex,
} from "@/store/slices/workoutSlice";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  WORKOUT_PATH_DETAILS_MAP,
  WorkoutExerciseItem,
} from "../data/workoutPathDetailData";
import { AiWorkoutCameraRecordScreen } from "./AiWorkoutCameraRecordScreen";
import { AiWorkoutLiveScreen } from "./AiWorkoutLiveScreen";
import { CountdownScreen } from "./CountdownScreen";
import { GetReadyScreen } from "./GetReadyScreen";
import { WorkoutSummaryScreen } from "./WorkoutSummaryScreen";

export type AiWorkoutSessionStep =
  | "get-ready"
  | "countdown"
  | "camera-record"
  | "stats"
  | "live"
  | "summary";

export interface AiWorkoutFlowControllerProps {
  initialPathId?: string;
  initialExerciseId?: string;
}

export const AiWorkoutFlowController: React.FC<
  AiWorkoutFlowControllerProps
> = ({ initialPathId, initialExerciseId }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams<{
    pathId?: string;
    exerciseId?: string;
    step?: string;
  }>();

  const pathKey = (initialPathId || params.pathId || "push").toLowerCase();
  const workoutRoutine =
    WORKOUT_PATH_DETAILS_MAP[pathKey] || WORKOUT_PATH_DETAILS_MAP.push;
  const exercises = workoutRoutine.exercises || [];

  // Determine initial exercise index
  const requestedExerciseId = initialExerciseId || params.exerciseId;
  const initialIndex = exercises.findIndex(
    (ex) => ex.id === requestedExerciseId
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(
    initialIndex >= 0 ? initialIndex : 0
  );

  // Flow State: 'get-ready' -> 'countdown' -> 'camera-record' -> 'stats' -> next exercise 'camera-record' -> 'stats' -> ... -> 'summary'
  const [sessionStep, setSessionStep] = useState<AiWorkoutSessionStep>(
    (params.step as AiWorkoutSessionStep) || "get-ready"
  );

  useEffect(() => {
    if (params.step) {
      setSessionStep(params.step as AiWorkoutSessionStep);
    }
  }, [params.step]);

  const currentExercise: WorkoutExerciseItem =
    exercises[currentExerciseIndex] || {
      id: "bench-press",
      title: "BENCH PRESS\n(BARBELL)",
      subtitle: "4 Sets × 8-10 Reps",
      image: require("../../../../assets/pushDay/pd4.png"),
    };

  // Step 1: User finishes Get Ready checks -> start 3-second countdown
  const handleReady = () => {
    setSessionStep("countdown");
  };

  // Step 2: 3-2-1 countdown finishes -> start Camera recording for active exercise
  const handleCountdownFinished = () => {
    setSessionStep("camera-record");
  };

  // Step 3: User finishes taking the record on camera -> show the exercise Statistics page
  const handleRecordFinished = () => {
    setSessionStep("stats");
  };

  // Step 4: User presses NEXT EXERCISE on stats page -> mark current complete, advance to next exercise, and open the camera
  const handleNextExercise = () => {
    // 1. Mark current exercise as complete in Redux store
    dispatch(markExerciseComplete(currentExercise.id));

    if (currentExerciseIndex + 1 < exercises.length) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      dispatch(setReduxExerciseIndex(nextIndex));
      // Start 2nd/next exercise and immediately OPEN THE CAMERA to record!
      setSessionStep("camera-record");
    } else {
      // Completed all exercises -> show Workout Summary
      setSessionStep("summary");
    }
  };

  const handleEndEarly = () => {
    setSessionStep("summary");
  };

  const handleBackToWorkouts = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/workouts");
    }
  };

  const handleRepeatWorkout = () => {
    setCurrentExerciseIndex(0);
    setSessionStep("get-ready");
  };

  if (sessionStep === "get-ready") {
    return (
      <GetReadyScreen
        exerciseTitle={currentExercise.title}
        onReady={handleReady}
        onBack={handleBackToWorkouts}
      />
    );
  }

  if (sessionStep === "countdown") {
    return (
      <CountdownScreen
        onCountdownComplete={handleCountdownFinished}
        onCancel={handleBackToWorkouts}
      />
    );
  }

  if (sessionStep === "camera-record") {
    return (
      <AiWorkoutCameraRecordScreen
        currentExercise={currentExercise}
        exerciseIndex={currentExerciseIndex}
        totalExercises={exercises.length}
        onCompleteRecord={handleRecordFinished}
        onBack={handleBackToWorkouts}
      />
    );
  }

  if (sessionStep === "stats" || sessionStep === "live") {
    return (
      <AiWorkoutLiveScreen
        currentExercise={currentExercise}
        exerciseIndex={currentExerciseIndex}
        totalExercises={exercises.length}
        onNextExercise={handleNextExercise}
        onEndWorkout={handleEndEarly}
        onBack={handleBackToWorkouts}
      />
    );
  }

  return (
    <WorkoutSummaryScreen
      score={992}
      xpEarned={850}
      accuracy={98.4}
      completedExercisesCount={exercises.length}
      totalExercisesCount={exercises.length}
      durationFormatted="45:12"
      caloriesBurned={560}
      paceMps="1.25 m/s"
      workoutTitle="PUSH DAY PROTOCOL"
      workoutSubtitle="Chest, Shoulders & Triceps Focus"
      description="High-intensity hypertrophy protocol targeting chest, shoulders, and triceps. Exceptional biomechanical execution and steady tempo maintained across all cleared sets."
      exercises={exercises}
      onBackToHome={() => router.replace("/(tabs)/home" as any)}
      onRepeatWorkout={handleRepeatWorkout}
    />
  );
};
