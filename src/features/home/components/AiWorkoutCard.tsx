import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight, Clock } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

const bgAsset = require("../../../../assets/upperBody/upperBodyStrength.png");

export const AiWorkoutCard = () => {
  const router = useRouter();
  const [modality, setModality] = useState<"GYM" | "HOME">("GYM");

  const handleToggle = (nextModality: "GYM" | "HOME") => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setModality(nextModality);
  };

  const handleStartWorkout = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    router.push({
      pathname: "/workouts",
      params: { modality: modality.toLowerCase() },
    });
  };

  return (
    <View style={styles.cardContainer}>
      <Image
        source={bgAsset}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={[
          "rgba(7, 10, 17, 0.45)",
          "rgba(7, 10, 17, 0.8)",
          "rgba(7, 10, 17, 0.96)",
        ]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Top Badges */}
        <View style={styles.badgesRow}>
          <View style={styles.badgeSolid}>
            <Text style={styles.badgeSolidText}>INTERMEDIATE</Text>
          </View>
          <View style={styles.badgeOutline}>
            <Text style={styles.badgeOutlineText}>420 KCAL</Text>
          </View>
          <View style={styles.badgeGreenOutline}>
            <Text style={styles.badgeGreenOutlineText}>+120 XP</Text>
          </View>
        </View>

        {/* Workout Info */}
        <View style={styles.workoutInfoBlock}>
          <Text style={styles.workoutSubtext}>TODAY'S AI WORKOUT</Text>

          <Text style={styles.workoutTitle} numberOfLines={1}>
            UPPER BODY STRENGTH
          </Text>

          <View style={styles.durationRow}>
            <Clock size={13} color="#38EDD8" strokeWidth={2.5} />
            <Text style={styles.durationText}>45 MIN SESSION</Text>
          </View>
        </View>

        {/* Gym / Home Toggle */}
        <View style={styles.toggleRow}>
          <Pressable
            style={styles.toggleWrapper}
            onPress={() => handleToggle("GYM")}
            accessibilityRole="button"
          >
            <View
              style={[
                styles.togglePill,
                modality === "GYM" && styles.togglePillActive,
              ]}
            >
              <Text
                style={[
                  styles.togglePillText,
                  modality === "GYM" && styles.togglePillTextActive,
                ]}
              >
                GYM
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.toggleWrapper}
            onPress={() => handleToggle("HOME")}
            accessibilityRole="button"
          >
            <View
              style={[
                styles.togglePill,
                modality === "HOME" && styles.togglePillActive,
              ]}
            >
              <Text
                style={[
                  styles.togglePillText,
                  modality === "HOME" && styles.togglePillTextActive,
                ]}
              >
                HOME
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Start Button */}
        <Pressable
          onPress={handleStartWorkout}
          accessibilityRole="button"
        >
          <View style={styles.actionButton}>
            <LinearGradient
              colors={["#00a8e8", "#007ea7"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>START WORKOUT</Text>
              <ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />
            </LinearGradient>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#11141C",
    borderRadius: 24,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    position: "relative",
  },
  content: {
    padding: 22,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  badgeSolid: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.35)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeSolidText: {
    color: "#C5C0FF",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  badgeOutline: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeOutlineText: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  badgeGreenOutline: {
    backgroundColor: "rgba(56, 237, 216, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeGreenOutlineText: {
    color: "#38EDD8",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  workoutInfoBlock: {
    marginBottom: 18,
  },
  workoutSubtext: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  workoutTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  durationText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  toggleWrapper: {
    flex: 1,
  },
  togglePill: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    alignItems: "center",
    justifyContent: "center",
  },
  togglePillActive: {
    backgroundColor: "rgba(0, 242, 254, 0.08)",
    borderColor: "#00f2fe",
    borderWidth: 1.5,
  },
  togglePillText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  togglePillTextActive: {
    color: "#00f2fe",
    fontWeight: "800",
  },
  pillPressed: {
    opacity: 0.8,
  },
  actionButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
});
