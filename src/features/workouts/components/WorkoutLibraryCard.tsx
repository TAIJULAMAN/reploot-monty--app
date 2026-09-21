import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
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
import { WorkoutCategoryItem } from "../data/workoutLibraryData";

export interface WorkoutLibraryCardProps {
  item: WorkoutCategoryItem;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const WorkoutLibraryCard: React.FC<WorkoutLibraryCardProps> = ({
  item,
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
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${item.title} - ${item.badge}`}
      testID={testID}
    >
      {/* Top Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.image}
          contentFit="cover"
          transition={150}
        />

        {/* Subtle Bottom Fade Gradient */}
        <LinearGradient
          colors={["transparent", "rgba(17, 20, 28, 0.4)", "#11141C"]}
          locations={[0.5, 0.85, 1]}
          style={styles.imageGradient}
          pointerEvents="none"
        />

        {/* Floating Teal Badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={styles.subtitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.subtitle}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#11141C",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.975 }],
    borderColor: "rgba(68, 234, 195, 0.4)",
  },
  imageContainer: {
    width: "100%",
    height: 160,
    position: "relative",
    backgroundColor: "#0A0D14",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  badgeContainer: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "rgba(6, 32, 30, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.38)",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4.5,
  },
  badgeText: {
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    color: "#44EAC3",
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
    marginBottom: 5,
  },
  subtitle: {
    color: "#8E9AA8",
    fontSize: 12,
    lineHeight: 16.5,
    fontWeight: "400",
  },
});
