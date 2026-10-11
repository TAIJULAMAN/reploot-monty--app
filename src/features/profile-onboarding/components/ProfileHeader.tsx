import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AuthHeader } from "@/features/auth";

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
  const progressPercent = Math.min(
    Math.round((currentStep / totalSteps) * 100),
    100,
  );
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
      <AuthHeader
        onBack={handlePressBack}
        showBackButton={showBack}
        style={styles.topRow}
      />
      <View style={styles.stepInfoRow}>
        <Text style={styles.stepCounterText}>
          STEP {currentStep} OF {totalSteps}
        </Text>
        <Text style={styles.progressPercentText}>
          {progressPercent}% Complete
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFillWrapper, animatedStyle]}>
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
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
    marginBottom: 0,
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
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  progressPercentText: {
    color: "#22D3EE",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "monospace",
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
