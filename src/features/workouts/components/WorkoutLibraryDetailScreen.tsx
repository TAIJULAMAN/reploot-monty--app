import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CHEST_WORKOUT_DETAIL_DATA,
  WorkoutLibraryDetailData,
} from "../data/workoutLibraryDetailData";
import { StartAiWorkoutButton } from "./StartAiWorkoutButton";
import { WorkoutLibraryDetailHeroCard } from "./WorkoutLibraryDetailHeroCard";
import { WorkoutLibraryExerciseCard } from "./WorkoutLibraryExerciseCard";

export interface WorkoutLibraryDetailScreenProps {
  data?: WorkoutLibraryDetailData;
  onBack?: () => void;
  onStartWorkout?: () => void;
  onSelectExercise?: (exerciseId: string) => void;
}

export const WorkoutLibraryDetailScreen: React.FC<
  WorkoutLibraryDetailScreenProps
> = ({
  data = CHEST_WORKOUT_DETAIL_DATA,
  onBack,
  onStartWorkout,
  onSelectExercise,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/workouts/library");
    }
  };

  const handleStartWorkout = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    onStartWorkout?.();
  };

  const handleExercisePress = (exerciseId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onSelectExercise) {
      onSelectExercise(exerciseId);
    } else {
      router.push({
        pathname: "/workouts/exercise-detail" as any,
        params: { id: exerciseId },
      });
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <CustomHeader
        transparent={true}
        showBackButton={true}
        onPressBack={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 24, 40) },
        ]}
      >
        {/* Top Hero Card */}
        <WorkoutLibraryDetailHeroCard
          image={data.heroImage}
          protocolBadge={data.protocolBadge}
          title={data.title}
          titleSecondary={data.titleSecondary}
          duration={data.duration}
          calories={data.calories}
          exerciseCount={data.exerciseCount}
        />

        {/* Section Header: SESSION PREVIEW */}
        <Text style={styles.sectionHeader}>SESSION PREVIEW</Text>

        {/* Exercises List */}
        <View style={styles.exercisesContainer}>
          {data.exercises.map((exercise) => (
            <WorkoutLibraryExerciseCard
              key={exercise.id}
              exercise={exercise}
              onPress={() => handleExercisePress(exercise.id)}
            />
          ))}
        </View>
        <StartAiWorkoutButton inline onPress={handleStartWorkout} />
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
  sectionHeader: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "monospace",
    marginTop: 22,
    marginBottom: 12,
  },
  exercisesContainer: {
    marginBottom: 8,
  },
});
