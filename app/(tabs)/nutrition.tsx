import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Camera, Droplet, Utensils, ChevronRight } from "lucide-react-native";
import { WorkoutHeader } from "@/features/workouts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function NutritionTabRoute() {
  const [waterInput, setWaterInput] = useState("");

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <WorkoutHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleGlow}>FUEL</Text>
            {"\n"}
            <Text style={styles.heroTitleGlow}>YOURSELF</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Eat smarter with AI-powered{"\n"}nutrition tracking.
          </Text>
        </View>

        {/* Daily Budget Card */}
        <LinearGradient
          colors={["#2A2A38", "#181820"]}
          style={styles.cardBorder}
        >
          <View style={styles.cardInner}>
            <Text style={styles.cardSubtitleCenter}>DAILY BUDGET</Text>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetMain}>1,850</Text>
              <Text style={styles.budgetTotal}> / 2,300</Text>
            </View>
            <Text style={styles.budgetLabel}>KCAL REMAINING</Text>

            <View style={styles.macrosRow}>
              <View style={[styles.macroBox, { borderColor: "#6C5CFF" }]}>
                <Text style={[styles.macroLabel, { color: "#6C5CFF" }]}>
                  PROTEIN
                </Text>
                <Text style={styles.macroValue}>120g</Text>
              </View>
              <View style={[styles.macroBox, { borderColor: "#F29C38" }]}>
                <Text style={[styles.macroLabel, { color: "#F29C38" }]}>
                  CARBS
                </Text>
                <Text style={styles.macroValue}>180g</Text>
              </View>
              <View style={[styles.macroBox, { borderColor: "#F2385A" }]}>
                <Text style={[styles.macroLabel, { color: "#F2385A" }]}>
                  FAT
                </Text>
                <Text style={styles.macroValue}>55g</Text>
              </View>
            </View>

            <Pressable onPress={() => router.push("/scan-meal")}>
              <LinearGradient
                colors={["#2D76A8", "#38A1D6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scanButton}
              >
                <Camera color="#FFFFFF" size={18} />
                <Text style={styles.scanButtonText}>SCAN TODAY'S MEAL</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </LinearGradient>

        {/* Water Intake Card */}
        <Pressable onPress={() => router.push("/drink-water")}>
          <LinearGradient
            colors={["#183B42", "#181820"]}
            style={styles.cardBorder}
          >
            <View style={styles.cardInner}>
              <View style={styles.waterHeaderRow}>
                <Text style={styles.waterTitle}>WATER INTAKE</Text>
                <View style={styles.hydratedBadge}>
                  <Text style={styles.hydratedText}>HYDRATED</Text>
                </View>
              </View>

              <View style={styles.ringContainer}>
                <LinearGradient
                  colors={["#2EE8B3", "#38A1D6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.ringOuter}
                >
                  <View style={styles.ringInner}>
                    <Droplet color="#38A1D6" size={24} />
                    <View style={styles.ringTextRow}>
                      <Text style={styles.ringMain}>1.8</Text>
                      <Text style={styles.ringUnit}>L</Text>
                    </View>
                    <Text style={styles.ringGoal}>GOAL: 3.0 L</Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.quickAddRow}>
                <View style={styles.quickAddBtn}>
                  <Droplet color="#38A1D6" size={12} />
                  <Text style={styles.quickAddText}>+250ML</Text>
                </View>
                <View style={styles.quickAddBtn}>
                  <Droplet color="#38A1D6" size={12} />
                  <Text style={styles.quickAddText}>+500ML</Text>
                </View>
                <View style={styles.quickAddBtn}>
                  <Droplet color="#38A1D6" size={12} />
                  <Text style={styles.quickAddText}>+750ML</Text>
                </View>
              </View>

              <View style={styles.customWaterRow}>
                <Droplet color="#38A1D6" size={18} />
                <TextInput
                  style={styles.waterInput}
                  placeholder="0"
                  placeholderTextColor="#64748B"
                  keyboardType="numeric"
                  value={waterInput}
                  onChangeText={setWaterInput}
                />
                <Text style={styles.waterInputUnit}>ML</Text>
              </View>

              <View>
                <LinearGradient
                  colors={["#1B648C", "#3FA8DD"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveWaterBtn}
                >
                  <Text style={styles.saveWaterText}>SAVE WATER</Text>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </Pressable>

        {/* AI Nutrition Coach Card */}
        <LinearGradient
          colors={["#7552E8", "#44EAC3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cardBorder, { marginBottom: 100 }]}
        >
          <LinearGradient
            colors={["#8F83E0", "#211F2D", "#161619"]}
            locations={[0, 0.4, 1]}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 1, y: 0.9 }}
            style={{ borderRadius: 23, overflow: "hidden" }}
          >
            <View
              style={[
                styles.cardInner,
                { backgroundColor: "transparent", padding: 24 },
              ]}
            >
              <View style={styles.coachHeader}>
                <Image
                  source={require("../../assets/coachOnline/coachOnline.png")}
                  style={styles.coachAvatar}
                  contentFit="cover"
                />
                <View style={styles.coachTextCol}>
                  <Text style={styles.coachLabel}>AI NUTRITION COACH</Text>
                  <Text style={styles.coachQuote}>
                    "You still need{" "}
                    <Text style={{ color: "#2EE8B3" }}>24g of protein</Text>{" "}
                    today."
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.recommendedBox,
                  {
                    backgroundColor: "rgba(0,0,0,0.4)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.05)",
                  },
                ]}
              >
                <View style={styles.recommendedHeader}>
                  <Utensils color="#2EE8B3" size={14} />
                  <Text style={styles.recommendedLabel}>
                    RECOMMENDED NEXT LUNCH
                  </Text>
                </View>
                <Text style={styles.recommendedMeal}>
                  Grilled Chicken with Brown Rice
                </Text>
              </View>

              <Pressable
                onPress={() => router.push("/ai-meal-plan")}
                style={[
                  styles.viewPlanBtn,
                  {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    marginTop: 8,
                  },
                ]}
              >
                <Text style={styles.viewPlanText}>VIEW AI MEAL PLAN</Text>
                <ChevronRight color="#A0A0B0" size={16} />
              </Pressable>
            </View>
          </LinearGradient>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#161619", // Dark background matching the image
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 42,
    fontFamily: "JetBrainsMono_700Bold",
    lineHeight: 44,
  },
  heroTitleGlow: {
    color: "#FFFFFF",
    textShadowColor: "#44EAC3",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  heroSubtitle: {
    color: "#A0A0B0",
    fontSize: 14,
    marginTop: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  cardBorder: {
    padding: 1,
    borderRadius: 24,
    marginBottom: 20,
  },
  cardInner: {
    backgroundColor: "#1D1D23",
    borderRadius: 23,
    padding: 24,
  },
  cardSubtitleCenter: {
    color: "#8A8A93",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginTop: 8,
  },
  budgetMain: {
    color: "#FFFFFF",
    fontSize: 48,
    fontFamily: "JetBrainsMono_700Bold",
  },
  budgetTotal: {
    color: "#8A8A93",
    fontSize: 20,
    fontFamily: "JetBrainsMono_700Bold",
  },
  budgetLabel: {
    color: "#44EAC3",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    textAlign: "center",
    marginTop: 4,
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 24,
  },
  macroBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  macroLabel: {
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
    marginBottom: 6,
  },
  macroValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "JetBrainsMono_700Bold",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 20,
    gap: 8,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  waterHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  waterTitle: {
    color: "#38A1D6",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  hydratedBadge: {
    backgroundColor: "rgba(56, 161, 214, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  hydratedText: {
    color: "#38A1D6",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  ringContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  ringOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 6,
  },
  ringInner: {
    flex: 1,
    backgroundColor: "#1D1D23",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  ringTextRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 8,
    marginBottom: 4,
  },
  ringMain: {
    color: "#FFFFFF",
    fontSize: 36,
    fontFamily: "JetBrainsMono_700Bold",
  },
  ringUnit: {
    color: "#A0A0B0",
    fontSize: 16,
    fontFamily: "JetBrainsMono_700Bold",
    marginLeft: 4,
  },
  ringGoal: {
    color: "#8A8A93",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  quickAddRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickAddBtn: {
    flex: 1,
    backgroundColor: "#25252D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    gap: 6,
  },
  quickAddText: {
    color: "#8A8A93",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
  },
  customWaterRow: {
    backgroundColor: "#25252D",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
    marginBottom: 24,
  },
  waterInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "JetBrainsMono_700Bold",
    marginLeft: 12,
  },
  waterInputUnit: {
    color: "#38A1D6",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
  },
  saveWaterBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 20,
  },
  saveWaterText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  coachHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  coachAvatar: {
    width: 62,
    height: 62,
    borderRadius: 12,
    marginRight: 16,
  },
  coachTextCol: {
    flex: 1,
  },
  coachLabel: {
    color: "#A0A0B0",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  coachQuote: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    lineHeight: 20,
  },
  recommendedBox: {
    backgroundColor: "#25252D",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  recommendedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  recommendedLabel: {
    color: "#A0A0B0",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  recommendedMeal: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "JetBrainsMono_700Bold",
  },
  viewPlanBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#25252D",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  viewPlanText: {
    color: "#A0A0B0",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
});
