import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { AlertCircle } from "lucide-react-native";
import { colors } from "@/theme/colors";
import { AppText } from "./AppText";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something Went Wrong",
  message,
  onRetry,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <AlertCircle size={32} color={colors.status.danger} />
      </View>

      <AppText variant="headingLG" color="primary" style={styles.title}>
        {title}
      </AppText>

      <AppText variant="bodyMD" color="secondary" style={styles.message}>
        {message}
      </AppText>

      {onRetry && (
        <Button
          title="Try Again"
          variant="secondary"
          size="sm"
          onPress={onRetry}
          style={styles.retryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    marginBottom: 20,
    maxWidth: 280,
  },
  retryButton: {
    minWidth: 140,
  },
});
