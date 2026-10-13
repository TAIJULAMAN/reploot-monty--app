import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface OnboardingButtonProps {
  isFinalSlide?: boolean;
  onPress: () => void;
  text?: string;
  disabled?: boolean;
  subtext?: string;
}

export function OnboardingButton({
  isFinalSlide = false,
  onPress,
  text,
  disabled = false,
  subtext,
}: OnboardingButtonProps) {
  const displayText = text ?? (isFinalSlide ? "GET STARTED" : "NEXT");

  const handlePress = () => {
    if (disabled) return;
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {
        // ignore
      }
    });
    onPress();
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.buttonWrapper,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
      >
        <LinearGradient
          colors={
            disabled
              ? ["rgba(53, 104, 160, 0.4)", "rgba(105, 166, 227, 0.4)"]
              : isFinalSlide
                ? ["#0284C7", "#0EA5E9", "#38BDF8"]
                : ["#3568A0", "#4B85C4", "#69A6E3"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.buttonGradient}
        >
          <Text
            style={[styles.buttonText, disabled && styles.buttonTextDisabled]}
          >
            {displayText}
          </Text>
          <ArrowRight
            size={19}
            color={disabled ? "rgba(255, 255, 255, 0.4)" : "#FFFFFF"}
            strokeWidth={2.4}
            style={styles.arrowIcon}
          />
        </LinearGradient>
      </Pressable>

      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    position: "relative",
    marginTop: 4,
    marginBottom: 4,
  },
  buttonWrapper: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 2,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  buttonGradient: {
    width: "100%",
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    fontFamily: "monospace",
  },
  buttonTextDisabled: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  arrowIcon: {
    marginLeft: 8,
  },
  subtext: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textAlign: "center",
    marginTop: 8,
    fontFamily: "monospace",
  },
});
