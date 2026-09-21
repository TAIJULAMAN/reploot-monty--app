import { ImageSource } from "expo-image";
import { StyleProp, ViewStyle } from "react-native";

export interface CircleGlowConfig {
  color: string;
  size: number;
  position: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };
}

export interface WorkoutPathItem {
  id: "push" | "pull" | "library";
  title: string;
  subtitle: string;
  icon: ImageSource | number | string;
  bgImage?: ImageSource | number | string;
  circleGlow?: CircleGlowConfig;
  gradientColors?: readonly [string, string, ...string[]];
  gradientLocations?: readonly [number, number, ...number[]];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  gradientStyle?: StyleProp<ViewStyle>;
}

export const DEMO_WORKOUT_PATHS: WorkoutPathItem[] = [
  {
    id: "push",
    title: "PUSH DAY",
    subtitle: "Chest, Shoulders & Triceps focus.",
    icon: require("../../../../assets/icon/pushDay.png"),
    bgImage: require("../../../../assets/bg/pullDay.png"),
    circleGlow: {
      color: "#C5C0FF",
      size: 160,
      position: {
        top: -48,
        right: -15,
      },
    },
  },
  {
    id: "pull",
    title: "PULL DAY",
    subtitle: "Back, Biceps & Rear Delts focus.",
    icon: require("../../../../assets/icon/pullDay.png"),
    bgImage: require("../../../../assets/bg/pushDay.png"),
    circleGlow: {
      color: "#44EAC3",
      size: 160,
      position: {
        bottom: -48,
        right: -15,
      },
    },
  },
  {
    id: "library",
    title: "WORKOUT LIBRARY",
    subtitle: "Browse all available gym routines.",
    icon: require("../../../../assets/icon/library.png"),
    bgImage: require("../../../../assets/bg/library.png"),
    // circleGlow: {
    //   color: "#44EAC3",
    //   size: 160,
    //   position: {
    //     bottom: -48,
    //     right: -15,
    //   },
    // },
  },
];
