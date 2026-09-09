import { WithSpringConfig, WithTimingConfig, Easing } from "react-native-reanimated";

/**
 * KINETQX Motion & Animation Tokens
 * Calibrated spring and timing configurations for fluid UI transitions.
 */

export const motion = {
  // Spring configurations
  spring: {
    snappy: {
      damping: 15,
      stiffness: 150,
      mass: 0.8,
    } as WithSpringConfig,
    bouncy: {
      damping: 10,
      stiffness: 120,
      mass: 1,
    } as WithSpringConfig,
    gentle: {
      damping: 20,
      stiffness: 90,
      mass: 1,
    } as WithSpringConfig,
  },

  // Timing configurations
  timing: {
    fast: {
      duration: 150,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    } as WithTimingConfig,
    standard: {
      duration: 250,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    } as WithTimingConfig,
    slow: {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    } as WithTimingConfig,
  },

  // Millisecond durations
  duration: {
    instant: 100,
    quick: 200,
    normal: 300,
    extended: 500,
    pulse: 1500,
  },
} as const;
