import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const PlanCard = () => {
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, { justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../../../assets/check.svg")}
            style={{ width: 16, height: 16 }}
            contentFit="contain"
          />
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
      <Pressable
        style={({ pressed }) => [
          styles.buttonWrapper,
          pressed && { opacity: 0.8 },
        ]}
      >
        <LinearGradient
          colors={["#3568A5", "#4B85C4", "#69A6E3"]}
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
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
    marginLeft: 8,
  },
  activePill: {
    backgroundColor: "#C5C0FF30",
    paddingHorizontal: 10,
    borderColor: "#C5C0FF",
    paddingVertical: 4,
    borderRadius: 12,
  },
  activePillText: {
    color: "#C5C0FF",
    fontSize: 10,
    fontWeight: "800",
  },
  planContent: {
    marginBottom: 20,
  },
  planName: {
    color: "#38BDF8",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
  },
  planDate: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
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
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
});
