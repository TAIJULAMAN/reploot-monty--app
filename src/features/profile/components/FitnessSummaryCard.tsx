import { Activity } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const FitnessSummaryCard = () => {
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, { justifyContent: "space-between" }]}>
        <Text style={[styles.cardTitle, { marginLeft: 0 }]}>
          FITNESS SUMMARY
        </Text>
        <Activity size={16} color="#2DD4BF" />
      </View>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>HEIGHT</Text>
          <Text style={styles.summaryValueWhite}>
            78 <Text style={styles.summaryUnit}>kg</Text>
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>GOAL</Text>
          <Text style={styles.summaryValueTeal}>BUILD{"\n"}MUSCLE</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>WORKOUTS</Text>
          <Text style={styles.summaryValuePurple}>127</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>CALORIES</Text>
          <Text style={styles.summaryValueOrange}>
            45,200 <Text style={styles.summaryUnit}>kcal</Text>
          </Text>
        </View>
      </View>
      <Pressable style={styles.darkBtn}>
        <Text style={styles.darkBtnText}>VIEW FITNESS PROFILE</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginLeft: 8,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },
  summaryBox: {
    width: "47%",
    backgroundColor: "#11141D",
    borderRadius: 16,
    padding: 16,
  },
  summaryLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryValueWhite: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  summaryValueTeal: {
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  summaryValuePurple: {
    color: "#A78BFA",
    fontSize: 18,
    fontWeight: "800",
  },
  summaryValueOrange: {
    color: "#F97316",
    fontSize: 18,
    fontWeight: "800",
  },
  summaryUnit: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  darkBtn: {
    backgroundColor: "#161B24",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  darkBtnText: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
});
