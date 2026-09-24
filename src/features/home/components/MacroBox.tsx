import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface MacroBoxProps {
  icon: React.ReactNode;
  percent: string;
  label: string;
  current: string;
  target: string;
  color: string;
  pillBgColor: string;
  pillBorderColor: string;
}

export const MacroBox = ({
  icon,
  percent,
  label,
  current,
  target,
  color,
  pillBgColor,
  pillBorderColor,
}: MacroBoxProps) => {
  return (
    <View style={styles.macroBox}>
      <View style={styles.macroHeader}>
        {icon}
        <View
          style={[
            styles.macroPercentPill,
            {
              backgroundColor: pillBgColor,
              borderColor: pillBorderColor,
            },
          ]}
        >
          <Text style={styles.macroPercentText}>{percent}</Text>
        </View>
      </View>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroValues}>
        <Text style={[styles.macroCurrent, { color }]}>{current}</Text>{" "}
        <Text style={styles.macroSlash}>/ {target}</Text>
      </Text>
      <View style={styles.macroProgressBar}>
        <LinearGradient
          colors={[color, color]}
          style={[styles.macroProgressFill, { width: percent as any }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  macroBox: {
    width: "48%",
    backgroundColor: "#161925",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  macroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  macroPercentPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  macroPercentText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  macroLabel: {
    color: "#8E93A6",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "monospace",
    marginBottom: 6,
  },
  macroValues: {
    marginBottom: 14,
  },
  macroCurrent: {
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  macroSlash: {
    color: "#C2C6DC",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "monospace",
  },
  macroProgressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 3,
  },
  macroProgressFill: {
    height: 6,
    borderRadius: 3,
  },
});
