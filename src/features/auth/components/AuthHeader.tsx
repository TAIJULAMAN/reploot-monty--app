import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";

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
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.7}
          hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2.2} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Image
        source={require("../../../../assets/logo.png")}
        style={styles.logoImage}
        contentFit="contain"
      />
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
  logoImage: {
    width: 140,
    height: 32,
  },
});
