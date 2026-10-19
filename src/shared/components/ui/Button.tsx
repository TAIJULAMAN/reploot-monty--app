import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { colors } from "@/theme/colors";
import { gradients } from "@/theme/gradients";
import { shadows } from "@/theme/shadows";
import { AppText } from "./AppText";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "ai";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  haptic?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  haptic = true,
  style,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    if (haptic) {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch {
        // Haptics unavailable on web / simulator
      }
    }
    onPress();
  };

  const isPrimary = variant === "primary";
  const isAi = variant === "ai";

  const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: { height: 38, paddingHorizontal: 16, borderRadius: 19 },
      text: { fontSize: 13, fontWeight: "700" },
    },
    md: {
      container: { height: 50, paddingHorizontal: 24, borderRadius: 25 },
      text: { fontSize: 15, fontWeight: "800", letterSpacing: 0.8 },
    },
    lg: {
      container: { height: 56, paddingHorizontal: 28, borderRadius: 28 },
      text: { fontSize: 16, fontWeight: "800", letterSpacing: 1 },
    },
  };

  const renderContent = () => (
    <View style={styles.contentRow}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary ? colors.text.primary : colors.brand.cyan}
        />
      ) : (
        <>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <AppText
            variant="label"
            style={[
              sizeStyles[size].text,
              isPrimary ? styles.primaryText : styles.defaultText,
              variant === "danger" && styles.dangerText,
            ]}
          >
            {title}
          </AppText>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </>
      )}
    </View>
  );

  // Gradient buttons (primary and ai)
  if (isPrimary || isAi) {
    const gradientColors = isAi ? gradients.violetBlue.colors : gradients.primaryCTA.colors;

    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.82}
        style={[
          styles.base,
          sizeStyles[size].container,
          shadows.glowCyan,
          disabled && styles.disabled,
          style,
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, sizeStyles[size].container]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Non-gradient variants
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {},
    ai: {},
    secondary: {
      backgroundColor: colors.background.elevated,
      borderWidth: 1,
      borderColor: colors.border.subtle,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: colors.brand.cyan,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    danger: {
      backgroundColor: "rgba(239, 68, 68, 0.15)",
      borderWidth: 1,
      borderColor: colors.status.danger,
    },
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={[
        styles.base,
        sizeStyles[size].container,
        variantStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  primaryText: {
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  defaultText: {
    color: colors.text.primary,
    textTransform: "uppercase",
  },
  dangerText: {
    color: colors.status.danger,
    textTransform: "uppercase",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.45,
  },
});
