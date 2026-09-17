import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check, Ruler, Scale, Zap } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { VerticalWheelPicker } from "./VerticalWheelPicker";
import { ActivityLevel } from "@/shared/types/user";

export function Step2YourBody() {
  const { data, updateData, nextStep } = useProfileSetupStore();
  const [heightUnit, setHeightUnit] = useState<"cm" | "inch">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const handleSelectActivity = (activityLevel: ActivityLevel) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    updateData({ activityLevel });
  };

  const handleUnitToggle = (unit: "cm" | "inch") => {
    if (unit === heightUnit) return;
    try {
      Haptics.selectionAsync();
    } catch {
      // ignore
    }
    setHeightUnit(unit);
  };

  const handleWeightUnitToggle = (unit: "kg" | "lbs") => {
    if (unit === weightUnit) return;
    try {
      Haptics.selectionAsync();
    } catch {
      // ignore
    }
    setWeightUnit(unit);
  };

  // Convert for display if imperial selected
  const displayedHeight =
    heightUnit === "cm" ? data.heightCm : Math.round(data.heightCm / 2.54);

  const handleHeightChange = (val: number) => {
    const cm = heightUnit === "cm" ? val : Math.round(val * 2.54);
    updateData({ heightCm: cm });
  };

  const displayedWeight =
    weightUnit === "kg" ? data.weightKg : Math.round(data.weightKg * 2.20462);

  const handleWeightChange = (val: number) => {
    const kg = weightUnit === "kg" ? val : Math.round(val / 2.20462);
    updateData({ weightKg: kg });
  };

  const activityOptions: {
    id: ActivityLevel;
    title: string;
    subtitle: string;
  }[] = [
    {
      id: "beginner",
      title: "Beginner",
      subtitle: "0-1 workouts / week",
    },
    {
      id: "moderately_active",
      title: "Moderately Active",
      subtitle: "2-4 workouts / week",
    },
    {
      id: "very_active",
      title: "Very Active",
      subtitle: "5+ workouts / week",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Title: YOUR BODY */}
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.title}>BODY</Text>
      </View>

      {/* HEIGHT CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleGroup}>
            <Ruler size={15} color="#2DD4BF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>HEIGHT</Text>
          </View>

          {/* Unit Toggle Pill: CM | INCH */}
          <View style={styles.togglePill}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Switch to Centimeters"
              onPress={() => handleUnitToggle("cm")}
              style={[
                styles.toggleOption,
                heightUnit === "cm" && styles.toggleOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  heightUnit === "cm" && styles.toggleTextActive,
                ]}
              >
                CM
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Switch to Inches"
              onPress={() => handleUnitToggle("inch")}
              style={[
                styles.toggleOption,
                heightUnit === "inch" && styles.toggleOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  heightUnit === "inch" && styles.toggleTextActive,
                ]}
              >
                INCH
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Vertical Slideable Wheel Picker */}
        <VerticalWheelPicker
          value={displayedHeight}
          onChange={handleHeightChange}
          min={heightUnit === "cm" ? 120 : 48}
          max={heightUnit === "cm" ? 230 : 90}
          unit={heightUnit.toUpperCase()}
          itemHeight={36}
        />
      </View>

      {/* WEIGHT CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleGroup}>
            <Scale size={15} color="#2DD4BF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>WEIGHT</Text>
          </View>

          {/* Unit Toggle Pill: KG | LBS */}
          <View style={styles.togglePill}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Switch to Kilograms"
              onPress={() => handleWeightUnitToggle("kg")}
              style={[
                styles.toggleOption,
                weightUnit === "kg" && styles.toggleOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  weightUnit === "kg" && styles.toggleTextActive,
                ]}
              >
                KG
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Switch to Pounds"
              onPress={() => handleWeightUnitToggle("lbs")}
              style={[
                styles.toggleOption,
                weightUnit === "lbs" && styles.toggleOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  weightUnit === "lbs" && styles.toggleTextActive,
                ]}
              >
                LBS
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Vertical Slideable Wheel Picker */}
        <VerticalWheelPicker
          value={displayedWeight}
          onChange={handleWeightChange}
          min={weightUnit === "kg" ? 35 : 77}
          max={weightUnit === "kg" ? 200 : 440}
          unit={weightUnit.toUpperCase()}
          itemHeight={36}
        />
      </View>

      {/* ACTIVITY LEVEL CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleGroup}>
            <Zap size={15} color="#2DD4BF" fill="#2DD4BF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>ACTIVITY LEVEL</Text>
          </View>
        </View>

        <View style={styles.activityList}>
          {activityOptions.map((opt) => {
            const isSelected = data.activityLevel === opt.id;
            return (
              <Pressable
                key={opt.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                onPress={() => handleSelectActivity(opt.id)}
                style={({ pressed }) => [
                  styles.activityPressable,
                  pressed && styles.pressed,
                ]}
              >
                <View
                  style={[
                    styles.activityOptionRow,
                    isSelected
                      ? styles.activityOptionSelected
                      : styles.activityOptionUnselected,
                  ]}
                >
                  <View style={styles.activityInfo}>
                    <Text
                      style={[
                        styles.activityTitle,
                        isSelected && styles.activityTitleActive,
                      ]}
                    >
                      {opt.title}
                    </Text>
                    <Text style={styles.activitySubtitle}>{opt.subtitle}</Text>
                  </View>

                  {/* Radio Indicator */}
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected
                        ? styles.radioCircleSelected
                        : styles.radioCircleUnselected,
                    ]}
                  >
                    {isSelected ? (
                      <Check size={11} color="#0D1117" strokeWidth={3.5} />
                    ) : null}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Continue CTA */}
      <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 4,
  },
  hero: {
    marginTop: 0,
    marginBottom: 6,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 35,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(56, 189, 248, 0.65)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
    includeFontPadding: false,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "#11141E",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    marginBottom: 7,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 7,
  },
  headerTitle: {
    color: "#94A3B8",
    fontSize: 10.5,
    fontWeight: "900",
    letterSpacing: 1.6,
  },
  togglePill: {
    flexDirection: "row",
    backgroundColor: "#1A1E2B",
    borderRadius: 12,
    padding: 2.5,
  },
  toggleOption: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 9,
  },
  toggleOptionActive: {
    backgroundColor: "#38BDF8",
  },
  toggleText: {
    color: "#64748B",
    fontSize: 9.5,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  toggleTextActive: {
    color: "#0F1015",
  },
  activityList: {
    gap: 5,
    marginTop: 4,
    marginBottom: 2,
  },
  activityPressable: {
    width: "100%",
  },
  activityOptionRow: {
    width: "100%",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityOptionUnselected: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "#161924",
  },
  activityOptionSelected: {
    borderWidth: 1.5,
    borderColor: "#2DD4BF",
    backgroundColor: "#172332",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 2,
    includeFontPadding: false,
  },
  activityTitleActive: {
    color: "#FFFFFF",
  },
  activitySubtitle: {
    color: "#64748B",
    fontSize: 10.5,
    fontWeight: "500",
    includeFontPadding: false,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  radioCircleUnselected: {
    borderWidth: 1.8,
    borderColor: "#475569",
    backgroundColor: "transparent",
  },
  radioCircleSelected: {
    borderWidth: 1.8,
    borderColor: "#2DD4BF",
    backgroundColor: "#2DD4BF",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
