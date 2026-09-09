import { Platform, ViewStyle } from "react-native";

/**
 * KINETQX Cross-Platform Shadows & Glow Effects
 * Provides calibrated iOS shadow properties and Android elevation fallback,
 * including signature KINETQX neon bloom glows.
 */

export const shadows = {
  // Subtle surface elevation for cards
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
    },
  }),

  // Elevated modal/popover shadow
  modal: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.6,
      shadowRadius: 20,
    },
    android: {
      elevation: 10,
    },
    default: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.6,
      shadowRadius: 20,
    },
  }),

  // Cyber Cyan Luminous Glow (Buttons, active cards, indicators)
  glowCyan: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#22D3EE",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: "#22D3EE",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
  }),

  // Kinetic Mint Glow (Rep milestones, completed sets)
  glowMint: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
  }),

  // Neural Purple Glow (AI Coach, Smart generation)
  glowPurple: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#8B5CF6",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: "#8B5CF6",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius: 12,
    },
  }),
} as const;
