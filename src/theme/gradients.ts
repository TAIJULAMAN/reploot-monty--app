/**
 * REPLOOTGradient Tokens
 * Built for expo-linear-gradient and reusable surface styling.
 */

export const gradients = {
  // Luminous Primary Action Button Gradient (Next ->, Get Started ->, Start Workout ->)
  primaryCTA: {
    colors: ["#0284C7", "#0EA5E9", "#22D3EE"] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Cyber Mint Gradient (Milestones, streak badges, accuracy scoring)
  cyanMint: {
    colors: ["#06B6D4", "#10B981"] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },

  // Neural Violet Gradient (AI Coach, Smart recommendations)
  violetBlue: {
    colors: ["#8B5CF6", "#0284C7"] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Level Badge Gradient
  levelBadge: {
    colors: ["#3B82F6", "#1D4ED8"] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // XP Progress Bar Multi-Stop Gradient
  xpBar: {
    colors: ["#6366F1", "#38BDF8", "#22D3EE"] as const,
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },

  // Card Glow Border Gradient
  glowBorder: {
    colors: ["#22D3EE", "#8B5CF6"] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Image Background Overlay Gradient
  imageOverlay: {
    colors: ["rgba(7, 10, 17, 0.1)", "rgba(7, 10, 17, 0.92)"] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },

  // Glass Card Shimmer / Accent
  glassSurface: {
    colors: ["rgba(25, 33, 52, 0.8)", "rgba(13, 18, 30, 0.85)"] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
} as const;

export type GradientTheme = typeof gradients;
