import React from "react";
import Svg, { Path } from "react-native-svg";

export function BicepArmIcon() {
  const fillColor = "#F38D68";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill={fillColor}>
      <Path
        fillRule="evenodd"
        d="M 5.81 4.14 L 2.0 15.57 L 2.48 17.95 L 9.14 21.29 L 14.38 21.29 L 19.62 18.9 L 20.57 19.86 L 21.52 18.43 L 20.1 17.0 L 14.38 19.86 L 9.14 19.86 L 4.38 17.48 L 3.43 16.05 L 5.81 7.48 L 8.19 4.62 L 10.57 3.67 L 12.0 5.57 L 7.71 6.52 L 7.71 13.67 L 8.67 14.62 L 10.57 13.19 L 14.38 13.19 L 16.29 14.62 L 17.24 13.67 L 16.29 12.71 L 18.19 10.81 L 21.52 9.86 L 21.52 8.43 L 18.67 8.9 L 14.86 11.76 L 10.1 12.24 L 10.1 7.95 L 12.48 7.48 L 13.43 4.62 L 11.52 2.24 Z"
      />
    </Svg>
  );
}
