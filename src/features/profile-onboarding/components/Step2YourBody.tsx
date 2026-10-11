import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
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
        <MaskedView
          style={styles.maskedTitleView}
          maskElement={
            <View style={styles.maskWrapper}>
              <Text style={styles.title}>YOUR</Text>
              <Text style={styles.title}>BODY</Text>
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
          Set your physical stats to tailor your workouts
        </Text>
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
    marginTop: 10,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  maskedTitleView: {
    height: 108,
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
    fontSize: 48,
    lineHeight: 52,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "left",
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "left",
  },

  ctaContainer: {
    width: "100%",
    alignSelf: "stretch",
    marginTop: 6,
    marginBottom: 16,
  },
});
