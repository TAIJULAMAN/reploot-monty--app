import React from "react";
import Svg, { Path } from "react-native-svg";

export function LightningIcon() {
  const fillColor = "#F9A873";
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fillColor}>
      <Path
        d="M13 2L3.5 13.5h7l-1.5 8.5L20.5 10.5h-7.5L13 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
