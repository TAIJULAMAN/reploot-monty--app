import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { typography, TypographyVariant } from "@/theme/typography";
import { colors } from "@/theme/colors";

export type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "mint"
  | "purple"
  | "inverse";

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: TextColor;
  className?: string;
  italic?: boolean;
}

const colorMap: Record<TextColor, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  muted: colors.text.muted,
  accent: colors.text.accent,
  mint: colors.text.mint,
  purple: colors.text.purple,
  inverse: colors.text.inverse,
};

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = "bodyMD",
  color = "primary",
  style,
  italic = false,
  ...props
}) => {
  const baseStyle: TextStyle = {
    ...typography[variant],
    color: colorMap[color],
    fontStyle: italic ? "italic" : "normal",
  };

  return (
    <Text style={[baseStyle, style]} {...props}>
      {children}
    </Text>
  );
};
