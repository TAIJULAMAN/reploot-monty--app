import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      label: "LOSE WEIGHT",
      desc: "Caloric deficit & metabolic burn",
      icon: require("../../../assets/loseWeight.svg"),
    },
    {
      id: "build_muscle",
      label: "BUILD MUSCLE",
      desc: "Hypertrophy & progressive overload",
      icon: require("../../../assets/buildMuscle.svg"),
    },
    {
      id: "gain_strength",
      label: "GAIN STRENGTH",
      desc: "Heavy compound lifting & power output",
      icon: require("../../../assets/gainStrength.svg"),
    },
    {
      id: "maintain",
      label: "MAINTAIN FITNESS",
      desc: "Active health & cardiovascular balance",
      icon: require("../../../assets/maintainFitness.svg"),
    },
    {
      id: "endurance",
      label: "IMPROVE ENDURANCE",
      desc: "VO2 max & stamina conditioning",
      icon: require("../../../assets/improveEndurance.svg"),
    },
    {
      id: "flexibility",
      label: "IMPROVE FLEXIBILITY",
      desc: "Mobility, joint recovery & dynamic flow",
      icon: require("../../../assets/improveFlexibility.svg"),
    },
  ];

  const handleSelect = (goalId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setSelectedGoal(goalId);
  };

  return (
    <View style={styles.section}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Image
          source={require("../../../assets/fitnessGoal.svg")}
          style={{ width: 16, height: 16, marginRight: 8 }}
          contentFit="contain"
        />
        <Text style={styles.sectionTitle}>FITNESS GOAL</Text>
      </View>

      {/* Goals List */}
      <View style={styles.goalsContainer}>
        {goals.map((goal) => {
          const isSelected = selectedGoal === goal.id;
          return (
            <TouchableOpacity
              key={goal.id}
              activeOpacity={0.75}
              style={[
                styles.goalCard,
                isSelected && styles.goalCardSelected,
              ]}
              onPress={() => handleSelect(goal.id)}
            >
              {/* Left Icon Container */}
              <View
                style={[
                  styles.goalIconContainer,
                  isSelected && styles.goalIconContainerSelected,
                ]}
              >
                <Image
                  source={goal.icon}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: isSelected ? "#38BDF8" : "#64748B",
                  }}
                  contentFit="contain"
                />
              </View>

              {/* Text Center */}
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.goalText,
                    isSelected && styles.goalTextSelected,
                  ]}
                >
                  {goal.label}
                </Text>
                <Text style={styles.goalDesc}>{goal.desc}</Text>
              </View>

              {/* Radio Indicator */}
              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected,
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 2,
    flex: 1,
  },
  counterText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
  },
  goalsContainer: {
    gap: 10,
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  goalCardSelected: {
    borderColor: "rgba(56, 189, 248, 0.45)",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
  },
  goalCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  goalIconContainer: {
    width: 42,
    height: 42,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  goalIconContainerSelected: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "rgba(56, 189, 248, 0.35)",
  },
  textContainer: {
    flex: 1,
  },
  goalText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  goalTextSelected: {
    color: "#FFFFFF",
  },
  goalDesc: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "500",
    lineHeight: 15,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(148, 163, 184, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  radioOuterSelected: {
    borderColor: "#38BDF8",
    backgroundColor: "rgba(56, 189, 248, 0.15)",
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#38BDF8",
  },
});
