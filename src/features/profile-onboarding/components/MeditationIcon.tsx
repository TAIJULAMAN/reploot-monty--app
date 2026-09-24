import React from "react";
import Svg, { Path } from "react-native-svg";

export function MeditationIcon() {
  const fillColor = "#38EDD8";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill={fillColor}>
      <Path
        fillRule="evenodd"
        d="M 2.0 13.91 L 2.0 16.04 L 4.13 16.04 L 9.23 13.06 L 9.66 14.77 L 4.13 18.17 L 4.13 19.45 L 5.83 20.72 L 8.38 20.72 L 8.81 18.6 L 10.51 17.32 L 14.77 18.6 L 10.51 18.6 L 9.66 20.72 L 18.17 20.72 L 19.45 19.45 L 19.45 17.74 L 13.91 14.77 L 14.34 13.06 L 18.17 15.62 L 21.57 16.04 L 21.57 13.91 L 17.74 13.06 L 12.64 8.38 L 10.09 8.81 L 5.83 13.06 Z M 10.51 3.28 L 10.09 3.7 L 9.66 4.55 L 9.66 5.83 L 10.94 7.11 L 13.06 7.11 L 13.91 6.26 L 13.91 4.13 L 13.06 3.28 L 12.21 2.85 L 11.36 2.85 Z"
      />
    </Svg>
  );
}
