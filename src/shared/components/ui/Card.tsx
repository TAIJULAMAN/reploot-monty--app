import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export interface CardProps extends ViewProps {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, elevated = false, ...props }) => {
  return (
    <View
      style={[
        styles.card,
        elevated ? styles.elevated : styles.standard,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  standard: {
    backgroundColor: colors.background.card,
  },
  elevated: {
    backgroundColor: colors.background.elevated,
    borderColor: colors.border.default,
  },
});
