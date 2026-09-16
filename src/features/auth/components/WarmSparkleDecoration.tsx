import React from "react";
import Svg, { Path } from "react-native-svg";

interface WarmSparkleDecorationProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const WarmSparkleDecoration: React.FC<WarmSparkleDecorationProps> = ({
  size = 28,
  color = "#E2B89D",
  opacity = 0.75,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Primary 4-point sparkle diamond */}
      <Path
        d="M14 0C14 7.5 7.5 14 0 14C7.5 14 14 20.5 14 28C14 20.5 20.5 14 28 14C20.5 14 14 7.5 14 0Z"
        fill={color}
        fillOpacity={opacity}
      />
      {/* Secondary offset sparkle */}
      <Path
        d="M26 2C26 5 23 7.5 20 7.5C23 7.5 26 10 26 13C26 10 29 7.5 32 7.5C29 7.5 26 5 26 2Z"
        fill={color}
        fillOpacity={opacity * 0.8}
      />
    </Svg>
  );
};
