import React from "react";
import Svg, { Path } from "react-native-svg";

export function TitleSparkleCluster() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        d="M14 2C14 7 18 11 23 11C18 11 14 15 14 20C14 15 10 11 5 11C10 11 14 7 14 2Z"
        fill="#2DD4BF"
        opacity="0.8"
      />
      <Path
        d="M21 16C21 18 22.5 19.5 24.5 19.5C22.5 19.5 21 21 21 23C21 21 19.5 19.5 17.5 19.5C19.5 19.5 21 18 21 16Z"
        fill="#2DD4BF"
        opacity="0.5"
      />
    </Svg>
  );
}
