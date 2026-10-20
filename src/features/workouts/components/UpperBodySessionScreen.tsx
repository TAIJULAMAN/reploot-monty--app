import MaskedView from "@react-native-masked-view/masked-view";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import {
  CircuitExerciseItem,
  UPPER_BODY_SESSION_DATA,
  UpperBodySessionData,
} from "../data/upperBodySessionData";
import { CircuitExerciseCard } from "./CircuitExerciseCard";
import { StartAiWorkoutButton } from "./StartAiWorkoutButton";
import { UpperBodySessionHeroCard } from "./UpperBodySessionHeroCard";

export interface UpperBodySessionScreenProps {
  data?: UpperBodySessionData;
  onBack?: () => void;
  onStartWorkout?: () => void;
  onSelectExercise?: (exerciseId: string) => void;
}

type FilterCategory = "all" | "strength" | "hypertrophy" | "endurance";

export const UpperBodySessionScreen: React.FC<UpperBodySessionScreenProps> = ({
  data = UPPER_BODY_SESSION_DATA,
  onBack,
  onStartWorkout,
  onSelectExercise,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("all");

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleStartWorkout = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    if (onStartWorkout) {
      onStartWorkout();
    } else {
      router.push({
        pathname: "/workouts/ai-session" as any,
        params: {
          pathId: data.id,
        },
      });
    }
  };

  const handleExercisePress = (exercise: CircuitExerciseItem) => {
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

  const handleFilterChange = (filter: FilterCategory) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setSelectedFilter(filter);
  };

  const filteredExercises =
    selectedFilter === "all"
      ? data.exercises
      : data.exercises.filter((ex) => ex.category === selectedFilter);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Top Header matching exact screenshot with back button, search, notification bell, avatar */}
      <CustomHeader
        transparent={true}
        showBackButton={true}
        onPressBack={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 16) + 95 },
        ]}
      >
        {/* Title Section with Masked Gradient Title (Previous Design Pattern) */}
        <View style={styles.titleSection}>
          <Text style={styles.categoryBadge}>{data.apexBadge || "ROUTINE OVERVIEW"}</Text>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {data.title.replace("\n", " ")}
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </MaskedView>
          </View>
          <Text style={styles.subtitle}>{data.subtitle}</Text>
        </View>

        {/* Upper Body Session Hero Card */}
        <UpperBodySessionHeroCard
          image={data.heroImage}
          apexBadge={data.apexBadge}
          xpBadge={data.xpBadge}
          duration={data.duration}
          calories={data.calories}
          exerciseCount={data.exerciseCount}
        />

        {/* Circuit Exercise Cards */}
        <View style={styles.exerciseListContainer}>
          {filteredExercises.map((exercise) => (
            <CircuitExerciseCard
              key={exercise.id}
              exercise={exercise}
              onPress={() => handleExercisePress(exercise)}
            />
          ))}
        </View>
      </ScrollView>
      <StartAiWorkoutButton onPress={handleStartWorkout} />
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
    paddingTop: 8,
  },
  titleSection: {
    marginBottom: 20,
    marginTop: 4,
  },
  categoryBadge: {
    color: "#44EAC3",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  maskedTitleWrapper: {
    height: 46,
    width: "100%",
    marginBottom: 4,
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
    marginBottom: 20,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#161922",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  filterPillActive: {
    backgroundColor: "#6366F1",
    borderColor: "#818CF8",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 3,
  },
  filterPillText: {
    color: "#94A3B8",
    fontSize: 11.5,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  filterPillTextActive: {
    color: "#FFFFFF",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  circuitIconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.1,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  targetLoadText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  targetLoadValue: {
    color: "#94A3B8",
  },
  exerciseListContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
});
