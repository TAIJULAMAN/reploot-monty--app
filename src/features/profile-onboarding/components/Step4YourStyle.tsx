import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check, Dumbbell, Home } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { WorkoutStyle } from "@/shared/types/user";

export function Step4YourStyle() {
  const { data, updateData, nextStep } = useProfileSetupStore();

  const handleSelectStyle = (workoutStyle: WorkoutStyle) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    updateData({ workoutStyle });
  };

  const handleSelectDays = (workoutDaysPerWeek: number) => {
    try {
      Haptics.selectionAsync();
    } catch {
      // ignore
    }
    updateData({ workoutDaysPerWeek });
  };

  const daysOptions = [2, 3, 4, 5, 6, 7];

  return (
    <View style={styles.container}>
      {/* Title with cyan neon bloom */}
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.title}>STYLE</Text>
        <Text style={styles.subtitle}>Where do you usually work out?</Text>
      </View>

      {/* 2 Location Cards: GYM vs HOME */}
      <View style={styles.locationGroup}>
        {/* GYM Card */}
        <Pressable
          accessibilityRole="button"
          onPress={() => handleSelectStyle("gym")}
          style={({ pressed }) => [
            styles.locationCard,
            data.workoutStyle === "gym" && styles.locationCardActive,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.locationIconWrap}>
            <Dumbbell size={22} color="#FF9A5A" strokeWidth={2.2} />
          </View>

          <View style={styles.locationTextGroup}>
            <Text style={styles.locationTitle}>GYM</Text>
            <Text style={styles.locationSubtitle}>Full equipment access</Text>
          </View>

          {data.workoutStyle === "gym" ? (
            <View style={styles.checkBadge}>
              <Check size={14} color="#0F1015" strokeWidth={3} />
            </View>
          ) : (
            <View style={styles.emptyRadio} />
          )}
        </Pressable>

        {/* HOME Card */}
        <Pressable
          accessibilityRole="button"
          onPress={() => handleSelectStyle("home")}
          style={({ pressed }) => [
            styles.locationCard,
            data.workoutStyle === "home" && styles.locationCardActive,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.locationIconWrap}>
            <Home size={22} color="#C5C0FF" strokeWidth={2.2} />
          </View>

          <View style={styles.locationTextGroup}>
            <Text style={styles.locationTitle}>HOME</Text>
            <Text style={styles.locationSubtitle}>Bodyweight & basics</Text>
          </View>

          {data.workoutStyle === "home" ? (
            <View style={styles.checkBadge}>
              <Check size={14} color="#0F1015" strokeWidth={3} />
            </View>
          ) : (
            <View style={styles.emptyRadio} />
          )}
        </Pressable>
      </View>

      {/* Workout Days / Week Section */}
      <View style={styles.frequencySection}>
        <Text style={styles.frequencyTitle}>Workout Days / week</Text>

        <View style={styles.daysGrid}>
          {daysOptions.map((days) => {
            const isSelected = data.workoutDaysPerWeek === days;

            return (
              <Pressable
                key={days}
                accessibilityRole="button"
                onPress={() => handleSelectDays(days)}
                style={({ pressed }) => [
                  styles.dayPill,
                  pressed && styles.pressed,
                ]}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={["#4474A8", "#558DC2", "#6EA8E4"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.dayPillGradient}
                  >
                    <Text style={styles.dayTextActive}>{days} Days</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.dayPillInactive}>
                    <Text style={styles.dayTextInactive}>{days} Days</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Continue CTA */}
      <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  hero: {
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(95, 255, 215, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  subtitle: {
    color: "#B0AEC2",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
  locationGroup: {
    gap: 12,
    marginBottom: 28,
  },
  locationCard: {
    height: 84,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  locationCardActive: {
    borderColor: "#44EAC3",
    backgroundColor: "rgba(68, 234, 195, 0.1)",
    shadowColor: "#44EAC3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  locationIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  locationTextGroup: {
    flex: 1,
  },
  locationTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 3,
  },
  locationSubtitle: {
    color: "#918EA1",
    fontSize: 12,
    fontWeight: "500",
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#44EAC3",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  frequencySection: {
    marginBottom: 12,
  },
  frequencyTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  dayPill: {
    width: "31%",
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  dayPillGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  dayPillInactive: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  dayTextActive: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  dayTextInactive: {
    color: "#D0CCDD",
    fontSize: 13,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
