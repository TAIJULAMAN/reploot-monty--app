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
    backgroundColor: "#0D1017",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  macroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  macroPercentPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  macroPercentText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  macroLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  macroValues: {
    marginBottom: 12,
  },
  macroCurrent: {
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "monospace",
  },
  macroSlash: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "monospace",
  },
  macroProgressBar: {
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 3,
  },
  macroProgressFill: {
    height: 5,
    borderRadius: 3,
  },
});
