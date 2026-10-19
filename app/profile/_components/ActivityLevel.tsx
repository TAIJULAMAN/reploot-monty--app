import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ActivityLevelProps {
  activityLevel: string;
  setActivityLevel: (level: string) => void;
}

export function ActivityLevel({
  activityLevel,
  setActivityLevel,
}: ActivityLevelProps) {
  const handleSelect = (level: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setActivityLevel(level);
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Image
          source={require("../../../assets/activityLevel.svg")}
          style={{ width: 16, height: 16, marginRight: 8 }}
          contentFit="contain"
        />
        <Text style={styles.sectionTitle}>ACTIVITY LEVEL</Text>
      </View>

      <View style={styles.activityContainer}>
        {["beginner", "intermediate", "advanced"].map((level) => {
          const isSelected = activityLevel === level;
          return (
            <TouchableOpacity
              key={level}
              activeOpacity={0.75}
              style={[
                styles.activityBtn,
                isSelected && styles.activityBtnSelected,
              ]}
              onPress={() => handleSelect(level)}
            >
              <Text
                style={[
                  styles.activityText,
                  isSelected && styles.activityTextSelected,
                ]}
              >
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 2,
  },
  activityContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 24,
    padding: 4,
  },
  activityBtn: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  activityBtnSelected: {
    backgroundColor: "#0284C7",
  },
  activityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 1,
  },
  activityTextSelected: {
    color: "#FFFFFF",
  },
});
