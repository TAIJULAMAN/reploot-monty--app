import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { MacrosGrid } from "./MacrosGrid";
import { NutritionRingCard } from "./NutritionRingCard";

export const NutritionDashboardCard = () => {
  const router = useRouter();

  const handleViewNutrition = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push("/nutrition");
  };

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["rgba(32, 68, 117, 0.35)", "transparent"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0.8 }}
      />

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MaskedView
            style={styles.maskedTitleView}
            maskElement={
              <View style={styles.maskWrapper}>
                <Text
                  style={styles.headerTitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  TODAY'S NUTRITION
                </Text>
              </View>
            }
          >
            <LinearGradient
              colors={["#00f2fe", "#4facfe"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          </MaskedView>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.headerRight,
            pressed && styles.pressed,
          ]}
          onPress={handleViewNutrition}
          accessibilityRole="button"
        >
          <Text style={styles.headerLink}>VIEW ALL</Text>
          <ArrowRight size={13} color="#38EDD8" strokeWidth={2.5} />
        </Pressable>
      </View>

      <NutritionRingCard />
      <MacrosGrid />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#11141C",
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  headerLeft: {
    flex: 1,
    height: 32,
    marginRight: 12,
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "rgba(56, 237, 216, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.2)",
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  headerLink: {
    color: "#38EDD8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "monospace",
  },
});
