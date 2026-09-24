import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface DayPillItemProps {
  days: number;
  isSelected: boolean;
  pillWidth: number;
  onSelect: (days: number) => void;
}

export const DayPillItem = React.memo(
  ({ days, isSelected, pillWidth, onSelect }: DayPillItemProps) => {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        unstable_pressDelay={0}
        hitSlop={6}
        onPress={() => onSelect(days)}
        style={({ pressed }) => [
          { width: pillWidth },
          pressed && styles.pressed,
        ]}
      >
        {isSelected ? (
          <LinearGradient
            colors={["#4282BE", "#72ABE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.dayPillActive, { width: pillWidth }]}
          >
            <Text style={styles.dayTextActive}>{days} Days</Text>
          </LinearGradient>
        ) : (
          <View style={[styles.dayPillInactive, { width: pillWidth }]}>
            <Text style={styles.dayTextInactive}>{days} Days</Text>
          </View>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  dayPillActive: {
    width: "100%",
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3882F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  dayPillInactive: {
    width: "100%",
    height: 44,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "#11141C",
    alignItems: "center",
    justifyContent: "center",
  },
  dayTextActive: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
  },
  dayTextInactive: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});
