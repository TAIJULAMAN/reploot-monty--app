import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export interface AuthHeaderProps {
  onBack?: () => void;
  brandText?: string;
  wordmarkColor?: string;
  showBackButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AuthHeader({
  onBack,
  brandText = "REPLOOT",
  wordmarkColor = "#38BDF8",
  showBackButton = true,
  style,
}: AuthHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(onboarding)");
      }
    }
  };

  return (
    <View style={[styles.topBar, style]}>
      {showBackButton ? (
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2.2} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={[styles.wordmark, { color: wordmarkColor }]}>
        {brandText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.32)",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  wordmark: {
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
