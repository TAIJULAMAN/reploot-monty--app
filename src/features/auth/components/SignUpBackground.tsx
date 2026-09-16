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
        colors={["rgba(75, 45, 35, 0.45)", "rgba(35, 25, 45, 0.2)", "transparent"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.7, y: 0.4 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Bottom Deep Midnight Indigo Glow */}
      <LinearGradient
        colors={["transparent", "rgba(35, 32, 70, 0.22)", "rgba(20, 22, 50, 0.45)"]}
        start={{ x: 0.2, y: 0.6 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Background Vector Graphics: Curved Arc above JOIN & Faint Diagonal Lines */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        {/* Warm overhead arc curving above JOIN */}
        <Path
          d={`M ${width * 0.08} ${height * 0.12} Q ${width * 0.4} ${height * 0.08} ${width * 0.65} ${height * 0.15}`}
          stroke="rgba(210, 140, 95, 0.22)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Faint diagonal lines */}
        <Line
          x1={width * 0.85}
          y1={0}
          x2={width * 0.05}
          y2={height * 0.55}
          stroke="rgba(147, 112, 219, 0.08)"
          strokeWidth="1.2"
        />
        <Line
          x1={width}
          y1={height * 0.45}
          x2={width * 0.2}
          y2={height * 0.95}
          stroke="rgba(45, 212, 191, 0.07)"
          strokeWidth="1.2"
        />
      </Svg>
    </View>
  );
};
