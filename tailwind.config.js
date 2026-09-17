/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#070A11",
          secondary: "#0D111D",
          elevated: "#131826",
          card: "#0F1422",
          glass: "rgba(18, 24, 38, 0.75)",
        },
        brand: {
          blue: "#0284C7",
          cyan: "#22D3EE",
          mint: "#10B981",
          purple: "#8B5CF6",
          violet: "#6366F1",
          electric: "#38BDF8",
          dark: "#05070B",
        },
        kinetic: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
          muted: "#64748B",
          accent: "#22D3EE",
          inverse: "#070A11",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          default: "rgba(255, 255, 255, 0.14)",
          active: "#22D3EE",
          glow: "rgba(34, 211, 238, 0.4)",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#38BDF8",
        },
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
      },
      spacing: {
        "4.5": "18px",
        "18": "72px",
      },
    },
  },
  plugins: [],
};
