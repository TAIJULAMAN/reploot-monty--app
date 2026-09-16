import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check, ChevronDown, ChevronUp, Ruler, Scale, Zap } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { ActivityLevel } from "@/shared/types/user";

export function Step2YourBody() {
  const { data, updateData, nextStep } = useProfileSetupStore();
  const [heightUnit, setHeightUnit] = useState<"cm" | "inch">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const handleAdjustHeight = (delta: number) => {
    try {
      Haptics.selectionAsync();
    } catch {
      // ignore
    }
    const newHeight = Math.max(120, Math.min(230, data.heightCm + delta));
    updateData({ heightCm: newHeight });
  };

  const handleAdjustWeight = (delta: number) => {
    try {
      Haptics.selectionAsync();
    } catch {
      // ignore
    }
    const newWeight = Math.max(35, Math.min(220, data.weightKg + delta));
    updateData({ weightKg: newWeight });
  };

  const handleSelectActivity = (activityLevel: ActivityLevel) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    updateData({ activityLevel });
  };

  // Convert for display if imperial selected
  const displayedHeight =
    heightUnit === "cm" ? data.heightCm : Math.round(data.heightCm / 2.54);
  const displayedWeight =
    weightUnit === "kg" ? data.weightKg : Math.round(data.weightKg * 2.20462);

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
      {/* Title with cyan neon bloom */}
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.title}>BODY</Text>
      </View>

      {/* HEIGHT CARD */}
      <View style={styles.metricCard}>
        <View style={styles.metricHeader}>
          <View style={styles.metricTitleRow}>
            <Ruler size={18} color="#FFFFFF" style={styles.metricIcon} />
            <Text style={styles.metricTitle}>HEIGHT</Text>
          </View>

          {/* Unit Toggle Pill */}
          <View style={styles.unitTogglePill}>
            <Pressable
              onPress={() => setHeightUnit("cm")}
              style={[
                styles.unitOption,
                heightUnit === "cm" && styles.unitOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.unitText,
                  heightUnit === "cm" && styles.unitTextActive,
                ]}
              >
                CM
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setHeightUnit("inch")}
              style={[
                styles.unitOption,
                heightUnit === "inch" && styles.unitOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.unitText,
                  heightUnit === "inch" && styles.unitTextActive,
                ]}
              >
                INCH
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Number Wheel View */}
        <View style={styles.wheelContainer}>
          <Pressable onPress={() => handleAdjustHeight(-1)} style={styles.arrowRow}>
            <Text style={styles.adjacentNum}>{displayedHeight - 1}</Text>
            <ChevronUp size={18} color="#918EA1" />
          </Pressable>

          <View style={styles.wheelDivider} />

          <View style={styles.activeNumberRow}>
            <Text style={styles.activeNumberVal}>{displayedHeight}</Text>
            <Text style={styles.activeNumberUnit}>{heightUnit.toUpperCase()}</Text>
          </View>

          <View style={styles.wheelDivider} />

          <Pressable onPress={() => handleAdjustHeight(1)} style={styles.arrowRow}>
            <Text style={styles.adjacentNum}>{displayedHeight + 1}</Text>
            <ChevronDown size={18} color="#918EA1" />
          </Pressable>
        </View>
      </View>

      {/* WEIGHT CARD */}
      <View style={styles.metricCard}>
        <View style={styles.metricHeader}>
          <View style={styles.metricTitleRow}>
            <Scale size={18} color="#FFFFFF" style={styles.metricIcon} />
            <Text style={styles.metricTitle}>WEIGHT</Text>
          </View>

          {/* Unit Toggle Pill */}
          <View style={styles.unitTogglePill}>
            <Pressable
              onPress={() => setWeightUnit("kg")}
              style={[
                styles.unitOption,
                weightUnit === "kg" && styles.unitOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.unitText,
                  weightUnit === "kg" && styles.unitTextActive,
                ]}
              >
                KG
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setWeightUnit("lbs")}
              style={[
                styles.unitOption,
                weightUnit === "lbs" && styles.unitOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.unitText,
                  weightUnit === "lbs" && styles.unitTextActive,
                ]}
              >
                LBS
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Number Wheel View */}
        <View style={styles.wheelContainer}>
          <Pressable onPress={() => handleAdjustWeight(-1)} style={styles.arrowRow}>
            <Text style={styles.adjacentNum}>{displayedWeight - 1}</Text>
            <ChevronUp size={18} color="#918EA1" />
          </Pressable>

          <View style={styles.wheelDivider} />

          <View style={styles.activeNumberRow}>
            <Text style={styles.activeNumberVal}>{displayedWeight}</Text>
            <Text style={styles.activeNumberUnit}>{weightUnit.toUpperCase()}</Text>
          </View>

          <View style={styles.wheelDivider} />

          <Pressable onPress={() => handleAdjustWeight(1)} style={styles.arrowRow}>
            <Text style={styles.adjacentNum}>{displayedWeight + 1}</Text>
            <ChevronDown size={18} color="#918EA1" />
          </Pressable>
        </View>
      </View>

      {/* ACTIVITY LEVEL CARD */}
      <View style={styles.activityCard}>
        <View style={styles.activityTitleRow}>
          <Zap size={16} color="#38BDF8" fill="#38BDF8" style={{ marginRight: 8 }} />
          <Text style={styles.activityHeaderTitle}>ACTIVITY LEVEL</Text>
        </View>

        <View style={styles.activityList}>
          {activityOptions.map((opt) => {
            const isSelected = data.activityLevel === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => handleSelectActivity(opt.id)}
                style={({ pressed }) => [
                  styles.activityOptionRow,
                  isSelected && styles.activityOptionRowActive,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.activityTextGroup}>
                  <Text style={[styles.activityOptionTitle, isSelected && styles.activityOptionTitleActive]}>
                    {opt.title}
                  </Text>
                  <Text style={styles.activityOptionSubtitle}>{opt.subtitle}</Text>
                </View>

                {/* Radio Circle / Check */}
                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                  {isSelected && <Check size={14} color="#0F1015" strokeWidth={3} />}
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
  metricCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: 20,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricIcon: {
    marginRight: 8,
  },
  metricTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },
  unitTogglePill: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    padding: 3,
  },
  unitOption: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 11,
  },
  unitOptionActive: {
    backgroundColor: "#38BDF8",
  },
  unitText: {
    color: "#918EA1",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  unitTextActive: {
    color: "#FFFFFF",
  },
  wheelContainer: {
    alignItems: "center",
    paddingVertical: 6,
  },
  wheelDivider: {
    width: "70%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 4,
  },
  arrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  adjacentNum: {
    color: "#918EA1",
    fontSize: 18,
    fontWeight: "700",
    opacity: 0.5,
  },
  activeNumberRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    paddingVertical: 6,
  },
  activeNumberVal: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
  },
  activeNumberUnit: {
    color: "#918EA1",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1,
  },
  activityCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: 20,
    marginBottom: 8,
  },
  activityTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },
  activityList: {
    gap: 10,
  },
  activityOptionRow: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityOptionRowActive: {
    borderColor: "#38BDF8",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },
  activityTextGroup: {
    flex: 1,
  },
  activityOptionTitle: {
    color: "#E2E0EC",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 3,
  },
  activityOptionTitleActive: {
    color: "#FFFFFF",
  },
  activityOptionSubtitle: {
    color: "#918EA1",
    fontSize: 12,
    fontWeight: "500",
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  radioCircleActive: {
    borderColor: "#38BDF8",
    backgroundColor: "#38BDF8",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
