import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface ProfileHeaderProps {
  currentStep: number;
  totalSteps?: number;
  onBack: () => void;
  showBack?: boolean;
}

export function ProfileHeader({
  currentStep,
  totalSteps = 5,
  onBack,
  showBack = true,
}: ProfileHeaderProps) {
  const progressPercent = Math.min(Math.round((currentStep / totalSteps) * 100), 100);

  const handlePressBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    onBack();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with optional circular frosted back button, centered Wordmark */}
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={handlePressBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <ArrowLeft size={20} color="#C5C0FF" strokeWidth={2.2} />
          </Pressable>
        ) : (
          <View style={styles.placeholderButton} />
        )}

        <View style={styles.wordmarkWrapper}>
          <Text style={styles.brandText}>KINETQX</Text>
        </View>

        <View style={styles.placeholderButton} />
      </View>

      {/* Step Info Row: STEP X OF 5 on left, XX% Complete on right */}
      <View style={styles.stepInfoRow}>
        <Text style={styles.stepCounterText}>
          STEP {currentStep} OF {totalSteps}
        </Text>
        <Text style={styles.progressPercentText}>{progressPercent}% Complete</Text>
      </View>

      {/* Progress Track & Animated Glowing Fill */}
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={["#6366F1", "#38BDF8", "#22D3EE"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.progressFill, { width: `${progressPercent}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 6,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    minHeight: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  placeholderButton: {
    width: 44,
    height: 44,
  },
  wordmarkWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    color: "#38BDF8",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "900",
    letterSpacing: 3,
    textShadowColor: "rgba(56, 189, 248, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  stepInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  stepCounterText: {
    color: "#44EAC3",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  progressPercentText: {
    color: "#918EA1",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
