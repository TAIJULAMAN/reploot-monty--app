import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";

interface ActivityLevelProps {
  activityLevel: string;
  setActivityLevel: (level: string) => void;
}

export function ActivityLevel({
  activityLevel,
  setActivityLevel,
}: ActivityLevelProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Image source={require("../../../assets/activityLevel.svg")} style={{ width: 16, height: 16, marginRight: 8 }} contentFit="contain" />
        <Text style={styles.sectionTitle}>ACTIVITY LEVEL</Text>
      </View>

      <View style={styles.activityContainer}>
        {["beginner", "intermediate", "advanced"].map((level) => {
          const isSelected = activityLevel === level;
          return (
            <Pressable
              key={level}
              style={[
                styles.activityBtn,
                isSelected && styles.activityBtnSelected,
              ]}
              onPress={() => setActivityLevel(level)}
            >
              <Text
                style={[
                  styles.activityText,
                  isSelected && styles.activityTextSelected,
                ]}
              >
                {level.toUpperCase()}
              </Text>
            </Pressable>
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
    backgroundColor: "#3A4341",
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
