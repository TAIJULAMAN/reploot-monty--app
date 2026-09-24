import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { MacrosGrid } from "./MacrosGrid";
import { NutritionRingCard } from "./NutritionRingCard";

export const NutritionDashboardCard = () => {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["rgba(32, 68, 117, 0.7)", "transparent"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0.8 }}
      />

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.headerDot} />
          <Text style={styles.headerTitle}>Today's Nutrition</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerLink}>View Nutrition</Text>
          <ArrowRight size={16} color="#38EDD8" strokeWidth={2.5} />
        </View>
      </View>
      <NutritionRingCard />
      <MacrosGrid />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#11131A",
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#38EDD8",
    shadowColor: "#38EDD8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  headerTitle: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerLink: {
    color: "#38EDD8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "monospace",
  },
});
