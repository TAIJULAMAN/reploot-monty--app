import React from "react";
import Svg, { Path } from "react-native-svg";

interface SparkleDecorationProps {
  size?: number;
  color?: string;
}

export const SparkleDecoration: React.FC<SparkleDecorationProps> = ({
  size = 36,
  color,
}) => {
  return (
    <Svg width={size} height={size * 1.05} viewBox="0 0 40 42" fill="none">
      {/* Main 4-point sparkle diamond */}
      <Path
        d="M18 0C18 9 10 16 0 16C10 16 18 23 18 32C18 23 26 16 36 16C26 16 18 9 18 0Z"
        fill={color || "#A5B4FC"}
        fillOpacity={0.75}
      />
      {/* Upper-right companion sparkle */}
      <Path
        d="M32 2C32 6 28 9 23 9C28 9 32 12 32 16C32 12 36 9 40 9C36 9 32 6 32 2Z"
        fill={color || "#C4B5FD"}
        fillOpacity={0.8}
      />
      {/* Lower-left tiny sparkle */}
      <Path
        d="M7 26C7 28.5 5 30.5 2 30.5C5 30.5 7 32.5 7 35C7 32.5 9 30.5 12 30.5C9 30.5 7 28.5 7 26Z"
        fill={color || "#DDD6FE"}
        fillOpacity={0.65}
      />
    </Svg>
  );
};
