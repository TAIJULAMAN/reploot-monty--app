import * as Haptics from "expo-haptics";
import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, Dumbbell, Flame } from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
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

  return (
    <View style={[styles.cardContainer, style]}>
      {image && (
        <Image
          source={image}
          style={styles.heroImage}
          contentFit="cover"
          priority="high"
        />
      )}
      <View style={styles.ambientGlow} pointerEvents="none" />
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
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "monospace",
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
    fontSize: 24,
    lineHeight: 28,
    // fontStyle: "italic",
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontFamily: "monospace",
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
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
});
