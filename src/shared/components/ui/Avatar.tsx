import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/theme/gradients";
import { colors } from "@/theme/colors";
import { AppText } from "./AppText";

export interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  showGlow?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 40,
  showGlow = false,
  style,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "K";

  const renderInner = () => {
    if (uri) {
      return (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          contentFit="cover"
          transition={200}
        />
      );
    }

    return (
      <View
        style={[
          styles.fallback,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <AppText variant="label" color="primary">
          {initials}
        </AppText>
      </View>
    );
  };

  if (showGlow) {
    const ringSize = size + 4;
    return (
      <LinearGradient
        colors={gradients.cyanMint.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.glowRing,
          { width: ringSize, height: ringSize, borderRadius: ringSize / 2 },
          style,
        ]}
      >
        {renderInner()}
      </LinearGradient>
    );
  }

  return <View style={[{ width: size, height: size }, style]}>{renderInner()}</View>;
};

const styles = StyleSheet.create({
  glowRing: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  fallback: {
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: "center",
    justifyContent: "center",
  },
});
