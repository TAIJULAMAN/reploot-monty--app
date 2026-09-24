import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface OnboardingButtonProps {
  isFinalSlide: boolean;
  onPress: () => void;
  text?: string;
}

export function OnboardingButton({
  isFinalSlide,
  onPress,
  text,
}: OnboardingButtonProps) {
  const displayText = text ?? (isFinalSlide ? "GET STARTED" : "NEXT");

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.buttonWrapper,
          pressed && styles.buttonPressed,
        ]}
      >
        <LinearGradient
          colors={
            isFinalSlide
              ? ["#0284C7", "#0EA5E9", "#38BDF8"]
              : ["#3568A0", "#4B85C4", "#69A6E3"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>{displayText}</Text>
          <ArrowRight
            size={19}
            color="#FFFFFF"
            strokeWidth={2.4}
            style={styles.arrowIcon}
          />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 60,
    position: "relative",
  },
  buttonWrapper: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 2,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  buttonGradient: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
