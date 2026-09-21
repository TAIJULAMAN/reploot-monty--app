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
          styles.buttonPressable,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
      >
        <LinearGradient
          colors={
            disabled
              ? ["rgba(53, 112, 173, 0.35)", "rgba(98, 162, 229, 0.35)"]
              : ["#3570AD", "#4A88CC", "#62A2E5"]
          }
          start={{ x: 0, y: 0.2 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.gradientPill}
        >
          <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
          {showArrow && (
            <ArrowRight
              size={18}
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
    marginTop: 10,
    marginBottom: 6,
  },
  buttonPressable: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    shadowColor: "#2B6CB0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  gradientPill: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  textDisabled: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  arrow: {
    marginLeft: 8,
  },
  subtext: {
    color: "#475569",
    fontSize: 9,
    lineHeight: 13,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 8,
  },
});
