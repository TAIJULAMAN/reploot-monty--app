import { ActivityLevel } from "@/shared/types/user";
import { Zap } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityOptionItem } from "./ActivityOptionItem";

const ACTIVITY_OPTIONS: {
  id: ActivityLevel;
  title: string;
  subtitle: string;
}[] = [
  {
    id: "beginner",
    title: "Beginner",
    subtitle: "0-1 workouts / week",
  },
  {
    id: "moderately_active",
    title: "Moderately Active",
    subtitle: "2-4 workouts / week",
  },
  {
    id: "very_active",
    title: "Very Active",
    subtitle: "5+ workouts / week",
  },
];

interface ActivityLevelCardProps {
  activityLevel: ActivityLevel;
  onSelectActivity: (level: ActivityLevel) => void;
}

export function ActivityLevelCard({
  activityLevel,
  onSelectActivity,
}: ActivityLevelCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleGroup}>
          <Zap
            size={16}
            color="#2DD4BF"
            fill="#2DD4BF"
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>ACTIVITY LEVEL</Text>
        </View>
      </View>

      <View style={styles.activityList}>
        {ACTIVITY_OPTIONS.map((opt) => (
          <ActivityOptionItem
            key={opt.id}
            id={opt.id}
            title={opt.title}
            subtitle={opt.subtitle}
            isSelected={activityLevel === opt.id}
            onSelect={onSelectActivity}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    backgroundColor: "#1A1C23",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 9,
  },
  headerTitle: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
  },
  activityList: {
    gap: 10,
    marginTop: 8,
    marginBottom: 4,
  },
});
