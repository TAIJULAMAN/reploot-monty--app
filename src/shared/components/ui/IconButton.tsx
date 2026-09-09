import React from "react";
import { Pressable, ViewStyle, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { colors } from "@/theme/colors";

export interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
  haptic?: boolean;
  style?: ViewStyle;
  accessibilityLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 44,
  disabled = false,
  haptic = true,
  style,
  accessibilityLabel,
}) => {
  const handlePress = () => {
    if (disabled) return;
    if (haptic) {
      try {
        Haptics.selectionAsync();
      } catch {
        // ignore
      }
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "rgba(25, 33, 52, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    backgroundColor: "rgba(35, 46, 72, 0.8)",
    borderColor: colors.brand.cyan,
    transform: [{ scale: 0.95 }],
  },
  disabled: {
    opacity: 0.4,
  },
});
