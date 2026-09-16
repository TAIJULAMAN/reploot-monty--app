import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  Activity,
  Dumbbell,
  Heart,
  Scale,
  Timer,
  Zap,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { FitnessGoal } from "@/shared/types/user";

export function Step3YourGoal() {
  const { data, updateData, nextStep } = useProfileSetupStore();

  const handleSelectGoal = (primaryGoal: FitnessGoal) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    updateData({ primaryGoal });
  };

  const goalOptions: {
    id: FitnessGoal;
    label: string;
    icon: (color: string) => React.ReactNode;
  }[] = [
    {
      id: "lose_weight",
      label: "LOSE WEIGHT",
      icon: (color) => <Scale size={24} color={color} strokeWidth={2} />,
    },
    {
      id: "build_muscle",
      label: "BUILD MUSCLE",
      icon: (color) => <Dumbbell size={24} color={color} strokeWidth={2} />,
    },
    {
      id: "stay_fit",
      label: "STAY FIT",
      icon: (color) => <Heart size={24} color={color} strokeWidth={2} />,
    },
    {
      id: "gain_strength",
      label: "GAIN STRENGTH",
      icon: (color) => <Zap size={24} color={color} strokeWidth={2} />,
    },
    {
      id: "improve_endurance",
      label: "IMPROVE\nENDURANCE",
      icon: (color) => <Timer size={24} color={color} strokeWidth={2} />,
    },
    {
      id: "improve_flexibility",
      label: "IMPROVE\nFLEXIBILITY",
      icon: (color) => <Activity size={24} color={color} strokeWidth={2} />,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Title with cyan neon bloom */}
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.title}>GOAL</Text>
      </View>

      {/* 2x3 Grid of Goal Cards */}
      <View style={styles.grid}>
        {goalOptions.map((opt) => {
          const isSelected = data.primaryGoal === opt.id;
          const activeColor = isSelected ? "#38BDF8" : "#918EA1";

          return (
            <Pressable
              key={opt.id}
              accessibilityRole="button"
              onPress={() => handleSelectGoal(opt.id)}
              style={({ pressed }) => [
                styles.card,
                isSelected && styles.cardActive,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.iconCircle, isSelected && styles.iconCircleActive]}>
                {opt.icon(activeColor)}
              </View>

              <Text style={[styles.cardLabel, isSelected && styles.cardLabelActive]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Continue CTA */}
      <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  hero: {
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(95, 255, 215, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  card: {
    width: "48%",
    height: 146,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  cardActive: {
    borderColor: "#38BDF8",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  iconCircleActive: {
    backgroundColor: "rgba(56, 189, 248, 0.2)",
  },
  cardLabel: {
    color: "#B0AEC2",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  cardLabelActive: {
    color: "#FFFFFF",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
