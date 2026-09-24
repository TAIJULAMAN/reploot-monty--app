import React from "react";
import Svg, { Circle, Rect } from "react-native-svg";

export function ScaleBoxIcon() {
  const strokeColor = "#C0A3D5";
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="3.5"
        stroke={strokeColor}
        strokeWidth="1.9"
      />
      <Circle cx="12" cy="8.8" r="2.7" stroke={strokeColor} strokeWidth="1.5" />
      <Circle cx="10.8" cy="8.8" r="0.6" fill={strokeColor} />
      <Circle cx="12" cy="8.8" r="0.6" fill={strokeColor} />
      <Circle cx="13.2" cy="8.8" r="0.6" fill={strokeColor} />
    </Svg>
  );
}
