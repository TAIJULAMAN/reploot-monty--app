import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

interface OnboardingHeaderProps {
  showSkip?: boolean;
  onSkip?: () => void;
  onLogoPress?: () => void;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  showSkip = true,
  onSkip,
  onLogoPress,
}) => {
  const insets = useSafeAreaInsets();

  const handleSkip = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    onSkip?.();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top + 10, 20) },
      ]}
      pointerEvents="box-none"
    >
      {/* Brand Wordmark */}
      <Pressable onPress={onLogoPress} hitSlop={12}>
        <Text style={styles.brandTitle}>KINETQX</Text>
      </Pressable>

      {/* Skip Action Button */}
      {showSkip ? (
        <Pressable
          onPress={handleSkip}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
          style={({ pressed }) => [styles.skipButton, pressed && styles.skipPressed]}
        >
          <Text style={styles.skipText}>SKIP</Text>
        </Pressable>
      ) : (
        <View style={styles.skipPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  brandTitle: {
    color: "#38BDF8",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  skipButton: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  skipPressed: {
    opacity: 0.6,
  },
  skipText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  skipPlaceholder: {
    width: 40,
  },
});
