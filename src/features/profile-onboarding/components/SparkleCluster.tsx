import React from "react";
import Svg, { Path } from "react-native-svg";

export function SparkleCluster() {
  return (
    <Svg width={38} height={38} viewBox="0 0 38 38" fill="none">
      <Path
        d="M16 4C16 9.523 20.477 14 26 14C20.477 14 16 18.477 16 24C16 18.477 11.523 14 6 14C11.523 14 16 9.523 16 4Z"
        fill="#38EDD8"
        opacity="0.9"
      />
      <Path
        d="M29 4C29 6.761 31.239 9 34 9C31.239 9 29 11.239 29 14C29 11.239 26.761 9 24 9C26.761 9 29 6.761 29 4Z"
        fill="#38EDD8"
        opacity="0.65"
      />
      <Path
        d="M30 20C30 22.209 31.791 24 34 24C31.791 24 30 25.791 30 28C30 25.791 28.209 24 26 24C28.209 24 30 22.209 30 20Z"
        fill="#38EDD8"
        opacity="0.75"
      />
    </Svg>
  );
}
