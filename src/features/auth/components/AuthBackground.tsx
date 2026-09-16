import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line, Path } from "react-native-svg";

export const AuthBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Dark Base Canvas */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#060812" }]} />

      {/* Top Deep Navy/Purple Gradient Glow */}
      <LinearGradient
        colors={["rgba(45, 35, 95, 0.65)", "rgba(20, 25, 55, 0.3)", "transparent"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 0.45 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Bottom Right Dark Teal Glow */}
      <LinearGradient
        colors={["transparent", "rgba(13, 78, 86, 0.25)", "rgba(6, 52, 58, 0.5)"]}
        start={{ x: 0.2, y: 0.55 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Faint Diagonal Vector Lines */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Line
          x1={width * 0.75}
          y1={0}
          x2={width * 0.05}
          y2={height * 0.45}
          stroke="rgba(129, 140, 248, 0.09)"
          strokeWidth="1.2"
        />
        <Line
          x1={width}
          y1={height * 0.22}
          x2={width * 0.15}
          y2={height * 0.75}
          stroke="rgba(34, 211, 238, 0.07)"
          strokeWidth="1"
        />
        <Line
          x1={width}
          y1={height * 0.55}
          x2={width * 0.18}
          y2={height * 0.98}
          stroke="rgba(16, 185, 129, 0.08)"
          strokeWidth="1.2"
        />
        <Path
          d={`M ${width * 0.02} ${height * 0.18} Q ${width * 0.45} ${height * 0.35} ${width * 0.98} ${height * 0.82}`}
          stroke="rgba(99, 102, 241, 0.06)"
          strokeWidth="1"
          fill="none"
        />
      </Svg>
    </View>
  );
};
