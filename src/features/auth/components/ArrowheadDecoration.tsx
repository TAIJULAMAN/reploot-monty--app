import React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowheadDecorationProps {
  size?: number;
  color?: string;
}

export const ArrowheadDecoration: React.FC<ArrowheadDecorationProps> = ({
  size = 32,
  color = "#2DD4BF",
}) => {
  return (
    <Svg width={size * 0.72} height={size} viewBox="0 0 26 36" fill="none">
      <Path
        d="M13 0L26 36L13 29L0 36L13 0Z"
        fill={color}
      />
    </Svg>
  );
};
