/**
 * REPLOOTDesign System - Semantic Color Tokens
 * Derived strictly from REPLOOTFigma Cyber-Fitness Dark UI specifications.
 */

export const colors = {
  // Backgrounds
  background: {
    primary: "#070A11", // Deepest near-black space canvas
    secondary: "#0D111D", // Deep navy card/section background
    elevated: "#131826", // Elevated interactive surface
    card: "#0F1422", // Standard workout/nutrition card surface
    glass: "rgba(18, 24, 38, 0.75)", // Blur glass backdrop
    input: "#141A29", // Form input background
    modal: "#0A0E18", // Modal / sheet background
  },

  // Brand Accents
  brand: {
    blue: "#0284C7", // Electric cobalt blue
    blueLight: "#38BDF8", // Light electric sky blue
    cyan: "#22D3EE", // Cyber cyan (primary glow and action color)
    cyanBright: "#06B6D4", // Vivid cyan
    mint: "#10B981", // Kinetic energetic mint (accuracy, completed reps, streaks)
    mintLight: "#34D399", // Soft mint
    purple: "#8B5CF6", // AI Neural purple
    violet: "#6366F1", // Indigo-violet accent
    amber: "#F59E0B", // Warning / fire streak accent
  },

  // Text & Content
  text: {
    primary: "#FFFFFF", // Pure white display headlines and high-contrast labels
    secondary: "#94A3B8", // Cool slate-400 for subtext and descriptions
    muted: "#64748B", // Slate-500 for captions, timestamps, inactive states
    accent: "#22D3EE", // Brand cyan text highlight
    mint: "#10B981", // Milestone highlight
    purple: "#A855F7", // AI status highlight
    inverse: "#070A11", // Dark text for luminous buttons
  },

  // Borders & Glows
  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    default: "rgba(255, 255, 255, 0.14)",
    hover: "rgba(255, 255, 255, 0.25)",
    active: "#22D3EE",
    glowCyan: "rgba(34, 211, 238, 0.45)",
    glowPurple: "rgba(139, 92, 246, 0.45)",
    glowMint: "rgba(16, 185, 129, 0.45)",
  },

  // Semantic Status
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#38BDF8",
  },
} as const;

export type ColorTheme = typeof colors;
