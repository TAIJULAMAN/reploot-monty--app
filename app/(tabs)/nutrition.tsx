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
  Clock,
  ArrowRight,
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

interface LoggedMeal {
  id: number;
  type: string;
  typeColor: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export default function NutritionTabRoute() {
  const insets = useSafeAreaInsets();
  const [waterInput, setWaterInput] = useState("");
  const [waterTotal, setWaterTotal] = useState(1.8);

  const [recentMeals] = useState<LoggedMeal[]>([
    {
      id: 1,
      type: "BREAKFAST",
      typeColor: "#38BDF8",
      name: "Avocado & Poached Egg Toast",
      calories: 420,
      protein: 18,
      carbs: 34,
      fat: 16,
      time: "08:30 AM",
    },
    {
      id: 2,
      type: "LUNCH",
      typeColor: "#2DD4BF",
      name: "Grilled Chicken & Quinoa Bowl",
      calories: 650,
      protein: 45,
      carbs: 58,
      fat: 14,
      time: "01:15 PM",
    },
    {
      id: 3,
      type: "SNACK",
      typeColor: "#FFB68C",
      name: "Almond & Cacao Protein Crunch",
      calories: 280,
      protein: 12,
      carbs: 22,
      fat: 11,
      time: "04:45 PM",
    },
  ]);

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
      <WorkoutHeader transparent={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom + 140, 160) },
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
                  <Text style={styles.mainTitle} numberOfLines={1}>
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
              <Flame size={14} color="#38BDF8" />
              <Text style={styles.headerBadgeText}>DAILY ENERGY BUDGET</Text>
            </View>
            <Pressable
              onPress={() => {
                triggerHaptic();
                router.push("/meal-history");
              }}
              style={styles.headerLink}
            >
              <Text style={styles.headerLinkText}>LOGS</Text>
              <ChevronRight size={12} color="#38BDF8" />
            </Pressable>
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
              <Text style={styles.macroTarget}>/ 180g</Text>
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
              <Text style={styles.macroTarget}>/ 250g</Text>
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
              <Text style={styles.macroTarget}>/ 70g</Text>
            </View>
          </View>

          {/* Scan Meal Button */}
          <Pressable
            style={styles.scanBtn}
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
              <Droplet size={14} color="#2DD4BF" />
              <Text style={[styles.headerBadgeText, { color: "#2DD4BF" }]}>
                HYDRATION TELEMETRY
              </Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>HYDRATED</Text>
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

          {/* Quick Add Water Buttons (Wrap in View to prevent CSS-Interop collapse on Android) */}
          <View style={styles.quickAddRow}>
            {[
              { label: "+250 ML", amount: 250 },
              { label: "+500 ML", amount: 500 },
              { label: "+750 ML", amount: 750 },
            ].map((btn, idx) => (
              <View key={idx} style={styles.quickAddBtnWrapper}>
                <Pressable
                  style={styles.quickAddBtn}
                  onPress={() => handleQuickAddWater(btn.amount)}
                >
                  <Plus size={11} color="#38BDF8" style={{ marginRight: 4 }} />
                  <Text style={styles.quickAddText}>{btn.label}</Text>
                </Pressable>
              </View>
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
              style={styles.saveInlineBtn}
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
                <Sparkles
                  size={11}
                  color="#38BDF8"
                  style={{ marginRight: 4 }}
                />
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
              <View style={styles.mealMacroPill}>
                <Text style={styles.mealMacroText}>+38g PRO</Text>
              </View>
            </View>
          </View>

          {/* View Plan Button */}
          <Pressable
            style={styles.viewPlanBtn}
            onPress={() => {
              triggerHaptic();
              router.push("/ai-meal-plan");
            }}
          >
            <View style={styles.viewPlanInner}>
              <Text style={styles.viewPlanText}>ACCESS FULL AI MEAL PLAN</Text>
              <ChevronRight color="#38BDF8" size={16} />
            </View>
          </Pressable>
        </View>

        {/* Logged Protocols Today Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerBadge}>
              <Utensils size={14} color="#38BDF8" />
              <Text style={styles.headerBadgeText}>
                TODAY'S LOGGED PROTOCOLS
              </Text>
            </View>
            <Pressable
              onPress={() => {
                triggerHaptic();
                router.push("/meal-history");
              }}
              style={styles.headerLink}
            >
              <Text style={styles.headerLinkText}>VIEW ALL</Text>
              <ArrowRight size={12} color="#38BDF8" />
            </Pressable>
          </View>

          <View style={styles.mealsList}>
            {recentMeals.map((meal, index) => (
              <View
                key={meal.id}
                style={[
                  styles.mealItemRow,
                  index === recentMeals.length - 1 && styles.mealItemRowLast,
                ]}
              >
                <View style={styles.mealLeftCol}>
                  <View style={styles.mealTypeTimeRow}>
                    <View
                      style={[
                        styles.mealTypeBadge,
                        {
                          backgroundColor: `${meal.typeColor}18`,
                          borderColor: `${meal.typeColor}40`,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.mealTypeBadgeText,
                          { color: meal.typeColor },
                        ]}
                      >
                        {meal.type}
                      </Text>
                    </View>
                    <View style={styles.mealTimeRow}>
                      <Clock
                        size={10}
                        color="#64748B"
                        style={{ marginRight: 3 }}
                      />
                      <Text style={styles.mealTimeText}>{meal.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.mealItemName} numberOfLines={1}>
                    {meal.name}
                  </Text>
                </View>

                <View style={styles.mealRightCol}>
                  <Text style={styles.mealCaloriesText}>
                    {meal.calories} KCAL
                  </Text>
                  <Text style={styles.mealMacrosText}>
                    {meal.protein}P • {meal.carbs}C • {meal.fat}F
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
  scrollView: {
    flex: 1,
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
    height: 48,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    textAlign: "left",
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
  headerLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  headerLinkText: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  statusPill: {
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
  },
  statusPillText: {
    color: "#2DD4BF",
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
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
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
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ringInner: {
    width: 154,
    height: 154,
    backgroundColor: "#0B0E17",
    borderRadius: 77,
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
  quickAddRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  quickAddBtnWrapper: {
    flex: 1,
  },
  quickAddBtn: {
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 4,
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
    paddingVertical: 0,
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
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  viewPlanInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "100%",
  },
  viewPlanText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  mealsList: {
    gap: 12,
  },
  mealItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
  },
  mealItemRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  mealLeftCol: {
    flex: 1,
    marginRight: 12,
  },
  mealTypeTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  mealTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  mealTypeBadgeText: {
    fontSize: 8,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  mealTimeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealTimeText: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  mealItemName: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  mealRightCol: {
    alignItems: "flex-end",
  },
  mealCaloriesText: {
    color: "#38BDF8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    marginBottom: 2,
  },
  mealMacrosText: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "600",
  },
});
