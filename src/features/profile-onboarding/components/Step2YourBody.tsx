import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check, Ruler, Scale, Zap } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { VerticalWheelPicker } from "./VerticalWheelPicker";
import { ActivityLevel } from "@/shared/types/user";

const ACTIVITY_OPTIONS: {
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

interface ActivityOptionItemProps {
  id: ActivityLevel;
  title: string;
  subtitle: string;
  isSelected: boolean;
  onSelect: (id: ActivityLevel) => void;
}

const ActivityOptionItem = React.memo(
  ({ id, title, subtitle, isSelected, onSelect }: ActivityOptionItemProps) => {
    return (
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        unstable_pressDelay={0}
        hitSlop={6}
        onPress={() => onSelect(id)}
        style={styles.activityPressable}
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
              {title}
            </Text>
            <Text style={styles.activitySubtitle}>{subtitle}</Text>
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
              <Check size={12} color="#0B0E17" strokeWidth={3.5} />
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  }
);

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
    [updateData]
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
    [heightUnit]
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
    [weightUnit]
  );

  // Derived display values
  const displayedHeight =
    heightUnit === "cm" ? heightCm : Math.round(heightCm / 2.54);

  const handleHeightChange = useCallback(
    (val: number) => {
      const cm = heightUnit === "cm" ? val : Math.round(val * 2.54);
      updateData({ heightCm: cm });
    },
    [heightUnit, updateData]
  );

  const displayedWeight =
    weightUnit === "kg" ? weightKg : Math.round(weightKg * 2.20462);

  const handleWeightChange = useCallback(
    (val: number) => {
      const kg = weightUnit === "kg" ? val : Math.round(val / 2.20462);
      updateData({ weightKg: kg });
    },
    [weightUnit, updateData]
  );

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
            <Ruler size={16} color="#2DD4BF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>HEIGHT</Text>
          </View>

          {/* Unit Toggle Pill: CM | INCH */}
          <View style={styles.togglePill}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Switch to Centimeters"
              unstable_pressDelay={0}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              onPress={() => handleHeightUnitToggle("cm")}
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
              unstable_pressDelay={0}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              onPress={() => handleHeightUnitToggle("inch")}
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
          itemHeight={44}
        />
      </View>

      {/* WEIGHT CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleGroup}>
            <Scale size={16} color="#2DD4BF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>WEIGHT</Text>
          </View>

          {/* Unit Toggle Pill: KG | LBS */}
          <View style={styles.togglePill}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Switch to Kilograms"
              unstable_pressDelay={0}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
              unstable_pressDelay={0}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
          max={weightUnit === "kg" ? 180 : 396}
          unit={weightUnit.toUpperCase()}
          itemHeight={44}
        />
      </View>

      {/* ACTIVITY LEVEL CARD */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleGroup}>
            <Zap size={16} color="#2DD4BF" fill="#2DD4BF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>ACTIVITY LEVEL</Text>
          </View>
        </View>

        <View style={styles.activityList}>
          {ACTIVITY_OPTIONS.map((opt) => (
            <ActivityOptionItem
              key={opt.id}
              id={opt.id}
              title={opt.title}
              subtitle={opt.subtitle}
              isSelected={activityLevel === opt.id}
              onSelect={handleSelectActivity}
            />
          ))}
        </View>
      </View>

      {/* Continue CTA */}
      <View style={styles.ctaContainer}>
        <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
  },
  hero: {
    marginTop: 2,
    marginBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(56, 189, 248, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    includeFontPadding: false,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.09)",
    backgroundColor: "#111420",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 9,
  },
  headerTitle: {
    color: "#94A3B8",
    fontSize: 11.5,
    fontWeight: "900",
    letterSpacing: 2,
  },
  togglePill: {
    flexDirection: "row",
    backgroundColor: "#181B28",
    borderRadius: 14,
    padding: 3,
  },
  toggleOption: {
    paddingHorizontal: 13,
    paddingVertical: 5.5,
    borderRadius: 11,
  },
  toggleOptionActive: {
    backgroundColor: "#38BDF8",
  },
  toggleText: {
    color: "#64748B",
    fontSize: 10.5,
    fontWeight: "900",
    letterSpacing: 0.6,
    includeFontPadding: false,
  },
  toggleTextActive: {
    color: "#0B0E17",
  },
  activityList: {
    gap: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  activityPressable: {
    width: "100%",
  },
  activityOptionRow: {
    width: "100%",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityOptionUnselected: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    backgroundColor: "#161926",
  },
  activityOptionSelected: {
    borderWidth: 1.6,
    borderColor: "#2DD4BF",
    backgroundColor: "#152536",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: "#CBD5E1",
    fontSize: 14.5,
    fontWeight: "800",
    marginBottom: 3,
    includeFontPadding: false,
  },
  activityTitleActive: {
    color: "#FFFFFF",
  },
  activitySubtitle: {
    color: "#8290A4",
    fontSize: 11.5,
    fontWeight: "500",
    includeFontPadding: false,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
  },
  radioCircleUnselected: {
    borderWidth: 2,
    borderColor: "#475569",
    backgroundColor: "transparent",
  },
  radioCircleSelected: {
    borderWidth: 2,
    borderColor: "#2DD4BF",
    backgroundColor: "#2DD4BF",
  },
  ctaContainer: {
    marginTop: 6,
    marginBottom: 16,
  },
});
