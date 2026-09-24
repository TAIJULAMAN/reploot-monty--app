import React from "react";
import Svg, { Path } from "react-native-svg";

export function HeartShapeIcon() {
  const strokeColor = "#38EDD8";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.5 13.572L12 21l-7.5-7.428A5 5 0 1 1 12 6.786a5 5 0 1 1 7.5 6.786z"
        stroke={strokeColor}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
