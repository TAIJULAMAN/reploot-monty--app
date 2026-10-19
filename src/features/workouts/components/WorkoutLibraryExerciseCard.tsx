import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Star } from "lucide-react-native";
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
import { WorkoutDetailExercise } from "../data/workoutLibraryDetailData";

export interface WorkoutLibraryExerciseCardProps {
  exercise: WorkoutDetailExercise;
  onPress?: () => void;
  isStarred?: boolean;
  onToggleStar?: (starred: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const WorkoutLibraryExerciseCard: React.FC<
  WorkoutLibraryExerciseCardProps
> = ({ exercise, onPress, isStarred: externalStarred, onToggleStar, style }) => {
  const [internalStarred, setInternalStarred] = useState(false);
  const isStarred = externalStarred ?? internalStarred;

  const handleStarPress = (e: any) => {
    e.stopPropagation?.();
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    const nextVal = !isStarred;
    setInternalStarred(nextVal);
    onToggleStar?.(nextVal);
  };

  const renderDifficultyBadge = () => {
    switch (exercise.difficulty) {
      case "ADV":
        return (
          <View style={[styles.diffBadge, styles.badgeAdv]}>
            <Text style={[styles.diffBadgeText, styles.textAdv]}>ADV</Text>
          </View>
        );
      case "BEG":
        return (
          <View style={[styles.diffBadge, styles.badgeBeg]}>
            <Text style={[styles.diffBadgeText, styles.textBeg]}>BEG</Text>
          </View>
        );
      case "INTM":
      default:
        return (
          <View style={[styles.diffBadge, styles.badgeIntm]}>
            <Text style={[styles.diffBadgeText, styles.textIntm]}>INTM</Text>
          </View>
        );
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.cardContainer, style]}
      accessibilityRole="button"
      accessibilityLabel={`${exercise.title}, ${exercise.setsReps}`}
    >
      {/* Exercise Image */}
      <View style={styles.imageContainer}>
        <Image
          source={exercise.image}
          style={styles.image}
          contentFit="cover"
          transition={150}
        />
      </View>

      {/* Exercise Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {exercise.title}
        </Text>
        <Text style={styles.setsReps}>{exercise.setsReps}</Text>

        <View style={styles.badgeRow}>
          {renderDifficultyBadge()}
          <Text style={styles.xpText}>{exercise.xp}</Text>
        </View>
      </View>

      {/* Favorite Star Button */}
      <Pressable
        onPress={handleStarPress}
        style={styles.starButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel="Favorite exercise"
      >
        <Star
          size={19}
          color={isStarred ? "#F59E0B" : "#4B5563"}
          fill={isStarred ? "#F59E0B" : "transparent"}
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B0F19",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.16)",
    padding: 12,
    marginBottom: 12,
  },
  pressedCard: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
    borderColor: "rgba(68, 234, 195, 0.35)",
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#161922",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  setsReps: {
    color: "#8E95A5",
    fontSize: 11.5,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  diffBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
  },
  badgeIntm: {
    backgroundColor: "rgba(245, 158, 11, 0.16)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  textIntm: {
    color: "#F59E0B",
  },
  badgeAdv: {
    backgroundColor: "rgba(239, 68, 68, 0.16)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  textAdv: {
    color: "#EF4444",
  },
  badgeBeg: {
    backgroundColor: "rgba(16, 185, 129, 0.16)",
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  textBeg: {
    color: "#10B981",
  },
  diffBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  xpText: {
    color: "#C4C9D6",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  starButton: {
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  pressedStar: {
    transform: [{ scale: 1.15 }],
  },
});
