import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function CheckCircleIcon({ color = "#2DD4BF" }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
      <Path
        d="M8 12.5L10.5 15L16 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
