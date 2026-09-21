import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DEMO_WORKOUT_PATHS } from "../data/workoutPaths";
import { GymWorkoutPathCard } from "./GymWorkoutPathCard";
import { PullDayScreen } from "./PullDayScreen";
import { PushDayScreen } from "./PushDayScreen";
import { WorkoutHeader } from "./WorkoutHeader";
import { WorkoutLibraryScreen } from "./WorkoutLibraryScreen";

export interface GymWorkoutPathScreenProps {
  onSelectPath?: (pathId: "push" | "pull" | "library") => void;
}

export const GymWorkoutPathScreen: React.FC<GymWorkoutPathScreenProps> = ({
  onSelectPath,
}) => {
  const insets = useSafeAreaInsets();
  const [activePath, setActivePath] = useState<string | null>(null);

  const handleCardPress = (pathId: "push" | "pull" | "library") => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    setActivePath(pathId);

    if (onSelectPath) {
      onSelectPath(pathId);
    }
  };

  if (activePath === "push") {
    return <PushDayScreen onBack={() => setActivePath(null)} />;
  }

  if (activePath === "pull") {
    return <PullDayScreen onBack={() => setActivePath(null)} />;
  }

  if (activePath === "library") {
    return <WorkoutLibraryScreen onBack={() => setActivePath(null)} />;
  }

  return (
    <View style={styles.screen}>
      {/* Background */}
      <View style={styles.bgContainer} pointerEvents="none">
        <View style={[styles.bgImage, { backgroundColor: "#070A11" }]} />
        <Image
          source={require("../../../../assets/bg/gymWorkoutBg.png")}
          style={styles.bgImage}
          contentFit="cover"
          transition={150}
        />
      </View>
      <WorkoutHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom + 24, 40),
          },
        ]}
      >
        {/* Title Header Section */}
        <View style={styles.titleSection}>
          <Text style={styles.categoryBadge}>GYM WORKOUT</Text>
          <Text style={styles.mainTitle}>{"SELECT YOUR\nPATH"}</Text>
          <Text style={styles.subtitle}>
            Choose your focus for today's session.
          </Text>
        </View>

        {/* Workout Path Cards*/}
        <View style={styles.cardsColumn}>
          {DEMO_WORKOUT_PATHS.map((item) => (
            <GymWorkoutPathCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              bgImage={item.bgImage}
              circleGlow={item.circleGlow}
              gradientColors={item.gradientColors}
              gradientLocations={item.gradientLocations}
              gradientStart={item.gradientStart}
              gradientEnd={item.gradientEnd}
              gradientStyle={item.gradientStyle}
              isActive={activePath === item.id}
              onPress={() => handleCardPress(item.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#070A11",
  },
  bgContainer: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  titleSection: {
    marginBottom: 28,
  },
  categoryBadge: {
    fontFamily: Platform.select({
      web: "'JetBrains Mono', monospace",
      default: "JetBrainsMono_700Bold",
    }),
    color: "#44EAC3",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
  },
  cardsColumn: {
    gap: 16,
  },
});
