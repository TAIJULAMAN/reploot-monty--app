import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PUSH_DAY_DATA, PushDayExercise } from "../data/pushDayData";
import { PushDayExerciseList } from "./PushDayExerciseCard";
import { PushDayHeroCard } from "./PushDayHeroCard";
import { StartAiWorkoutButton } from "./StartAiWorkoutButton";

export interface PushDayScreenProps {
  onBack?: () => void;
  onStartWorkout?: () => void;
  onSelectExercise?: (exerciseId: string) => void;
}

export const PushDayScreen: React.FC<PushDayScreenProps> = ({
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
      router.replace("/workouts");
    }
  };

  const handleStart = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    if (onStartWorkout) {
      onStartWorkout();
    } else {
      router.push({
        pathname: "/workouts/ai-session" as any,
        params: { pathId: "push" },
      });
    }
  };

  const handleExercisePress = (exercise: PushDayExercise) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onSelectExercise) {
      onSelectExercise(exercise.id);
    } else {
      router.push({
        pathname: "/workouts/exercise-detail" as any,
        params: {
          id: exercise.id,
          title: exercise.title.replace(/\n/g, " "),
        },
      });
    }
  };

  return (
    <View style={styles.screen}>
      <CustomHeader showBackButton onPressBack={handleBack} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 16) + 90 },
        ]}
      >
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>{PUSH_DAY_DATA.title}</Text>
          <Text style={styles.subtitle}>{PUSH_DAY_DATA.subtitle}</Text>
        </View>
        <PushDayHeroCard />
        <PushDayExerciseList
          exercises={PUSH_DAY_DATA.exercises}
          onExercisePress={handleExercisePress}
        />
      </ScrollView>
      <StartAiWorkoutButton onPress={handleStart} />
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
    paddingTop: 12,
  },
  titleSection: {
    marginBottom: 16,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -0.5,
    textTransform: "uppercase",
    marginBottom: 6,
    textShadowColor: "rgba(68, 234, 195, 0.55)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    ...(Platform.OS === "web"
      ? ({
          filter: "drop-shadow(0 0 16px rgba(68, 234, 195, 0.5))",
        } as any)
      : {}),
  },
  subtitle: {
    color: "#8E95A5",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
  },
});
