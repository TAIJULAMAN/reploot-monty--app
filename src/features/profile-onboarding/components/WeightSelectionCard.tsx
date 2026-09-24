import { LinearGradient } from "expo-linear-gradient";
import { Scale } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { VerticalWheelPicker } from "./VerticalWheelPicker";

interface WeightSelectionCardProps {
  weightUnit: "kg" | "lbs";
  displayedWeight: number;
  onWeightUnitToggle: (unit: "kg" | "lbs") => void;
  onWeightChange: (val: number) => void;
}

export function WeightSelectionCard({
  weightUnit,
  displayedWeight,
  onWeightUnitToggle,
  onWeightChange,
}: WeightSelectionCardProps) {
  return (
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
            onPress={() => onWeightUnitToggle("kg")}
          >
            {weightUnit === "kg" ? (
              <LinearGradient
                colors={["#6C5CFF", "#44EAC3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toggleOption}
              >
                <Text style={[styles.toggleText, styles.toggleTextActive]}>
                  KG
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.toggleOption}>
                <Text style={styles.toggleText}>KG</Text>
              </View>
            )}
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch to Pounds"
            unstable_pressDelay={0}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => onWeightUnitToggle("lbs")}
          >
            {weightUnit === "lbs" ? (
              <LinearGradient
                colors={["#6C5CFF", "#44EAC3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toggleOption}
              >
                <Text style={[styles.toggleText, styles.toggleTextActive]}>
                  LBS
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.toggleOption}>
                <Text style={styles.toggleText}>LBS</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Vertical Slideable Wheel Picker */}
      <VerticalWheelPicker
        value={displayedWeight}
        onChange={onWeightChange}
        min={weightUnit === "kg" ? 35 : 77}
        max={weightUnit === "kg" ? 180 : 396}
        unit={weightUnit.toUpperCase()}
        itemHeight={44}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    backgroundColor: "#1A1C23",
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
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
  },
  togglePill: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    padding: 3,
  },
  toggleOption: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  toggleText: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 0.8,
    includeFontPadding: false,
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },
});
