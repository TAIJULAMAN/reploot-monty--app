import * as Haptics from "expo-haptics";
import { Image, ImageSource } from "expo-image";
import { Play } from "lucide-react-native";
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
import { PushDayExercise } from "../data/pushDayData";

export interface PushDayExerciseCardProps {
  exercise?: PushDayExercise;
  index?: string;
  title?: string;
  subtitle?: string;
  image?: ImageSource | number | string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const PushDayExerciseCard: React.FC<PushDayExerciseCardProps> = ({
  exercise,
  index = exercise?.index,
  title = exercise?.title,
  subtitle = exercise?.subtitle,
  image = exercise?.image,
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
        styles.exerciseCard,
        pressed && styles.exerciseCardPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle}`}
      testID={testID}
    >
      {/* Exercise Thumbnail */}
      <View style={styles.thumbnailWrapper}>
        {image && (
          <Image
            source={image}
            style={styles.thumbnailImage}
            contentFit="cover"
          />
        )}
        {index ? (
          <View style={styles.indexBadge}>
            <Text style={styles.indexBadgeText}>{index}</Text>
          </View>
        ) : null}
      </View>

      {/* Title & Sets/Reps */}
      <View style={styles.exerciseTextContainer}>
        <Text style={styles.exerciseTitle}>{title}</Text>
        <Text style={styles.exerciseSubtitle}>{subtitle}</Text>
      </View>

      {/* Play Action Button */}
      <View style={styles.playButton}>
        <Play
          size={14}
          color="rgba(255, 255, 255, 0.85)"
          fill="rgba(255, 255, 255, 0.85)"
          style={styles.playIcon}
        />
      </View>
    </Pressable>
  );
};

export interface PushDayExerciseListProps {
  exercises: PushDayExercise[];
  onExercisePress?: (exercise: PushDayExercise) => void;
  style?: StyleProp<ViewStyle>;
}

export const PushDayExerciseList: React.FC<PushDayExerciseListProps> = ({
  exercises,
  onExercisePress,
  style,
}) => {
  return (
    <View style={[styles.exerciseList, style]}>
      {exercises.map((exercise) => (
        <PushDayExerciseCard
          key={exercise.id}
          exercise={exercise}
          onPress={() => onExercisePress?.(exercise)}
        />
      ))}
    </View>
  );
};

// Reusable aliases
export const WorkoutExerciseCard = PushDayExerciseCard;
export const WorkoutExerciseList = PushDayExerciseList;

const styles = StyleSheet.create({
  exerciseList: {
    gap: 12,
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161821",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 14,
  },
  exerciseCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  thumbnailWrapper: {
    width: 64,
    height: 64,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#0F121A",
    position: "relative",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  indexBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(8, 10, 16, 0.78)",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  indexBadgeText: {
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  exerciseTextContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  exerciseTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  exerciseSubtitle: {
    color: "#8E95A5",
    fontSize: 13,
    lineHeight: 17,
    marginTop: 4,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.38)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  playIcon: {
    marginLeft: 2,
  },
});
