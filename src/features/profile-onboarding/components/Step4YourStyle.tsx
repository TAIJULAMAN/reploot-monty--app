import { WorkoutStyle } from "@/shared/types/user";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";

function GymDumbbellIcon({ color = "#FB923C" }: { color?: string }) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="m6.5 6.5 11 11" />
      <Path d="m21 21-1-1" />
      <Path d="m3 3 1 1" />
      <Path d="m18 22 4-4" />
      <Path d="m2 6 4-4" />
      <Path d="m3 10 7-7" />
      <Path d="m14 21 7-7" />
    </Svg>
  );
}
function HomeRoofIcon({ color = "#C4B5FD" }: { color?: string }) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <Path d="M9 22V12h6v10" />
    </Svg>
  );
}
function CheckCircleIcon({ color = "#2DD4BF" }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
      <Path
        d="M8 12.5L10.5 15L16 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
function TitleSparkleCluster() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        d="M14 2C14 7 18 11 23 11C18 11 14 15 14 20C14 15 10 11 5 11C10 11 14 7 14 2Z"
        fill="#2DD4BF"
        opacity="0.8"
      />
      <Path
        d="M21 16C21 18 22.5 19.5 24.5 19.5C22.5 19.5 21 21 21 23C21 21 19.5 19.5 17.5 19.5C19.5 19.5 21 18 21 16Z"
        fill="#2DD4BF"
        opacity="0.5"
      />
    </Svg>
  );
}

const DAY_ROWS: number[][] = [
  [2, 3, 4],
  [5, 6, 7],
];

interface DayPillItemProps {
  days: number;
  isSelected: boolean;
  pillWidth: number;
  onSelect: (days: number) => void;
}

const DayPillItem = React.memo(
  ({ days, isSelected, pillWidth, onSelect }: DayPillItemProps) => {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        unstable_pressDelay={0}
        hitSlop={6}
        onPress={() => onSelect(days)}
        style={({ pressed }) => [
          { width: pillWidth },
          pressed && styles.pressed,
        ]}
      >
        {isSelected ? (
          <LinearGradient
            colors={["#38BDF8", "#3B82F6"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.dayPillActive, { width: pillWidth }]}
          >
            <Text style={styles.dayTextActive}>{days} Days</Text>
          </LinearGradient>
        ) : (
          <View style={[styles.dayPillInactive, { width: pillWidth }]}>
            <Text style={styles.dayTextInactive}>{days} Days</Text>
          </View>
        )}
      </Pressable>
    );
  },
);

export function Step4YourStyle() {
  const { width } = useWindowDimensions();
  const pillWidth = Math.floor((width - 40 - 24) / 3);

  const selectedStyle = useProfileSetupStore(
    (s) => s.data.workoutStyle || "gym",
  );
  const selectedDays = useProfileSetupStore(
    (s) => s.data.workoutDaysPerWeek || 3,
  );
  const updateData = useProfileSetupStore((s) => s.updateData);
  const nextStep = useProfileSetupStore((s) => s.nextStep);

  const handleSelectStyle = React.useCallback(
    (workoutStyle: WorkoutStyle) => {
      requestAnimationFrame(() => {
        try {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch {
          // ignore
        }
      });
      updateData({ workoutStyle });
    },
    [updateData],
  );

  const handleSelectDays = React.useCallback(
    (workoutDaysPerWeek: number) => {
      requestAnimationFrame(() => {
        try {
          void Haptics.selectionAsync();
        } catch {
          // ignore
        }
      });
      updateData({ workoutDaysPerWeek });
    },
    [updateData],
  );

  return (
    <View style={styles.container}>
      {/* Title & Sparkles */}
      <View style={styles.hero}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>YOUR</Text>
            <Text style={styles.title}>STYLE</Text>
          </View>
          <View style={styles.sparkleWrap}>
            <TitleSparkleCluster />
          </View>
        </View>
        <Text style={styles.subtitle}>Where do you usually work out?</Text>
      </View>

      {/* 2 Location Cards: GYM vs HOME */}
      <View style={styles.locationGroup}>
        {/* GYM Card */}
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: selectedStyle === "gym" }}
          unstable_pressDelay={0}
          hitSlop={6}
          onPress={() => handleSelectStyle("gym")}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <View
            style={[
              styles.locationCard,
              selectedStyle === "gym"
                ? styles.locationCardActive
                : styles.locationCardInactive,
            ]}
          >
            {/* Square Icon Container */}
            <View style={styles.iconSquare}>
              <GymDumbbellIcon color="#FB923C" />
            </View>

            <View style={styles.locationTextGroup}>
              <Text
                style={[
                  styles.locationTitle,
                  selectedStyle === "gym" && styles.locationTitleActive,
                ]}
              >
                GYM
              </Text>
              <Text style={styles.locationSubtitle}>Full equipment access</Text>
            </View>

            {selectedStyle === "gym" && (
              <View style={styles.badgeContainer}>
                <CheckCircleIcon color="#2DD4BF" />
              </View>
            )}
          </View>
        </Pressable>

        {/* HOME Card */}
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: selectedStyle === "home" }}
          unstable_pressDelay={0}
          hitSlop={6}
          onPress={() => handleSelectStyle("home")}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <View
            style={[
              styles.locationCard,
              selectedStyle === "home"
                ? styles.locationCardActive
                : styles.locationCardInactive,
            ]}
          >
            {/* Square Icon Container */}
            <View style={styles.iconSquare}>
              <HomeRoofIcon color="#C4B5FD" />
            </View>

            <View style={styles.locationTextGroup}>
              <Text
                style={[
                  styles.locationTitle,
                  selectedStyle === "home" && styles.locationTitleActive,
                ]}
              >
                HOME
              </Text>
              <Text style={styles.locationSubtitle}>Bodyweight & basics</Text>
            </View>

            {selectedStyle === "home" && (
              <View style={styles.badgeContainer}>
                <CheckCircleIcon color="#2DD4BF" />
              </View>
            )}
          </View>
        </Pressable>
      </View>

      {/* Workout Days / week Section */}
      <View style={styles.frequencySection}>
        <Text style={styles.frequencyTitle}>Workout Days / week</Text>

        <View style={styles.daysGrid}>
          {DAY_ROWS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.pillsRow}>
              {row.map((days) => (
                <DayPillItem
                  key={days}
                  days={days}
                  isSelected={selectedDays === days}
                  pillWidth={pillWidth}
                  onSelect={handleSelectDays}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Continue CTA */}
      <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },
  hero: {
    marginTop: 2,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -0.5,
    fontStyle: "italic",
    textShadowColor: "rgba(95, 255, 215, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  sparkleWrap: {
    paddingBottom: 6,
    paddingRight: 10,
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
  },
  locationGroup: {
    gap: 14,
    marginBottom: 24,
  },
  locationCard: {
    width: "100%",
    height: 88,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  locationCardInactive: {
    backgroundColor: "#111823",
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  locationCardActive: {
    backgroundColor: "#102331",
    borderWidth: 2,
    borderColor: "#2DD4BF",
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  iconSquare: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  locationTextGroup: {
    flex: 1,
  },
  locationTitle: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  locationTitleActive: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  locationSubtitle: {
    color: "#64748B",
    fontSize: 12.5,
    fontWeight: "500",
  },
  badgeContainer: {
    marginRight: 4,
  },
  frequencySection: {
    marginBottom: 20,
  },
  frequencyTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 14,
  },
  daysGrid: {
    width: "100%",
    gap: 12,
  },
  pillsRow: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  pillPressable: {
    flex: 1,
    height: 48,
  },
  dayPillActive: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 4,
  },
  dayPillInactive: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "#111823",
    alignItems: "center",
    justifyContent: "center",
  },
  dayTextActive: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  dayTextInactive: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});
