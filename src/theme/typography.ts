import { TextStyle } from "react-native";

/**
 * KINETQX Typography Tokens
 * Designed to provide bold uppercase athletic display fonts, readable UI labels,
 * and high-impact workout metrics.
 */

export const typography: Record<string, TextStyle> = {
  // Display Headings (Uppercase, wide, impactful)
  displayXL: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  displayLG: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  displayMD: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // Standard Headings
  headingXL: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
  },
  headingLG: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },
  headingMD: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  headingSM: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },

  // Body Text
  bodyLG: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  bodyMD: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  bodySM: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
  },

  // Labels & Tags
  label: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  caption: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "500",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  // Workout / Rep / XP Metrics
  metricXL: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: "900",
  },
  metricLG: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  metricMD: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
  },
};

export type TypographyVariant = keyof typeof typography;
