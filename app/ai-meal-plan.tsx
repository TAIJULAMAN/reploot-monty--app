import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Calendar,
  Check,
  Flame,
  Heart,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  Utensils,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

interface PlannedMeal {
  id: number;
  time: string;
  type: string;
  typeColor: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  liked: boolean;
}

export default function AiMealPlanScreen() {
  const insets = useSafeAreaInsets();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [planApplied, setPlanApplied] = useState(false);

  const [meals, setMeals] = useState<PlannedMeal[]>([
    {
      id: 1,
      time: "08:30 AM",
      type: "BREAKFAST",
      typeColor: "#38BDF8",
      name: "Avocado & Organic Poached Egg Toast",
      calories: 420,
      protein: 22,
      carbs: 34,
      fat: 16,
      prepTime: "10 MIN",
      liked: true,
    },
    {
      id: 2,
      time: "01:00 PM",
      type: "LUNCH",
      typeColor: "#2DD4BF",
      name: "Flame-Grilled Chicken Quinoa Bowl",
      calories: 680,
      protein: 48,
      carbs: 62,
      fat: 14,
      prepTime: "20 MIN",
      liked: false,
    },
    {
      id: 3,
      time: "04:30 PM",
      type: "SNACK",
      typeColor: "#FFB68C",
      name: "Raw Almond & Whey Cacao Crunch",
      calories: 310,
      protein: 18,
      carbs: 24,
      fat: 12,
      prepTime: "5 MIN",
      liked: false,
    },
    {
      id: 4,
      time: "07:45 PM",
      type: "DINNER",
      typeColor: "#C084FC",
      name: "Wild Atlantic Salmon with Grilled Asparagus",
      calories: 540,
      protein: 42,
      carbs: 16,
      fat: 22,
      prepTime: "25 MIN",
      liked: true,
    },
  ]);

  const triggerHaptic = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const toggleLike = (id: number) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: !m.liked } : m)),
    );
  };

  const handleApplyPlan = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setPlanApplied(true);
  };

  const handleRegenerate = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setMeals((prev) =>
        prev.map((m) => ({
          ...m,
          calories: m.calories + Math.floor(Math.random() * 20) - 10,
        })),
      );
    }, 1200);
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CustomHeader
        titleVariant="text"
        title=""
        showBackButton={true}
        showSearch={true}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 60, 80) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section with Masked Gradient Title & Description */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    AI MEAL PLAN
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
          <Text style={styles.subtitle}>
            Precision bio-calibrated nutrition matrix generated for peak
            performance
          </Text>
        </View>

        {/* Daily Calibrated Target Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerBadge}>
              <Target size={13} color="#38BDF8" />
              <Text style={styles.headerBadgeText}>AI MACRO CALIBRATION</Text>
            </View>
          </View>

          {/* Calories Row */}
          <View style={styles.caloriesRow}>
            <Text style={styles.caloriesMain}>
              {totalCalories.toLocaleString()}
            </Text>
            <Text style={styles.caloriesTotal}> KCAL / DAY</Text>
          </View>

          {/* Calorie Progress Bar */}
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={["#00f2fe", "#4facfe"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, { width: "100%" }]}
            />
          </View>

          {/* Macros Row */}
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
              <Text style={styles.macroValue}>{totalProtein}g</Text>
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
              <Text style={styles.macroValue}>{totalCarbs}g</Text>
            </View>

            {/* Fat */}
            <View
              style={[
                styles.macroBox,
                { borderColor: "rgba(244, 63, 94, 0.35)" },
              ]}
            >
              <Text style={[styles.macroLabel, { color: "#F43F5E" }]}>FAT</Text>
              <Text style={styles.macroValue}>{totalFat}g</Text>
            </View>
          </View>
        </View>

        {/* Meal Schedule Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.iconBadge}>
            <Utensils size={13} color="#38BDF8" />
          </View>
          <Text style={styles.sectionTitle}>RECOMMENDED DAILY TIMING</Text>
          <Text style={styles.counterText}>4 COURSES</Text>
        </View>

        {/* Meals Schedule List */}
        <View style={styles.mealList}>
          {meals.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealInfo}>
                <View style={styles.mealTypeRow}>
                  <View
                    style={[
                      styles.typePill,
                      {
                        backgroundColor: `${meal.typeColor}18`,
                        borderColor: `${meal.typeColor}40`,
                      },
                    ]}
                  >
                    <Text style={[styles.typeText, { color: meal.typeColor }]}>
                      {meal.type}
                    </Text>
                  </View>
                  <Text style={styles.timingText}>{meal.time}</Text>
                </View>

                <Text style={styles.mealName}>{meal.name}</Text>

                <View style={styles.mealStatsRow}>
                  <Text style={styles.mealCalories}>{meal.calories} KCAL</Text>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.mealMacros}>
                    {meal.protein}g P • {meal.carbs}g C • {meal.fat}g F
                  </Text>
                </View>
              </View>

              <Pressable
                style={styles.likeBtn}
                onPress={() => toggleLike(meal.id)}
              >
                <Heart
                  color={meal.liked ? "#F43F5E" : "#64748B"}
                  fill={meal.liked ? "#F43F5E" : "transparent"}
                  size={18}
                />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Metabolic Insight */}
        <View style={styles.insightBox}>
          <View style={styles.insightIconWrapper}>
            <Calendar color="#38BDF8" size={16} />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>METABOLIC STRATEGY</Text>
            <Text style={styles.insightText}>
              Carbohydrate loads are timed around your post-workout window to
              drive optimal glycogen replenishment without insulin spikes.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.applyBtn} onPress={handleApplyPlan}>
            <LinearGradient
              colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.applyBtnGradient}
            >
              {planApplied ? (
                <>
                  <Check size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.applyBtnText}>
                    PLAN APPLIED TO SCHEDULE
                  </Text>
                </>
              ) : (
                <Text style={styles.applyBtnText}>ACTIVATE AI MEAL PLAN</Text>
              )}
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.regenerateBtn} onPress={handleRegenerate}>
            <RefreshCw
              color="#38BDF8"
              size={14}
              style={[
                { marginRight: 8 },
                isRegenerating && { transform: [{ rotate: "180deg" }] },
              ]}
            />
            <Text style={styles.regenerateText}>
              {isRegenerating ? "SYNTHESIZING..." : "RE-SYNTHESIZE MEAL MATRIX"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleSection: {
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
  subtitle: {
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
    marginBottom: 24,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
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
    flexDirection: "row",
    alignItems: "center",
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
  caloriesRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 12,
  },
  caloriesMain: {
    color: "#FFFFFF",
    fontSize: 44,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
  },
  caloriesTotal: {
    color: "#64748B",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "700",
    marginLeft: 6,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    overflow: "hidden",
    marginBottom: 20,
  },
  macrosRow: {
    flexDirection: "row",
    gap: 8,
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
  macroSub: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
    flex: 1,
  },
  counterText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  mealList: {
    gap: 12,
    marginBottom: 24,
  },
  mealCard: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mealInfo: {
    flex: 1,
    marginRight: 12,
  },
  mealTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  typePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
  },
  typeText: {
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  timingText: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  prepBadge: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  mealName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  mealStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mealCalories: {
    color: "#38BDF8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  dotSeparator: {
    color: "#475569",
    fontSize: 10,
  },
  mealMacros: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  likeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  insightBox: {
    backgroundColor: "rgba(56, 189, 248, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.2)",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  insightIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  insightText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 17,
  },
  actionsContainer: {
    gap: 12,
  },
  applyBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  applyBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  regenerateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
  },
  regenerateText: {
    color: "#38BDF8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
});
