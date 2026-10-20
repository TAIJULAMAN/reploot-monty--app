import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { WorkoutModalityCard } from "./WorkoutModalityCard";

const gymWorkoutAsset = require("../../../../assets/workout/GymWorkout.png");
const homeWorkoutAsset = require("../../../../assets/workout/HomeWorkout.png");

export interface WorkoutModalitiesSectionProps {
  onSelectModality?: (modality: "gym" | "home") => void;
  style?: StyleProp<ViewStyle>;
}

export const WorkoutModalitiesSection: React.FC<
  WorkoutModalitiesSectionProps
> = ({ onSelectModality, style }) => {
  const router = useRouter();

  const handleSelectGym = () => {
    if (onSelectModality) {
      onSelectModality("gym");
    } else {
      router.push({
        pathname: "/workouts",
        params: { modality: "gym" },
      });
    }
  };

  const handleSelectHome = () => {
    if (onSelectModality) {
      onSelectModality("home");
    } else {
      router.push("/workouts/home" as any);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerWrapper}>
        <MaskedView
          style={styles.maskedTitleView}
          maskElement={
            <View style={styles.maskWrapper}>
              <Text
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                TRAINING MODALITIES
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
        <Text style={styles.subtitle}>
          Choose your workout environment and equipment
        </Text>
      </View>

      <View style={styles.cardsColumn}>
        <WorkoutModalityCard
          title="GYM WORKOUT"
          subtitle="Full equipment access"
          image={gymWorkoutAsset}
          onPress={handleSelectGym}
          testID="gym-workout-card"
        />

        <WorkoutModalityCard
          title="HOME WORKOUT"
          subtitle="Bodyweight & dumbbells"
          image={homeWorkoutAsset}
          onPress={handleSelectHome}
          testID="home-workout-card"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerWrapper: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 16,
  },
  maskedTitleView: {
    height: 38,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  gradient: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textAlign: "left",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 6,
    textAlign: "left",
  },
  cardsColumn: {
    width: "100%",
    gap: 16,
  },
});
