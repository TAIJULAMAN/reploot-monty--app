import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function StandingCard() {
  return (
    <View style={styles.standingCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.iconBadge}>
            <Image
              source={require("../../../assets/trophy.svg")}
              style={{ width: 14, height: 14 }}
              contentFit="contain"
            />
          </View>
          <Text style={styles.cardTitle}>YOUR STANDING</Text>
        </View>
        <View style={styles.tierPill}>
          <View style={styles.tierDot} />
          <Text style={styles.tierText}>TOP 5% ATHLETE</Text>
        </View>
      </View>

      {/* Main Rank Highlight */}
      <View style={styles.rankContent}>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>#42</Text>
          <Text style={styles.rankGlobal}>GLOBAL</Text>
        </View>
        <View style={styles.percentileBadge}>
          <Text style={styles.rankSub}>TOP 5% OF GLOBAL ATHLETES</Text>
        </View>
      </View>

      {/* Telemetry Metrics */}
      <View style={styles.telemetryContainer}>
        <View style={styles.telemetryRow}>
          <View>
            <Text style={styles.telemetryLabel}>SEASON XP</Text>
            <Text style={styles.telemetryValue}>14,250 XP</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.telemetryLabel}>NEXT MILESTONE</Text>
            <Text style={styles.telemetryTarget}>350 XP TO NEXT TIER</Text>
          </View>
        </View>

        {/* Progress Track */}
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { width: "78%" }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  standingCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  tierPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tierDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2DD4BF",
    marginRight: 5,
  },
  tierText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  rankContent: {
    alignItems: "center",
    marginBottom: 16,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  rankNumber: {
    color: "#FFB68C",
    fontSize: 48,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: -1,
    textShadowColor: "rgba(249, 115, 22, 0.35)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  rankGlobal: {
    color: "#FFB68C",
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    marginLeft: 10,
  },
  percentileBadge: {
    backgroundColor: "rgba(45, 212, 191, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.25)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  rankSub: {
    color: "#2DD4BF",
    fontSize: 11,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  telemetryContainer: {
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 14,
  },
  telemetryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  telemetryLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  telemetryValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  telemetryTarget: {
    color: "#38EDD8",
    fontSize: 12,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 3,
    overflow: "hidden",
  },
});
