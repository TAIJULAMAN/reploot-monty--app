import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Play } from "lucide-react-native";
import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CircuitExerciseItem } from "../data/upperBodySessionData";

export interface CircuitExerciseCardProps {
  exercise: CircuitExerciseItem;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const CircuitExerciseCard: React.FC<CircuitExerciseCardProps> = ({
  exercise,
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
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      style={[styles.cardContainer, style]}
      accessibilityRole="button"
      accessibilityLabel={`${exercise.title}, ${exercise.subtitle}`}
      testID={testID}
    >
      {/* Thumbnail with #01 Badge */}
      <View style={styles.thumbnailWrapper}>
        <Image
          source={exercise.image}
          style={styles.thumbnailImage}
          contentFit="cover"
        />
        <View style={styles.indexBadge}>
          <Text style={styles.indexBadgeText}>{exercise.index}</Text>
        </View>
      </View>

      {/* Middle Content */}
      <View style={styles.textContainer}>
        {/* Cyan XP Pill */}
        <View style={styles.xpPill}>
          <Text style={styles.xpPillText}>{exercise.xp}</Text>
        </View>

        {/* Exercise Title */}
        <Text style={styles.titleText}>{exercise.title}</Text>

        {/* Sets x Reps */}
        <Text style={styles.subtitleText}>{exercise.subtitle}</Text>
      </View>

      {/* Action Play Button */}
      <View style={styles.playButtonWrapper}>
        <View style={styles.playButtonCircle}>
          <Play
            size={13}
            color="rgba(255, 255, 255, 0.85)"
            fill="rgba(255, 255, 255, 0.85)"
            style={styles.playIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161922",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 13,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
    borderColor: "rgba(68, 234, 195, 0.35)",
  },
  thumbnailWrapper: {
    width: 68,
    height: 68,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#0D1017",
    position: "relative",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  indexBadge: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "rgba(8, 10, 16, 0.82)",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
  },
  indexBadgeText: {
    color: "#44EAC3",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "monospace",
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  xpPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(68, 234, 195, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.35)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    marginBottom: 5,
  },
  xpPillText: {
    color: "#44EAC3",
    fontSize: 10.5,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "700",
    letterSpacing: 0.1,
    marginBottom: 4,
  },
  subtitleText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  playButtonWrapper: {
    paddingLeft: 12,
  },
  playButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    marginLeft: 2,
  },
});
