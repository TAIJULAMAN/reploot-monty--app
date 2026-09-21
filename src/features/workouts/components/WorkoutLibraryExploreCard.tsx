import * as Haptics from "expo-haptics";
import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Layers } from "lucide-react-native";
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

export interface WorkoutLibraryExploreCardProps {
  title?: string;
  subtitle?: string;
  image?: ImageSource | number | string;
  icon?: ImageSource | number | string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const WorkoutLibraryExploreCard: React.FC<
  WorkoutLibraryExploreCardProps
> = ({
  title = "CHEST\nLIBRARY",
  subtitle = "Explore 24+ specialized protocols",
  image,
  icon,
  onPress,
  style,
}) => {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    onPress?.();
  };

  const titleLines = title.split("\n");

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.pressedCard,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title.replace("\n", " ")}, ${subtitle}`}
    >
      {/* Background Banner Image */}
      {image && (
        <Image
          source={image}
          style={styles.bgImage}
          contentFit="cover"
          transition={150}
        />
      )}

      {/* Dark Vignette Gradient for Contrast */}
      <LinearGradient
        colors={[
          "rgba(7, 10, 17, 0.92)",
          "rgba(7, 10, 17, 0.72)",
          "rgba(7, 10, 17, 0.35)",
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />

      {/* Content Row */}
      <View style={styles.contentRow}>
        {/* Left Info */}
        <View style={styles.leftColumn}>
          <View style={styles.iconBadge}>
            {icon ? (
              <Image
                source={icon}
                style={styles.customIcon}
                contentFit="contain"
              />
            ) : (
              <Layers size={22} color="#44EAC3" />
            )}
          </View>

          <View style={styles.titleContainer}>
            {titleLines.map((line, idx) => (
              <Text key={idx} style={styles.titleText}>
                {line}
              </Text>
            ))}
          </View>

          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>

        {/* Right Arrow Button */}
        <View style={styles.arrowButton}>
          <ArrowRight size={18} color="#44EAC3" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    minHeight: 146,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#0C101A",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.22)",
    marginBottom: 24,
  },
  pressedCard: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
    borderColor: "rgba(68, 234, 195, 0.45)",
  },
  bgImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flex: 1,
    zIndex: 10,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 14,
  },
  iconBadge: {
    marginBottom: 8,
  },
  customIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    marginBottom: 6,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 21,
    fontStyle: "italic",
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  subtitleText: {
    color: "#8E95A5",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.2,
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
  },
  arrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(11, 16, 26, 0.75)",
    borderWidth: 1.5,
    borderColor: "#44EAC3",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#44EAC3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
    ...(Platform.OS === "web"
      ? ({
          boxShadow: "0 0 10px rgba(68, 234, 195, 0.4)",
        } as any)
      : {}),
  },
});
