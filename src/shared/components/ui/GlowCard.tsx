import React from "react";
import { View, ViewProps, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/theme/gradients";
import { colors } from "@/theme/colors";

export interface GlowCardProps extends ViewProps {
  glowColor?: "cyan" | "mint" | "purple" | "gradient";
  borderWidth?: number;
  innerStyle?: ViewStyle;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  glowColor = "gradient",
  borderWidth = 1.5,
  innerStyle,
  style,
  ...props
}) => {
  const getGradientColors = () => {
    switch (glowColor) {
      case "mint":
        return gradients.cyanMint.colors;
      case "purple":
        return gradients.violetBlue.colors;
      case "cyan":
        return ["#22D3EE", "#0284C7"] as const;
      case "gradient":
      default:
        return gradients.glowBorder.colors;
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.outerGlow, { padding: borderWidth }, style]}
      {...props}
    >
      <View style={[styles.innerContent, innerStyle]}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  outerGlow: {
    borderRadius: 24,
    overflow: "hidden",
  },
  innerContent: {
    backgroundColor: colors.background.card,
    borderRadius: 22.5,
    padding: 20,
    width: "100%",
  },
});
