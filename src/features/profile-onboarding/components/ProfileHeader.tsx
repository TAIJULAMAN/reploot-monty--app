import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
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
  const animatedProgress = useSharedValue(progressPercent);

  useEffect(() => {
    animatedProgress.value = withTiming(progressPercent, {
      duration: 260,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progressPercent, animatedProgress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }));

  const handlePressBack = () => {
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // ignore
      }
    });
    onBack();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with circular frosted back button on left, KINETQX Wordmark on right */}
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            unstable_pressDelay={0}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={handlePressBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2.4} />
          </Pressable>
        ) : (
          <View style={styles.emptySpacer} />
        )}

        <View style={styles.wordmarkWrapper}>
          <Text style={styles.brandText}>KINETQX</Text>
        </View>
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
        <Animated.View style={[styles.progressFillWrapper, animatedStyle]}>
          <LinearGradient
            colors={["#818CF8", "#38BDF8", "#34D399"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 2,
    paddingBottom: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 42,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  emptySpacer: {
    width: 42,
    height: 42,
  },
  wordmarkWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  brandText: {
    color: "#38BDF8",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "900",
    letterSpacing: 2.6,
    textShadowColor: "rgba(56, 189, 248, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  stepInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 6,
  },
  stepCounterText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  progressPercentText: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    overflow: "hidden",
  },
  progressFillWrapper: {
    height: "100%",
    borderRadius: 2,
    overflow: "hidden",
  },
});
