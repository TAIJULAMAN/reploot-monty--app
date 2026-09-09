import React from "react";
import { View, ViewProps, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "@/theme/colors";

export interface GlassCardProps extends ViewProps {
  intensity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 35,
  style,
  ...props
}) => {
  if (Platform.OS === "web") {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: "rgba(18, 24, 38, 0.75)",
            backdropFilter: "blur(16px)",
          } as unknown as ViewProps["style"],
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView intensity={intensity} tint="dark" style={[styles.card, style]} {...props}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(13, 17, 29, 0.6)",
    overflow: "hidden",
  },
});
