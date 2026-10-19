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
      style={[styles.cardContainer, style]}
      testID={testID}
      onPress={handlePress}
      accessibilityLabel={`${title}: ${subtitle}`}
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

      {/* Bottom Content Row (Text and Opposite Arrow Button) */}
      <View style={styles.bottomRow} pointerEvents="none">
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        </View>

        <View style={styles.arrowButtonWrapper}>
          <Image
            source={arrowImage}
            style={styles.arrowImage}
            contentFit="contain"
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 240,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#11141C",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    position: "relative",
  },
  pressableOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
  },
  cardPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  bottomRow: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  arrowButtonWrapper: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowImage: {
    width: 50,
    height: 50,
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
