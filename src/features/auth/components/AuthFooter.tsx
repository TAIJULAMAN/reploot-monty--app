import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface AuthFooterProps {
  onAction: () => void;
  text?: string;
  actionText?: string;
}

export function AuthFooter({
  onAction,
  text = "Don't have an account? ",
  actionText = "Create Account",
}: AuthFooterProps) {
  return (
    <View style={styles.bottomCtaContainer}>
      <Text style={styles.bottomCtaText}>{text}</Text>
      <Pressable
        onPress={onAction}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={({ pressed }) => [pressed && styles.buttonPressed]}
      >
        <Text style={styles.createAccountLink}>{actionText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomCtaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  bottomCtaText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
  },
  createAccountLink: {
    color: "#10B981",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
