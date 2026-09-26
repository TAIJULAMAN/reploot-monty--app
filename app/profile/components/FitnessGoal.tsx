import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { CheckCircle2, Circle } from "lucide-react-native";

interface FitnessGoalProps {
  selectedGoal: string;
  setSelectedGoal: (goal: string) => void;
}

export function FitnessGoal({
  selectedGoal,
  setSelectedGoal,
}: FitnessGoalProps) {
  const goals = [
    {
      id: "lose_weight",
      label: "Lose Weight",
      icon: require("../../../assets/loseWeight.svg"),
    },
    {
      id: "build_muscle",
      label: "Build Muscle",
      icon: require("../../../assets/buildMuscle.svg"),
    },
    {
      id: "gain_strength",
      label: "Gain Strength",
      icon: require("../../../assets/gainStrength.svg"),
    },
    {
      id: "maintain",
      label: "Maintain Fitness",
      icon: require("../../../assets/maintainFitness.svg"),
    },
    {
      id: "endurance",
      label: "Improve Endurance",
      icon: require("../../../assets/improveEndurance.svg"),
    },
    {
      id: "flexibility",
      label: "Improve Flexibility",
      icon: require("../../../assets/improveFlexibility.svg"),
    },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Image
          source={require("../../../assets/fitnessGoal.svg")}
          style={{ width: 16, height: 16, marginRight: 8 }}
          contentFit="contain"
        />
        <Text style={styles.sectionTitle}>FITNESS GOAL</Text>
      </View>

      <View style={styles.goalsContainer}>
        {goals.map((goal) => {
          const isSelected = selectedGoal === goal.id;
          const iconSource = goal.icon;
          return (
            <Pressable
              key={goal.id}
              style={[styles.goalCard, isSelected && styles.goalCardSelected]}
              onPress={() => setSelectedGoal(goal.id)}
            >
              <View style={styles.goalIconContainer}>
                <Image
                  source={iconSource}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: isSelected ? "#38EDD8" : "#94A3B8",
                  }}
                  contentFit="contain"
                />
              </View>
              <Text
                style={[styles.goalText, isSelected && styles.goalTextSelected]}
              >
                {goal.label}
              </Text>
              <View style={styles.radioContainer}>
                {isSelected ? (
                  <CheckCircle2 size={24} color="#38EDD8" />
                ) : (
                  <Circle size={24} color="#334155" />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 2,
  },
  goalsContainer: {
    gap: 12,
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  goalCardSelected: {
    borderColor: "rgba(56, 237, 216, 0.3)",
    backgroundColor: "rgba(56, 237, 216, 0.05)",
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  goalText: {
    flex: 1,
    color: "#E2E8F0",
    fontSize: 18,
    fontWeight: "600",
  },
  goalTextSelected: {
    color: "#FFFFFF",
  },
  radioContainer: {
    marginLeft: 16,
  },
});
