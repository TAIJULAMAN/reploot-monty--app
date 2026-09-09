import React from "react";
import { View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/theme/colors";
import { AppText } from "./AppText";

export interface LoadingIndicatorProps {
  message?: string;
  size?: "small" | "large";
  style?: ViewStyle;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  size = "large",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={colors.brand.cyan} />
      {message && (
        <AppText variant="caption" color="secondary" style={styles.text}>
          {message}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
