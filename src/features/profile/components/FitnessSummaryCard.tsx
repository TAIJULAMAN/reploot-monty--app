import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export const FitnessSummaryCard = () => {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, { justifyContent: "space-between" }]}>
        <Text style={[styles.cardTitle, { marginLeft: 0 }]}>
          FITNESS SUMMARY
        </Text>
        <Image
          source={require("../../../../assets/fitness.svg")}
          style={{ width: 24, height: 24 }}
          contentFit="contain"
        />
      </View>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>WEIGHT</Text>
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
            45,200 <Text style={styles.summaryUnit2}>kcal</Text>
          </Text>
        </View>
      </View>
      <Pressable style={styles.darkBtn} onPress={() => router.push("/profile/fitness-profile")}>
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
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
    color: "#fff",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryValueWhite: {
    color: "#44EAC3",
    fontSize: 18,
    fontWeight: "400",
  },
  summaryValueTeal: {
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },
  summaryValuePurple: {
    color: "#44EAC3",
    fontSize: 18,
    fontWeight: "400",
  },
  summaryValueOrange: {
    color: "#FF8E80",
    fontSize: 18,
    fontWeight: "400",
  },
  summaryUnit: {
    color: "#44EAC3 ",
    fontSize: 12,
    fontWeight: "400",
  },
  summaryUnit2: {
    color: "#FF8E80",
    fontSize: 12,
    fontWeight: "400",
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
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
  },
});
