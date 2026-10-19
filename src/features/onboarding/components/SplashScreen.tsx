import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SplashScreenProps {
  onDismiss: () => void;
  autoDismissTimeout?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onDismiss,
  autoDismissTimeout = 1800,
}) => {
  const insets = useSafeAreaInsets();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      handleFadeOut();
    }, autoDismissTimeout);

    return () => clearTimeout(timer);
  }, []);

  const handleFadeOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  return (
    <Pressable onPress={handleFadeOut} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Brand Title Centered */}
        <View style={styles.centerContainer}>
          <Image
            source={require("../../../../assets/logo.png")}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>

        {/* Bottom Tagline with tracking */}
        <View
          style={[
            styles.bottomContainer,
            { bottom: Math.max(insets.bottom + 24, 48) },
          ]}
        >
          <Text style={styles.tagline}>TRAIN SMARTER WITH AI</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#070A11",
    zIndex: 999,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 280,
    height: 70,
  },
  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tagline: {
    color: "#94A3B8",
    fontSize: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_800ExtraBold",
    }),
  },
});
