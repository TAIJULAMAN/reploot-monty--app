import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function StandingCard() {
  return (
    <LinearGradient
      colors={["rgba(30, 32, 48, 0.9)", "rgba(18, 19, 28, 0.9)"]}
      style={styles.standingCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.standingHeader}>
        <View>
          <Text style={styles.standingLabel}>YOUR STANDING</Text>
          <Text style={styles.standingRank}>
            #42{"\n"}
            <Text style={styles.globalText}>GLOBAL</Text>
          </Text>
        </View>
        <View style={styles.standingRight}>
          <Text style={styles.userName}>Alex Rivers</Text>
          <Text style={styles.userTier}>TOP 5% OF{"\n"}ATHLETES</Text>
        </View>
      </View>

      <View style={styles.xpInfo}>
        <Text style={styles.xpText}>14,250 XP</Text>
        <Text style={styles.xpNextTier}>350 XP TO NEXT TIER</Text>
      </View>

      <View style={styles.progressBarBg}>
        <LinearGradient
          colors={["#6366F1", "#38EDD8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarFill, { width: "70%" }]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  standingCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.8)",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 25,
    elevation: 15,
  },
  standingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  standingLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  standingRank: {
    color: "#FFB68C",
    fontSize: 38,
    fontWeight: "800",
    textShadowColor: "rgba(255, 182, 140, 1)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  globalText: {
    color: "#FFB68C",
    fontSize: 38,
    fontWeight: "800",
    textShadowColor: "rgba(255, 182, 140, 1)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  standingRight: {
    alignItems: "flex-end",
  },
  userName: {
    color: "#E2E8F0",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 16,
  },
  userTier: {
    color: "#C5C0FF",
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 1.5,
    textAlign: "right",
    lineHeight: 24,
  },
  xpInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  xpText: {
    color: "#CBD5E1",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 1,
  },
  xpNextTier: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 1,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
