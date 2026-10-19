import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";
import React from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface StartAiWorkoutButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  inline?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const StartAiWorkoutButton: React.FC<StartAiWorkoutButtonProps> = ({
  onPress,
  title = "START AI WORKOUT",
  disabled = false,
  inline = false,
  style,
  testID,
}) => {
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    if (disabled) return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    onPress?.();
  };

  if (inline) {
    return (
      <View style={[styles.inlineWrapper, style]} testID={testID}>
        <Pressable
          onPress={handlePress}
          disabled={disabled}
          style={[styles.ctaWrapper, disabled && styles.ctaDisabled]}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <LinearGradient
            colors={["#3D79E6", "#6AA8FD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <Sparkles size={18} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.ctaText}>{title}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.bottomBarContainer,
        { paddingBottom: Math.max(insets.bottom, 16) },
        style,
      ]}
      pointerEvents="box-none"
      testID={testID}
    >
      {/* Background Gradient Fade */}
      <LinearGradient
        colors={["transparent", "rgba(7, 10, 17, 0.85)", "#070A11"]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Action Button */}
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={[styles.ctaWrapper, disabled && styles.ctaDisabled]}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <LinearGradient
          colors={["#3D79E6", "#6AA8FD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaGradient}
        >
          <Sparkles size={18} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.ctaText}>{title}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 50,
  },
  inlineWrapper: {
    width: "100%",
    marginTop: 6,
    marginBottom: 20,
  },
  ctaWrapper: {
    borderRadius: 28,
    overflow: "hidden",
    elevation: 8,
  },
  ctaPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaGradient: {
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
