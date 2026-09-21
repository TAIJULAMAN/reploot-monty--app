import * as Haptics from "expo-haptics";
import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bookmark,
  Clock,
  Cpu,
  Dumbbell,
  Flame,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export interface WorkoutLibraryDetailHeroCardProps {
  image?: ImageSource | number | string;
  protocolBadge?: string;
  title?: string;
  titleSecondary?: string;
  duration?: string;
  calories?: string;
  exerciseCount?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: (bookmarked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const WorkoutLibraryDetailHeroCard: React.FC<
  WorkoutLibraryDetailHeroCardProps
> = ({
  image,
  protocolBadge = "AI PROTOCOL",
  title = "CHEST",
  titleSecondary = "HYPERTROPHY",
  duration = "60 MIN",
  calories = "450 KCAL",
  exerciseCount = "8 EXERCISES",
  isBookmarked: externalBookmarked,
  onToggleBookmark,
  style,
}) => {
  const [internalBookmarked, setInternalBookmarked] = useState(false);
  const isBookmarked = externalBookmarked ?? internalBookmarked;

  const handleBookmarkPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    const nextVal = !isBookmarked;
    setInternalBookmarked(nextVal);
    onToggleBookmark?.(nextVal);
  };

  return (
    <View style={[styles.cardContainer, style]}>
      {/* Background Image */}
      {image && (
        <Image
          source={image}
          style={styles.heroImage}
          contentFit="cover"
          priority="high"
        />
      )}

      {/* Subtle Cyan ambient overlay */}
      <View style={styles.ambientGlow} pointerEvents="none" />

      {/* Gradient Vignette for Text Legibility */}
      <LinearGradient
        colors={[
          "rgba(7, 10, 17, 0.2)",
          "rgba(7, 10, 17, 0.05)",
          "rgba(7, 10, 17, 0.65)",
          "rgba(7, 10, 17, 0.96)",
        ]}
        locations={[0, 0.35, 0.7, 1]}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />

      {/* Top Controls Row */}
      <View style={styles.topRow}>
        <View style={styles.badgePill}>
          <Cpu size={12} color="#44EAC3" />
          <Text style={styles.badgeText}>{protocolBadge}</Text>
        </View>

        <Pressable
          onPress={handleBookmarkPress}
          style={({ pressed }) => [
            styles.bookmarkBtn,
            pressed && styles.pressedOpacity,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Bookmark workout"
        >
          <Bookmark
            size={18}
            color={isBookmarked ? "#44EAC3" : "#FFFFFF"}
            fill={isBookmarked ? "#44EAC3" : "transparent"}
          />
        </Pressable>
      </View>

      {/* Bottom Content Row */}
      <View style={styles.bottomContent}>
        <View style={styles.titleWrapper}>
          <Text style={styles.heroTitleItalic}>{title}</Text>
          {titleSecondary && (
            <Text style={styles.heroTitleItalic}>{titleSecondary}</Text>
          )}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Clock size={13} color="#FFFFFF" />
            <Text style={styles.statText}>{duration}</Text>
          </View>

          <View style={styles.statItem}>
            <Flame size={13} color="#FF6B4A" />
            <Text style={styles.statText}>{calories}</Text>
          </View>

          <View style={styles.statItem}>
            <Dumbbell size={13} color="#44EAC3" />
            <Text style={styles.statText}>{exerciseCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 380,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#0C101A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  ambientGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10, 25, 35, 0.2)",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
  },
  topRow: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(15, 26, 42, 0.75)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.35)",
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(12px)",
        } as any)
      : {}),
  },
  badgeText: {
    color: "#44EAC3",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    textTransform: "uppercase",
  },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(14, 18, 27, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(12px)",
        } as any)
      : {}),
  },
  pressedOpacity: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  bottomContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  titleWrapper: {
    marginBottom: 12,
  },
  heroTitleItalic: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 27,
    fontStyle: "italic",
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statText: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    textTransform: "uppercase",
  },
});
