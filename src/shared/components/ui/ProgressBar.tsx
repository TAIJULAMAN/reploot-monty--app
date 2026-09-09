import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/theme/gradients";
import { colors } from "@/theme/colors";

export interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  gradient?: "xp" | "cyanMint" | "primary";
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 6,
  gradient = "xp",
  style,
}) => {
  const clamped = Math.max(0, Math.min(1, progress));

  const getGradientColors = () => {
    switch (gradient) {
      case "cyanMint":
        return gradients.cyanMint.colors;
      case "primary":
        return gradients.primaryCTA.colors;
      case "xp":
      default:
        return gradients.xpBar.colors;
    }
  };

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }, style]}>
      <View
        style={[
          styles.fillContainer,
          {
            width: `${clamped * 100}%`,
            borderRadius: height / 2,
          },
        ]}
      >
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  fillContainer: {
    height: "100%",
    overflow: "hidden",
  },
});
