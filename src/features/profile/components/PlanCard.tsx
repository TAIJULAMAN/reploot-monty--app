import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export const PlanCard = () => {
  const router = useRouter();

  const handleManagePlan = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    router.push("/profile/manage-plan");
  };

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
        <Text style={styles.planName}>REPLOOT PREMIUM</Text>
        <Text style={styles.planDate}>Renewal: Dec 12, 2026</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.buttonWrapper,
          pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        ]}
        onPress={handleManagePlan}
      >
        <LinearGradient
          colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
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
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
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
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 2,
    marginLeft: 8,
  },
  activePill: {
    backgroundColor: "rgba(45, 212, 191, 0.15)",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.35)",
    paddingVertical: 4,
    borderRadius: 12,
  },
  activePillText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  planContent: {
    marginBottom: 20,
  },
  planName: {
    color: "#38BDF8",
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1,
    marginBottom: 4,
  },
  planDate: {
    color: "#94A3B8",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "500",
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 16,
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
    fontFamily: "monospace",
    letterSpacing: 1.2,
  },
});
