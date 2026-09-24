import { Trophy } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const CommunityRankCard = () => {
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, { justifyContent: "space-between" }]}>
        <Text style={[styles.cardTitle, { marginLeft: 0 }]}>
          COMMUNITY RANK
        </Text>
        <Trophy size={16} color="#F97316" />
      </View>
      <View style={styles.rankContent}>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>#42</Text>
          <Text style={styles.rankGlobal}>GLOBAL</Text>
        </View>
        <Text style={styles.rankSub}>TOP 5% OF ATHLETES</Text>
      </View>
      <Pressable style={styles.darkBtn}>
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
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
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
    color: "#F97316",
    fontSize: 48,
    fontWeight: "900",
    textShadowColor: "rgba(249,115,22,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  rankGlobal: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 8,
  },
  rankSub: {
    color: "#2DD4BF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
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
