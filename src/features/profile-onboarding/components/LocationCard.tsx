import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckCircleIcon } from "./CheckCircleIcon";

export interface LocationCardProps {
  isSelected: boolean;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const LocationCard = ({
  isSelected,
  icon,
  title,
  subtitle,
}: LocationCardProps) => {
  if (isSelected) {
    return (
      <LinearGradient
        colors={["#6C5CFF", "#5FFFD7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardActiveGradient}
      >
        <View style={styles.cardActiveInner}>
          <View style={styles.iconSquare}>{icon}</View>
          <View style={styles.locationTextGroup}>
            <Text style={[styles.locationTitle, styles.locationTitleActive]}>
              {title}
            </Text>
            <Text style={styles.locationSubtitle}>{subtitle}</Text>
          </View>
          <View style={styles.badgeContainer}>
            <CheckCircleIcon color="#2DD4BF" />
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.cardInactive}>
      <View style={styles.iconSquare}>{icon}</View>
      <View style={styles.locationTextGroup}>
        <Text style={styles.locationTitle}>{title}</Text>
        <Text style={styles.locationSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardInactive: {
    width: "100%",
    height: 94,
    borderRadius: 24,
    backgroundColor: "#11141C",
    borderWidth: 1.4,
    borderColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  cardActiveGradient: {
    width: "100%",
    height: 94,
    borderRadius: 24,
    padding: 2,
  },
  cardActiveInner: {
    flex: 1,
    width: "100%",
    backgroundColor: "#161D27",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  iconSquare: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  locationTextGroup: {
    flex: 1,
  },
  locationTitle: {
    color: "#CBD5E1",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  locationTitleActive: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  locationSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "400",
  },
  badgeContainer: {
    marginLeft: 8,
    marginRight: 4,
  },
});
