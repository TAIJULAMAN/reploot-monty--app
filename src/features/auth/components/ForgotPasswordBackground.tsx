import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line } from "react-native-svg";

export const ForgotPasswordBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Dark Space Base */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#070A12" }]} />

      {/* Top Deep Navy/Purple Glow */}
      <LinearGradient
        colors={["rgba(45, 35, 95, 0.5)", "rgba(15, 23, 42, 0.2)", "transparent"]}
        start={{ x: 0.8, y: 0 }}
        end={{ x: 0.2, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Bottom Right Subtle Teal Glow */}
      <LinearGradient
        colors={["transparent", "rgba(13, 78, 86, 0.2)", "rgba(6, 44, 48, 0.4)"]}
        start={{ x: 0.2, y: 0.6 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Diagonal Faint Vector Lines */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Line
          x1={width}
          y1={height * 0.08}
          x2={0}
          y2={height * 0.5}
          stroke="rgba(129, 140, 248, 0.08)"
          strokeWidth="1.2"
        />
        <Line
          x1={width * 0.9}
          y1={height * 0.45}
          x2={0}
          y2={height * 0.95}
          stroke="rgba(34, 211, 238, 0.07)"
          strokeWidth="1.2"
        />
      </Svg>
    </View>
  );
};
