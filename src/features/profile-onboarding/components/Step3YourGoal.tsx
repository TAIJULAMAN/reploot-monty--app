import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { Sparkles } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { FitnessGoal } from "@/shared/types/user";

// Custom SVG Icons matching Figma design exactly
function ScaleBoxIcon({ color = "#C4B5FD" }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="4" y="4" width="16" height="16" rx="4" />
      <Circle cx="12" cy="11" r="3" />
      <Path d="M12 11l1.5-1.5" />
    </Svg>
  );
}

function BicepArmIcon({ color = "#FB923C" }: { color?: string }) {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 13.5c-1-1.5-1.5-3.5-.5-5.5 1-2 3-2.5 5-2 1.5.5 3 1.8 3.5 3.5.5 1.5 0 3-1 4.5l3.5 3.5c1 .5 1.5 1.5 1.5 2.5s-.5 2-1.5 2.5-2 .5-2.5 0L10 18.5c-1.5.5-3 0-4-1z" />
      <Path d="M9 9.5c.8-.8 2-.8 2.8 0" />
    </Svg>
  );
}

function HeartShapeIcon({ color = "#2DD4BF" }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </Svg>
  );
}

function LightningIcon({ color = "#FB923C" }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg>
  );
}

function StopwatchIcon({ color = "#94A3B8" }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="13" r="8" />
      <Path d="M12 9v4l2.5 1.5" />
      <Path d="M10 2h4" />
      <Path d="M12 2v3" />
    </Svg>
  );
}

function MeditationIcon({ color = "#2DD4BF" }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="6" r="2.5" />
      <Path d="M12 9.5v5.5" />
      <Path d="M8 12l4 3 4-3" />
      <Path d="M5 19c2-2 4-2.5 7-2.5s5 .5 7 2.5" />
      <Path d="M6 16l-2 3" />
      <Path d="M18 16l2 3" />
    </Svg>
  );
}

const GOAL_OPTIONS: {
  id: FitnessGoal;
  label: string;
  badgeBg: string;
  icon: (isSelected: boolean) => React.ReactNode;
}[] = [
  {
    id: "lose_weight",
    label: "LOSE WEIGHT",
    badgeBg: "rgba(196, 181, 253, 0.12)",
    icon: (isSelected) => (
      <ScaleBoxIcon color={isSelected ? "#38BDF8" : "#C4B5FD"} />
    ),
  },
  {
    id: "build_muscle",
    label: "BUILD MUSCLE",
    badgeBg: "rgba(251, 146, 60, 0.12)",
    icon: (isSelected) => (
      <BicepArmIcon color={isSelected ? "#2DD4BF" : "#FB923C"} />
    ),
  },
  {
    id: "stay_fit",
    label: "STAY FIT",
    badgeBg: "rgba(45, 212, 191, 0.12)",
    icon: (isSelected) => (
      <HeartShapeIcon color={isSelected ? "#38BDF8" : "#2DD4BF"} />
    ),
  },
  {
    id: "gain_strength",
    label: "GAIN STRENGTH",
    badgeBg: "rgba(251, 146, 60, 0.12)",
    icon: (isSelected) => (
      <LightningIcon color={isSelected ? "#38BDF8" : "#FB923C"} />
    ),
  },
  {
    id: "improve_endurance",
    label: "IMPROVE\nENDURANCE",
    badgeBg: "rgba(148, 163, 184, 0.12)",
    icon: (isSelected) => (
      <StopwatchIcon color={isSelected ? "#38BDF8" : "#94A3B8"} />
    ),
  },
  {
    id: "improve_flexibility",
    label: "IMPROVE\nFLEXIBILITY",
    badgeBg: "rgba(45, 212, 191, 0.12)",
    icon: (isSelected) => (
      <MeditationIcon color={isSelected ? "#38BDF8" : "#2DD4BF"} />
    ),
  },
];

export function Step3YourGoal() {
  const primaryGoal = useProfileSetupStore((s) => s.data.primaryGoal);
  const updateData = useProfileSetupStore((s) => s.updateData);
  const nextStep = useProfileSetupStore((s) => s.nextStep);

  const handleSelectGoal = useCallback(
    (goal: FitnessGoal) => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // ignore
      }
      updateData({ primaryGoal: goal });
    },
    [updateData]
  );

  return (
    <View style={styles.container}>
      {/* Title with cyan neon bloom */}
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.title}>GOAL</Text>
      </View>

      {/* 2x3 Grid of Goal Cards */}
      <View style={styles.grid}>
        {GOAL_OPTIONS.map((opt) => {
          const isSelected = primaryGoal === opt.id;

          return (
            <Pressable
              key={opt.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => handleSelectGoal(opt.id)}
              style={({ pressed }) => [
                styles.card,
                isSelected ? styles.cardActive : styles.cardInactive,
                pressed && styles.pressed,
              ]}
            >
              {/* Circular Icon Badge */}
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: opt.badgeBg },
                  isSelected && styles.iconCircleActive,
                ]}
              >
                {opt.icon(isSelected)}
              </View>

              {/* Goal Title */}
              <Text
                style={[
                  styles.cardLabel,
                  isSelected && styles.cardLabelActive,
                ]}
                numberOfLines={2}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Decorative Sparkle bottom right */}
      <View style={styles.sparkleRow}>
        <Sparkles size={22} color="#2DD4BF" style={styles.sparkleIcon} />
      </View>

      {/* Continue CTA Button */}
      <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  hero: {
    marginTop: 4,
    marginBottom: 26,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 44,
    lineHeight: 48,
    fontWeight: "900",
    letterSpacing: -0.5,
    fontStyle: "italic",
    textShadowColor: "rgba(95, 255, 215, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
    columnGap: 14,
    marginBottom: 16,
  },
  card: {
    width: "47.8%",
    height: 154,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  cardInactive: {
    backgroundColor: "#0E1724",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  cardActive: {
    backgroundColor: "rgba(14, 28, 42, 0.95)",
    borderWidth: 1.5,
    borderColor: "#2DD4BF",
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  iconCircleActive: {
    backgroundColor: "rgba(45, 212, 191, 0.18)",
  },
  cardLabel: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1.4,
    textAlign: "center",
    fontFamily: "monospace",
  },
  cardLabelActive: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  sparkleRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 16,
    marginBottom: 20,
  },
  sparkleIcon: {
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});
