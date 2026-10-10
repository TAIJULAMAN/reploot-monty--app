import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line, Path } from "react-native-svg";

export const SignUpBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Base Canvas */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#070A12" }]} />

      {/* Top Warm Bronze / Amber Subtle Glow */}
      <LinearGradient
        colors={[
          "rgba(75, 45, 35, 0.45)",
          "rgba(35, 25, 45, 0.2)",
          "transparent",
        ]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.7, y: 0.4 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Bottom Deep Midnight Indigo Glow */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(35, 32, 70, 0.22)",
          "rgba(20, 22, 50, 0.45)",
        ]}
        start={{ x: 0.2, y: 0.6 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};
