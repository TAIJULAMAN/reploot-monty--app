import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function StopwatchIcon() {
  const strokeColor = "#95A3F9";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="13.5" r="7.5" stroke={strokeColor} strokeWidth="2" />
      <Path
        d="M12 9.5v4"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M10 2.5h4"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M12 2.5v3"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M17.5 7.5l1.5-1.5"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
