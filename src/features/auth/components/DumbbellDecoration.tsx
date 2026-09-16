import React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";

interface DumbbellDecorationProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const DumbbellDecoration: React.FC<DumbbellDecorationProps> = ({
  size = 42,
  color = "#64748B",
  opacity = 0.45,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      style={{ overflow: "visible" }}
    >
      <G
        transform="translate(24, 24) rotate(35) translate(-14, -14)"
        opacity={opacity}
      >
        {/* Left Outer Plate */}
        <Rect
          x={1}
          y={6}
          width={3}
          height={16}
          rx={1.5}
          fill={color}
        />
        {/* Left Inner Plate */}
        <Rect
          x={5}
          y={4}
          width={3}
          height={20}
          rx={1.5}
          fill={color}
        />
        {/* Left Collar */}
        <Rect
          x={8}
          y={9}
          width={2}
          height={10}
          rx={1}
          fill={color}
        />

        {/* Center Handle Bar */}
        <Rect
          x={10}
          y={12}
          width={8}
          height={4}
          rx={1.5}
          fill={color}
        />

        {/* Right Collar */}
        <Rect
          x={18}
          y={9}
          width={2}
          height={10}
          rx={1}
          fill={color}
        />
        {/* Right Inner Plate */}
        <Rect
          x={20}
          y={4}
          width={3}
          height={20}
          rx={1.5}
          fill={color}
        />
        {/* Right Outer Plate */}
        <Rect
          x={24}
          y={6}
          width={3}
          height={16}
          rx={1.5}
          fill={color}
        />
      </G>
    </Svg>
  );
};
