import { WorkoutHeader } from "@/features/workouts";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Camera,
  ChevronRight,
  Droplet,
  Flame,
  Plus,
  Sparkles,
  Utensils,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function NutritionTabRoute() {
  const insets = useSafeAreaInsets();
  const [waterInput, setWaterInput] = useState("");
  const [waterTotal, setWaterTotal] = useState(1.8);

  const triggerHaptic = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleQuickAddWater = (ml: number) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setWaterTotal((prev) => Math.min(+(prev + ml / 1000).toFixed(2), 5.0));
  };

  const handleSaveCustomWater = () => {
    const val = parseFloat(waterInput);
    if (!isNaN(val) && val > 0) {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
      setWaterTotal((prev) => Math.min(+(prev + val / 1000).toFixed(2), 5.0));
      setWaterInput("");
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Kinetic Ambient Gradient & Accent Lines */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          <SvgLine
            x1="420"
            y1="-20"
            x2="-40"
            y2="440"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
          />
          <SvgLine
            x1="460"
            y1="260"
            x2="-40"
            y2="760"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeWidth="1"
          />
          <SvgLine
            x1="480"
            y1="560"
            x2="-40"
            y2="1080"
            stroke="rgba(56, 237, 216, 0.04)"
            strokeWidth="1"
          />
        </Svg>
      </View>

      <WorkoutHeader transparent={true} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom + 100, 120) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Masked Gradient Title */}
        <View style={styles.heroSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    FUEL YOURSELF
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
          <Text style={styles.heroSubtitle}>
            AI-powered metabolic intake, macro telemetry & hydration
          </Text>
        </View>

        {/* Daily Energy Budget Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerBadge}>
              <Flame size={13} color="#38BDF8" />
              <Text style={styles.headerBadgeText}>DAILY ENERGY BUDGET</Text>
            </View>
          </View>

          {/* Budget Main Calories */}
          <View style={styles.budgetRow}>
            <Text style={styles.budgetMain}>1,850</Text>
            <Text style={styles.budgetTotal}> / 2,300 KCAL</Text>
          </View>

          {/* Calorie Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill, { width: "80%" }]}
              />
            </View>
            <View style={styles.progressMeta}>
              <Text style={styles.progressRemaining}>450 KCAL REMAINING</Text>
              <Text style={styles.progressPercent}>80% CONSUMED</Text>
            </View>
          </View>

          {/* Macro Breakdown Matrix */}
          <View style={styles.macrosRow}>
            {/* Protein */}
            <View
              style={[
                styles.macroBox,
                { borderColor: "rgba(56, 189, 248, 0.35)" },
              ]}
            >
              <Text style={[styles.macroLabel, { color: "#38BDF8" }]}>
                PROTEIN
              </Text>
              <Text style={styles.macroValue}>120g</Text>
            </View>

            {/* Carbs */}
            <View
              style={[
                styles.macroBox,
                { borderColor: "rgba(255, 182, 140, 0.35)" },
              ]}
            >
              <Text style={[styles.macroLabel, { color: "#FFB68C" }]}>
                CARBS
              </Text>
              <Text style={styles.macroValue}>180g</Text>
            </View>

            {/* Fat */}
            <View
              style={[
                styles.macroBox,
                { borderColor: "rgba(244, 63, 94, 0.35)" },
              ]}
            >
              <Text style={[styles.macroLabel, { color: "#F43F5E" }]}>FAT</Text>
              <Text style={styles.macroValue}>55g</Text>
            </View>
          </View>

          {/* Scan Meal Button */}
          <Pressable
            style={({ pressed }) => [
              styles.scanBtn,
              pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
            ]}
            onPress={() => {
              triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/scan-meal");
            }}
          >
            <LinearGradient
              colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.scanBtnGradient}
            >
              <Camera color="#FFFFFF" size={17} style={{ marginRight: 8 }} />
              <Text style={styles.scanBtnText}>SCAN TODAY'S MEAL</Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Water Intake Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerBadge}>
              <Droplet size={13} color="#2DD4BF" />
              <Text style={[styles.headerBadgeText, { color: "#2DD4BF" }]}>
                HYDRATION TELEMETRY
              </Text>
            </View>
            <View
              style={[
                styles.statusPill,
                {
                  backgroundColor: "rgba(45, 212, 191, 0.12)",
                  borderColor: "rgba(45, 212, 191, 0.3)",
                },
              ]}
            >
              <Text style={[styles.statusPillText, { color: "#2DD4BF" }]}>
                HYDRATED
              </Text>
            </View>
          </View>

          {/* Ring Gauge Center */}
          <Pressable
            style={styles.ringContainer}
            onPress={() => {
              triggerHaptic();
              router.push("/drink-water");
            }}
          >
            <LinearGradient
              colors={["#2DD4BF", "#0284C7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ringOuter}
            >
              <View style={styles.ringInner}>
                <Droplet
                  color="#38BDF8"
                  size={24}
                  style={{ marginBottom: 4 }}
                />
                <View style={styles.ringTextRow}>
                  <Text style={styles.ringMain}>{waterTotal.toFixed(1)}</Text>
                  <Text style={styles.ringUnit}>L</Text>
                </View>
                <Text style={styles.ringGoal}>GOAL: 3.0 L</Text>
              </View>
            </LinearGradient>
          </Pressable>

          {/* Quick Add Water Buttons */}
          <View style={styles.quickAddRow}>
            {[
              { label: "+250 ML", amount: 250 },
              { label: "+500 ML", amount: 500 },
              { label: "+750 ML", amount: 750 },
            ].map((btn, idx) => (
              <Pressable
                key={idx}
                style={({ pressed }) => [
                  styles.quickAddBtn,
                  pressed && { opacity: 0.75, transform: [{ scale: 0.97 }] },
                ]}
                onPress={() => handleQuickAddWater(btn.amount)}
              >
                <Plus size={11} color="#38BDF8" style={{ marginRight: 2 }} />
                <Text style={styles.quickAddText}>{btn.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Custom Water Input & Save */}
          <View style={styles.customWaterRow}>
            <Droplet color="#38BDF8" size={16} />
            <TextInput
              style={styles.waterInput}
              placeholder="0"
              placeholderTextColor="#64748B"
              keyboardType="number-pad"
              value={waterInput}
              onChangeText={(text) =>
                setWaterInput(text.replace(/[^0-9]/g, ""))
              }
              maxLength={5}
            />
            <Text style={styles.waterInputUnit}>ML</Text>
            <Pressable
              style={({ pressed }) => [
                styles.saveInlineBtn,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleSaveCustomWater}
            >
              <Text style={styles.saveInlineText}>ADD</Text>
            </Pressable>
          </View>
        </View>

        {/* AI Nutrition Coach Card */}
        <View style={styles.coachCard}>
          <View style={styles.coachHeader}>
            <View style={styles.coachAvatarWrapper}>
              <Image
                source={require("../../assets/coach/coach.png")}
                style={styles.coachAvatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.coachTextCol}>
              <View style={styles.coachLabelRow}>
                <Text style={styles.coachLabel}>AI METABOLIC COACH</Text>
              </View>
              <Text style={styles.coachQuote}>
                You still require{" "}
                <Text style={{ color: "#38BDF8", fontWeight: "900" }}>
                  24g of protein
                </Text>{" "}
                to hit optimal hypertrophy target.
              </Text>
            </View>
          </View>

          {/* Recommended Meal */}
          <View style={styles.recommendedBox}>
            <View style={styles.recommendedHeader}>
              <Utensils color="#38BDF8" size={13} />
              <Text style={styles.recommendedLabel}>
                RECOMMENDED NEXT PROTOCOL
              </Text>
            </View>
            <View style={styles.mealDetailsRow}>
              <Text style={styles.recommendedMeal}>
                Grilled Chicken with Quinoa & Asparagus
              </Text>
            </View>
          </View>

          {/* View Plan Button */}
          <Pressable
            style={({ pressed }) => [
              styles.viewPlanBtn,
              pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
            ]}
            onPress={() => {
              triggerHaptic();
              router.push("/ai-meal-plan");
            }}
          >
            <Text style={styles.viewPlanText}>ACCESS FULL AI MEAL PLAN</Text>
            <ChevronRight color="#38BDF8" size={16} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  heroSection: {
    marginTop: 4,
    marginBottom: 20,
  },
  maskedTitleWrapper: {
    height: 48,
    width: "100%",
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
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  heroSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    marginBottom: 20,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerBadgeText: {
    color: "#38BDF8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  statusPill: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
  },
  statusPillText: {
    color: "#38BDF8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  budgetRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 14,
  },
  budgetMain: {
    color: "#FFFFFF",
    fontSize: 44,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
  },
  budgetTotal: {
    color: "#64748B",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "700",
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    overflow: "hidden",
    marginBottom: 8,
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressRemaining: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  progressPercent: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  macrosRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  macroBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  macroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  macroValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "900",
    marginBottom: 2,
  },
  macroTarget: {
    color: "#64748B",
    fontSize: 8,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  scanBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  scanBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  scanBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  ringContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 24,
  },
  ringOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ringInner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0B0E17",
    borderRadius: 85,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  ringTextRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  ringMain: {
    color: "#FFFFFF",
    fontSize: 34,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  ringUnit: {
    color: "#38BDF8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "800",
    marginLeft: 3,
  },
  ringGoal: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },
  percentBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  percentText: {
    color: "#38BDF8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  quickAddRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  quickAddBtn: {
    flex: 1,
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  quickAddText: {
    color: "#38BDF8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  customWaterRow: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
  },
  waterInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    marginLeft: 10,
  },
  waterInputUnit: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
    marginRight: 10,
  },
  saveInlineBtn: {
    backgroundColor: "#0284C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveInlineText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  coachCard: {
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    padding: 20,
    marginBottom: 20,
  },
  coachHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  coachAvatarWrapper: {
    position: "relative",
    marginRight: 14,
  },
  coachAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
  },
  onlineBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2DD4BF",
    borderWidth: 2,
    borderColor: "#090A10",
  },
  coachTextCol: {
    flex: 1,
  },
  coachLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  coachLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  coachQuote: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 17,
  },
  recommendedBox: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    padding: 14,
    marginBottom: 16,
  },
  recommendedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  recommendedLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  mealDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  recommendedMeal: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "700",
    flex: 1,
  },
  mealMacroPill: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
  },
  mealMacroText: {
    color: "#38BDF8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  viewPlanBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  viewPlanText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
});
