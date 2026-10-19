import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      style={[styles.container, { paddingTop: Math.max(insets.top, 24) + 12 }]}
      pointerEvents="box-none"
    >
      <Pressable onPress={onLogoPress} hitSlop={12}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logoImage}
          contentFit="contain"
        />
      </Pressable>
      {showSkip ? (
        <Pressable
          onPress={handleSkip}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
          style={styles.skipButton}
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
  logoImage: {
    width: 120,
    height: 24, // roughly matches previous text size
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  skipPressed: {
    opacity: 0.6,
  },
  skipText: {
    color: "#CBD5E1",
    fontSize: 13,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
  },
  skipPlaceholder: {
    width: 40,
  },
});
