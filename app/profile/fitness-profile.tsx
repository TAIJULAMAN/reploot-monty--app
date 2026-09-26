import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhysicalMetrics } from "./components/PhysicalMetrics";
import { FitnessGoal } from "./components/FitnessGoal";
import { ActivityLevel } from "./components/ActivityLevel";

export default function FitnessProfileRoute() {
  const insets = useSafeAreaInsets();
  const [selectedGoal, setSelectedGoal] = useState("build_muscle");
  const [activityLevel, setActivityLevel] = useState("intermediate");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#161722", "#0B0D14"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={{ paddingTop: insets.top }}>
        <CustomHeader
          titleVariant="text"
          title=""
          showBackButton={true}
          showSearch={true}
          showNotifications={true}
          showAvatar={true}
          transparent={true}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>FITNESS{"\n"}PROFILE</Text>

        <PhysicalMetrics />
        <FitnessGoal
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
        />
        <ActivityLevel
          activityLevel={activityLevel}
          setActivityLevel={setActivityLevel}
        />

        <Pressable style={styles.saveBtn}>
          <LinearGradient
            colors={["#4B85C4", "#69A6E3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.saveGradient}
          >
            <Text style={styles.saveBtnText}>SAVE FITNESS PROFILE</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D14",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 30,
    textShadowColor: "rgba(255, 255, 255, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    lineHeight: 44,
  },
  saveBtn: {
    marginTop: 16,
    borderRadius: 24,
    overflow: "hidden",
  },
  saveGradient: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
