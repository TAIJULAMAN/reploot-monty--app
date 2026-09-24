import { ActivityLevel } from "@/shared/types/user";
import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ActivityLevelCard } from "./ActivityLevelCard";
import { HeightSelectionCard } from "./HeightSelectionCard";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { WeightSelectionCard } from "./WeightSelectionCard";



export function Step2YourBody() {
  const heightCm = useProfileSetupStore((s) => s.data.heightCm);
  const weightKg = useProfileSetupStore((s) => s.data.weightKg);
  const activityLevel = useProfileSetupStore((s) => s.data.activityLevel);
  const updateData = useProfileSetupStore((s) => s.updateData);
  const nextStep = useProfileSetupStore((s) => s.nextStep);

  const [heightUnit, setHeightUnit] = useState<"cm" | "inch">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const handleSelectActivity = useCallback(
    (level: ActivityLevel) => {
      requestAnimationFrame(() => {
        try {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch {
          // ignore
        }
      });
      updateData({ activityLevel: level });
    },
    [updateData],
  );

  const handleHeightUnitToggle = useCallback(
    (unit: "cm" | "inch") => {
      if (unit === heightUnit) return;
      requestAnimationFrame(() => {
        try {
          void Haptics.selectionAsync();
        } catch {
          // ignore
        }
      });
      setHeightUnit(unit);
    },
    [heightUnit],
  );

  const handleWeightUnitToggle = useCallback(
    (unit: "kg" | "lbs") => {
      if (unit === weightUnit) return;
      requestAnimationFrame(() => {
        try {
          void Haptics.selectionAsync();
        } catch {
          // ignore
        }
      });
      setWeightUnit(unit);
    },
    [weightUnit],
  );

  // Derived display values
  const displayedHeight =
    heightUnit === "cm" ? heightCm : Math.round(heightCm / 2.54);

  const handleHeightChange = useCallback(
    (val: number) => {
      const cm = heightUnit === "cm" ? val : Math.round(val * 2.54);
      updateData({ heightCm: cm });
    },
    [heightUnit, updateData],
  );

  const displayedWeight =
    weightUnit === "kg" ? weightKg : Math.round(weightKg * 2.20462);

  const handleWeightChange = useCallback(
    (val: number) => {
      const kg = weightUnit === "kg" ? val : Math.round(val / 2.20462);
      updateData({ weightKg: kg });
    },
    [weightUnit, updateData],
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.title}>BODY</Text>
      </View>

      <HeightSelectionCard
        heightUnit={heightUnit}
        displayedHeight={displayedHeight}
        onHeightUnitToggle={handleHeightUnitToggle}
        onHeightChange={handleHeightChange}
      />

      {/* WEIGHT CARD */}
      <WeightSelectionCard
        weightUnit={weightUnit}
        displayedWeight={displayedWeight}
        onWeightUnitToggle={handleWeightUnitToggle}
        onWeightChange={handleWeightChange}
      />

      {/* ACTIVITY LEVEL CARD */}
      <ActivityLevelCard
        activityLevel={activityLevel}
        onSelectActivity={handleSelectActivity}
      />

      {/* Continue CTA */}
      <View style={styles.ctaContainer}>
        <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
  },
  hero: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 55,
    lineHeight: 50,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(56, 237, 216, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    includeFontPadding: false,
    textAlign: "center",
  },

  ctaContainer: {
    width: "100%",
    alignSelf: "stretch",
    marginTop: 6,
    marginBottom: 16,
  },
});
