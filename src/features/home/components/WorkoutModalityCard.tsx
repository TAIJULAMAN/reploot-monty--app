import * as Haptics from "expo-haptics";
import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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

const defaultArrowAsset = require("../../../../assets/workout/RightArrow.png");

export interface WorkoutModalityCardProps {
  title: string;
  subtitle: string;
  image: ImageSource | string | number;
  arrowImage?: ImageSource | string | number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const WorkoutModalityCard: React.FC<WorkoutModalityCardProps> = ({
  title,
  subtitle,
  image,
  arrowImage = defaultArrowAsset,
  onPress,
  style,
  testID,
}) => {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.cardPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${subtitle}`}
      testID={testID}
    >
      {/* Background Workout Image */}
      <Image
        source={image}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={200}
      />

      {/* Cyber Gradient Overlay for Text Legibility */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(7, 10, 17, 0.15)",
          "rgba(7, 10, 17, 0.72)",
          "rgba(7, 10, 17, 0.95)",
        ]}
        locations={[0.2, 0.48, 0.76, 1.0]}
        style={StyleSheet.absoluteFill}
      />

      {/* Circular Arrow Button on Right */}
      <View style={styles.arrowButtonWrapper} pointerEvents="none">
        <Image
          source={arrowImage}
          style={styles.arrowImage}
          contentFit="contain"
        />
      </View>

      {/* Bottom Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    minHeight: 240,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#11141C",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    position: "relative",
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  arrowButtonWrapper: {
    position: "absolute",
    right: 18,
    top: "52%",
    marginTop: -27,
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  arrowImage: {
    width: 52,
    height: 52,
  },
  textContainer: {
    position: "absolute",
    left: 20,
    bottom: 20,
    right: 76,
    zIndex: 2,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "500",
    marginTop: 4,
  },
});
