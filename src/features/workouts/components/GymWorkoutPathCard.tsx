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
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { CircleGlowConfig } from "../data/workoutPaths";

export interface GymWorkoutPathCardProps {
  title: string;
  subtitle: string;
  icon: ImageSource | number | string;
  bgImage?: ImageSource | number | string;
  circleGlow?: CircleGlowConfig;
  gradientColors?: readonly [string, string, ...string[]];
  gradientLocations?: readonly [number, number, ...number[]] | number[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  gradientStyle?: StyleProp<ViewStyle>;
  isActive?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const GymWorkoutPathCard: React.FC<GymWorkoutPathCardProps> = ({
  title,
  subtitle,
  icon,
  bgImage,
  circleGlow,
  gradientColors,
  gradientLocations,
  gradientStart = { x: 0.7, y: 0 },
  gradientEnd = { x: 0.5, y: 1 },
  gradientStyle,
  isActive = false,
  onPress,
  style,
  testID,
}) => {
  const glowId = circleGlow
    ? `glow-${circleGlow.color.replace(/[^a-zA-Z0-9]/g, "")}`
    : "";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isActive && styles.cardActive,
        pressed && styles.cardPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${subtitle}`}
      testID={testID}
    >
      {circleGlow && (
        <View
          pointerEvents="none"
          style={[
            styles.circleGlowContainer,
            {
              width: circleGlow.size,
              height: circleGlow.size,
              borderRadius: circleGlow.size / 2,
              ...circleGlow.position,
            },
          ]}
        >
          {Platform.OS === "web" ? (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  borderRadius: circleGlow.size / 2,
                  backgroundColor: circleGlow.color,
                  opacity: 0.35,
                  filter: "blur(40px)",
                },
              ]}
            />
          ) : (
            <Svg
              width={circleGlow.size}
              height={circleGlow.size}
              viewBox={`0 0 ${circleGlow.size} ${circleGlow.size}`}
            >
              <Defs>
                <RadialGradient id={glowId} cx="30%" cy="30%" rx="50%" ry="30%">
                  <Stop
                    offset="0%"
                    stopColor={circleGlow.color}
                    stopOpacity="0.15"
                  />
                  <Stop
                    offset="40%"
                    stopColor={circleGlow.color}
                    stopOpacity="0.15"
                  />
                  <Stop
                    offset="80%"
                    stopColor={circleGlow.color}
                    stopOpacity="0.08"
                  />
                  <Stop
                    offset="100%"
                    stopColor={circleGlow.color}
                    stopOpacity="0"
                  />
                </RadialGradient>
              </Defs>
              <Circle
                cx={circleGlow.size / 2}
                cy={circleGlow.size / 2}
                r={circleGlow.size / 2}
                fill={`url(#${glowId})`}
              />
            </Svg>
          )}
        </View>
      )}

      {/* Fallback/Custom Linear Gradient if passed */}
      {gradientColors && (
        <LinearGradient
          colors={gradientColors}
          locations={
            gradientLocations as readonly [number, number, ...number[]] | undefined
          }
          start={gradientStart}
          end={gradientEnd}
          style={gradientStyle || StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      )}

      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.iconImage} contentFit="contain" />
      </View>

      {/* Text Info */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1D1F24",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 24,
    position: "relative",
    overflow: "hidden", // Clips the 192x192 circle to the rounded card bounds
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  cardActive: {
    borderColor: "rgba(68, 234, 195, 0.5)",
  },
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.988 }],
  },
  circleGlowContainer: {
    position: "absolute",
  },
  iconContainer: {
    width: 80,
    height: 80,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    gap: 4,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16.5,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  subtitle: {
    color: "#8E95A5",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
});
