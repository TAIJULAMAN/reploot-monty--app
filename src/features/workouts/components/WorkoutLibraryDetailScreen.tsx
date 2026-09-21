import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
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
import { WorkoutLibraryExploreCard } from "./WorkoutLibraryExploreCard";

export interface WorkoutLibraryDetailScreenProps {
  data?: WorkoutLibraryDetailData;
  onBack?: () => void;
  onStartWorkout?: () => void;
  onSelectExercise?: (exerciseId: string) => void;
  onPressExplore?: () => void;
}

export const WorkoutLibraryDetailScreen: React.FC<
  WorkoutLibraryDetailScreenProps
> = ({
  data = CHEST_WORKOUT_DETAIL_DATA,
  onBack,
  onStartWorkout,
  onSelectExercise,
  onPressExplore,
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
    onSelectExercise?.(exerciseId);
  };

  const handleExplorePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    if (onPressExplore) {
      onPressExplore();
    } else if (data.exploreMore?.targetRoute) {
      router.push(data.exploreMore.targetRoute as any);
    }
  };

  return (
    <View style={styles.screen}>
      <CustomHeader showBackButton onPressBack={handleBack} />

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

        {/* Inlined START AI WORKOUT Button */}
        <StartAiWorkoutButton inline onPress={handleStartWorkout} />

        {/* Section Header: EXPLORE MORE */}
        <Text style={styles.sectionHeader}>EXPLORE MORE</Text>

        {/* Bottom Banner Card */}
        <WorkoutLibraryExploreCard
          title={data.exploreMore.title}
          subtitle={data.exploreMore.subtitle}
          image={data.exploreMore.bannerImage}
          onPress={handleExplorePress}
        />
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
    color: "#8E95A5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    marginTop: 22,
    marginBottom: 12,
  },
  exercisesContainer: {
    marginBottom: 8,
  },
});
