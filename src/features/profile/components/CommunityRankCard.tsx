import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export const CommunityRankCard = () => {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, { justifyContent: "space-between" }]}>
        <Text style={[styles.cardTitle, { marginLeft: 0 }]}>
          COMMUNITY RANK
        </Text>
        <Image
          source={require("../../../../assets/badge.svg")}
          style={{ width: 24, height: 24 }}
          contentFit="contain"
        />
      </View>
      <View style={styles.rankContent}>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>#42</Text>
          <Text style={styles.rankGlobal}>GLOBAL</Text>
        </View>
        <Text style={styles.rankSub}>TOP 5% OF ATHLETES</Text>
      </View>
      <Pressable style={styles.darkBtn} onPress={() => router.push("/profile/global-rankings")}>
        <Text style={styles.darkBtnText}>VIEW LEADERBOARD</Text>
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
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
    marginLeft: 8,
  },
  rankContent: {
    alignItems: "center",
    marginBottom: 20,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 4,
  },
  rankNumber: {
    color: "#FFB68C",
    fontSize: 48,
    fontWeight: "600",
    textShadowColor: "rgba(249,115,22,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  rankGlobal: {
    color: "#FFB68C",
    fontSize: 24,
    fontWeight: "400",
    marginLeft: 8,
  },
  rankSub: {
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
  darkBtn: {
    borderWidth: 1,
    borderColor: "#C5C0FF",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  darkBtnText: {
    color: "#C5C0FF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
});
