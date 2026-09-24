import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const PlanCard = () => {
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, { justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckCircle size={16} color="#2DD4BF" />
          <Text style={[styles.cardTitle, { marginLeft: 8 }]}>PLAN</Text>
        </View>
        <View style={styles.activePill}>
          <Text style={styles.activePillText}>ACTIVE</Text>
        </View>
      </View>
      <View style={styles.planContent}>
        <Text style={styles.planName}>KINETQX PREMIUM</Text>
        <Text style={styles.planDate}>Renewal: Dec 12, 2024</Text>
      </View>
      <Pressable style={styles.buttonWrapper}>
        <LinearGradient
          colors={["#0284C7", "#38BDF8"]}
          style={styles.btnGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.btnText}>MANAGE PLAN</Text>
        </LinearGradient>
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
  activePill: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activePillText: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "800",
  },
  planContent: {
    marginBottom: 20,
  },
  planName: {
    color: "#38BDF8",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  planDate: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "500",
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  btnGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
