import { useAppSelector } from "@/store/hooks";
import * as Haptics from "expo-haptics";
import { Image, ImageSource } from "expo-image";
import { Check, Play } from "lucide-react-native";
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
  isCompleted?: boolean;
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
  isCompleted = false,
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
      style={[
        styles.exerciseCard,
        isCompleted && styles.exerciseCardCompleted,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${isCompleted ? "Completed" : subtitle}`}
      testID={testID}
    >
      {/* Exercise Thumbnail */}
      <View style={styles.thumbnailWrapper}>
        {image && (
          <Image
            source={image}
            style={[styles.thumbnailImage, isCompleted && styles.thumbnailImageCompleted]}
            contentFit="cover"
          />
        )}
        {index ? (
          <View style={[styles.indexBadge, isCompleted && styles.indexBadgeCompleted]}>
            <Text style={[styles.indexBadgeText, isCompleted && styles.indexBadgeTextCompleted]}>
              {index}
            </Text>
          </View>
        ) : null}

        {isCompleted && (
          <View style={styles.thumbnailCheckBadge}>
            <Check size={11} color="#38EDD8" strokeWidth={3.5} />
          </View>
        )}
      </View>

      {/* Title & Sets/Reps */}
      <View style={styles.exerciseTextContainer}>
        <Text style={[styles.exerciseTitle, isCompleted && styles.exerciseTitleCompleted]}>
          {title}
        </Text>
        {isCompleted ? (
          <View style={styles.completedStatusRow}>
            <View style={styles.completedDot} />
            <Text style={styles.completedStatusText}>COMPLETED</Text>
          </View>
        ) : (
          <Text style={styles.exerciseSubtitle}>{subtitle}</Text>
        )}
      </View>

      {/* Action Button: Checkmark if completed, Play if pending */}
      {isCompleted ? (
        <View style={styles.completedCheckCircle}>
          <Check size={16} color="#38EDD8" strokeWidth={3.2} />
        </View>
      ) : (
        <View style={styles.playButton}>
          <Play
            size={14}
            color="rgba(255, 255, 255, 0.85)"
            fill="rgba(255, 255, 255, 0.85)"
            style={styles.playIcon}
          />
        </View>
      )}
    </Pressable>
  );
};

export interface PushDayExerciseListProps {
  exercises: PushDayExercise[];
  completedExerciseIds?: string[];
  onExercisePress?: (exercise: PushDayExercise) => void;
  style?: StyleProp<ViewStyle>;
}

export const PushDayExerciseList: React.FC<PushDayExerciseListProps> = ({
  exercises,
  completedExerciseIds: propCompletedIds,
  onExercisePress,
  style,
}) => {
  const reduxCompletedIds = useAppSelector(
    (state) => state.workout?.completedExerciseIds || []
  );
  const completedIds = propCompletedIds ?? reduxCompletedIds;

  return (
    <View style={[styles.exerciseList, style]}>
      {exercises.map((exercise) => {
        const isCompleted = completedIds.includes(exercise.id);
        return (
          <PushDayExerciseCard
            key={exercise.id}
            exercise={exercise}
            isCompleted={isCompleted}
            onPress={() => onExercisePress?.(exercise)}
          />
        );
      })}
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
  exerciseCardCompleted: {
    borderColor: "rgba(56, 237, 216, 0.4)",
    backgroundColor: "rgba(14, 25, 36, 0.95)",
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
  thumbnailImageCompleted: {
    opacity: 0.85,
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
  indexBadgeCompleted: {
    backgroundColor: "rgba(10, 30, 35, 0.88)",
    borderColor: "rgba(56, 237, 216, 0.4)",
  },
  indexBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  indexBadgeTextCompleted: {
    color: "#38EDD8",
  },
  thumbnailCheckBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(10, 26, 30, 0.95)",
    borderWidth: 1.2,
    borderColor: "#38EDD8",
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseTextContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  exerciseTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  exerciseTitleCompleted: {
    color: "#E2E8F0",
  },
  exerciseSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  completedStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  completedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38EDD8",
  },
  completedStatusText: {
    color: "#38EDD8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
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
  completedCheckCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#38EDD8",
    backgroundColor: "rgba(56, 237, 216, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
