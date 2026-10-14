import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";
import {
  WORKOUT_PATH_DETAILS_MAP,
  WorkoutExerciseItem,
} from "../data/workoutPathDetailData";
import { AiWorkoutLiveScreen } from "./AiWorkoutLiveScreen";
import { CountdownScreen } from "./CountdownScreen";
import { GetReadyScreen } from "./GetReadyScreen";
import { WorkoutSummaryScreen } from "./WorkoutSummaryScreen";

export type AiWorkoutSessionStep =
  | "get-ready"
  | "countdown"
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
  const params = useLocalSearchParams<{
    pathId?: string;
    exerciseId?: string;
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

  // Flow State: 'get-ready' -> 'countdown' -> 'live' -> 'summary'
  const [sessionStep, setSessionStep] =
    useState<AiWorkoutSessionStep>("get-ready");

  const currentExercise: WorkoutExerciseItem =
    exercises[currentExerciseIndex] || {
      id: "bench-press",
      title: "BENCH PRESS\n(BARBELL)",
      subtitle: "4 Sets × 8-10 Reps",
      image: require("../../../../assets/pushDay/pd4.png"),
    };

  // Step 1: User completes requirements on Get Ready page -> start countdown
  const handleReady = () => {
    setSessionStep("countdown");
  };

  // Step 2: 3-2-1 countdown finishes -> start live workout
  const handleCountdownFinished = () => {
    setSessionStep("live");
  };

  // Step 3: User presses NEXT EXERCISE -> if more exercises remain, load next video/exercise; else show summary
  const handleNextExercise = () => {
    if (currentExerciseIndex + 1 < exercises.length) {
      setCurrentExerciseIndex((prev) => prev + 1);
      // Restart ready camera check or directly record next exercise
      setSessionStep("countdown");
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

  if (sessionStep === "live") {
    return (
      <AiWorkoutLiveScreen
        currentExercise={currentExercise}
        exerciseIndex={currentExerciseIndex}
        totalExercises={exercises.length}
        onNextExercise={handleNextExercise}
        onEndWorkout={handleEndEarly}
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
      onBackToHome={() => router.replace("/(tabs)/workouts" as any)}
      onRepeatWorkout={handleRepeatWorkout}
    />
  );
};
