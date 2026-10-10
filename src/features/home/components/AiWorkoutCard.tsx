import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Clock } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const bgAsset = require("../../../../assets/upperBody/upperBodyStrength.png");

export const AiWorkoutCard = () => {
  const [modality, setModality] = useState<"GYM" | "HOME">("GYM");

  return (
    <View style={styles.cardContainer}>
      <Image
        source={bgAsset}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={[
          "rgba(7, 10, 17, 0.6)",
          "rgba(7, 10, 17, 0.8)",
          "rgba(7, 10, 17, 0.95)",
        ]}
        locations={[0, 0.5, 1]}
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
          <Text style={styles.workoutTitle}>UPPER BODY</Text>
          <Text style={styles.workoutTitle}>STRENGTH</Text>

          <View style={styles.durationRow}>
            <Clock size={12} color="#94A3B8" />
            <Text style={styles.durationText}>45 MIN SESSION</Text>
          </View>
        </View>

        {/* Gym / Home Toggle */}
        <View style={styles.toggleRow}>
          <Pressable
            style={[
              styles.togglePill,
              modality === "GYM" && styles.togglePillActive,
            ]}
            onPress={() => setModality("GYM")}
          >
            <Text
              style={[
                styles.togglePillText,
                modality === "GYM" && styles.togglePillTextActive,
              ]}
            >
              GYM
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.togglePill,
              modality === "HOME" && styles.togglePillActive,
            ]}
            onPress={() => setModality("HOME")}
          >
            <Text
              style={[
                styles.togglePillText,
                modality === "HOME" && styles.togglePillTextActive,
              ]}
            >
              HOME
            </Text>
          </Pressable>
        </View>

        {/* Start Button */}
        <Pressable style={styles.startButton}>
          <LinearGradient
            colors={["#4282BE", "#72ABE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButtonGradient}
          >
            <Text style={styles.startButtonText}>START WORKOUT</Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  content: {
    padding: 24,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  badgeSolid: {
    backgroundColor: "rgba(99, 102, 241, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSolidText: {
    color: "#C5C0FF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
  badgeOutline: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeOutlineText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
  badgeGreenOutline: {
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  badgeGreenOutlineText: {
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
  workoutInfoBlock: {
    marginBottom: 24,
  },
  workoutSubtext: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
  },
  workoutTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  durationText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  togglePill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "transparent",
  },
  togglePillActive: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  togglePillText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 1,
  },
  togglePillTextActive: {
    color: "#FFFFFF",
  },
  startButton: {
    borderRadius: 24,
    overflow: "hidden",
  },
  startButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
  },
});
