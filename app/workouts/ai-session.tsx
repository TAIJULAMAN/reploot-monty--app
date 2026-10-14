import { AiWorkoutFlowController } from "@/features/workouts";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function AiWorkoutSessionRoute() {
  const params = useLocalSearchParams<{
    pathId?: string;
    exerciseId?: string;
  }>();

  return (
    <AiWorkoutFlowController
      initialPathId={params.pathId}
      initialExerciseId={params.exerciseId}
    />
  );
}
