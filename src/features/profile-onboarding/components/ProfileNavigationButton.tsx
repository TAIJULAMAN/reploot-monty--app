import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface ProfileNavigationButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  showArrow?: boolean;
  subtext?: string;
}

export function ProfileNavigationButton({
  title = "CONTINUE",
  onPress,
  disabled = false,
  showArrow = true,
  subtext,
}: ProfileNavigationButtonProps) {
  const handlePress = () => {
    if (disabled) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // ignore
    }
    onPress();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
      >
        <LinearGradient
          colors={
            disabled
              ? ["rgba(68, 116, 168, 0.4)", "rgba(110, 168, 228, 0.4)"]
              : ["#4474A8", "#558DC2", "#6EA8E4"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        >
          <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
          {showArrow && (
            <ArrowRight
              size={20}
              color={disabled ? "rgba(255, 255, 255, 0.5)" : "#FFFFFF"}
              strokeWidth={2.4}
              style={styles.arrow}
            />
          )}
        </LinearGradient>
      </Pressable>

      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 62,
    borderRadius: 31,
    overflow: "hidden",
    shadowColor: "#6C5CFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  gradient: {
    flex: 1,
    borderRadius: 31,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  textDisabled: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  arrow: {
    marginLeft: 8,
  },
  subtext: {
    color: "#7E7B8E",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 14,
  },
});
