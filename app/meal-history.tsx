import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
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

interface MealItem {
  id: number;
  type: string;
  typeColor: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  liked: boolean;
}

export default function MealHistoryScreen() {
  const insets = useSafeAreaInsets();

  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: 1,
      type: "BREAKFAST",
      typeColor: "#38BDF8",
      name: "Avocado & Poached Egg Toast",
      calories: 420,
      protein: 18,
      carbs: 34,
      fat: 16,
      liked: true,
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
      liked: false,
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
      liked: false,
    },
    {
      id: 4,
      type: "DINNER",
      typeColor: "#C084FC",
      name: "Atlantic Salmon with Asparagus",
      calories: 520,
      protein: 38,
      carbs: 18,
      fat: 22,
      liked: false,
    },
  ]);

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [suggestionAdded, setSuggestionAdded] = useState(false);

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
  };

  const handleRegenerate = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 1200);
  };

  const handleAddSuggestion = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    if (!suggestionAdded) {
      setSuggestionAdded(true);
      setMeals((prev) => [
        ...prev,
        {
          id: 5,
          type: "EVENING",
          typeColor: "#F43F5E",
          name: "Greek Yogurt with Berries",
          calories: 190,
          protein: 20,
          carbs: 16,
          fat: 2,
          liked: true,
        },
      ]);
    }
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <View style={styles.container}>
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
          { paddingBottom: Math.max(insets.bottom + 40, 60) },
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
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    MEAL HISTORY
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
            Precision metabolic nutrition, telemetry & logged meal protocols
          </Text>
        </View>

        {/* Daily Target Telemetry Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerBadge}>
              <Target size={13} color="#38BDF8" />
              <Text style={styles.headerBadgeText}>DAILY ENERGY TARGET</Text>
            </View>
          </View>

          {/* Calories Row */}
          <View style={styles.caloriesRow}>
            <Text style={styles.caloriesMain}>
              {totalCalories.toLocaleString()}
            </Text>
            <Text style={styles.caloriesTotal}> / 2,300 KCAL</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={["#00f2fe", "#4facfe"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                StyleSheet.absoluteFill,
                {
                  width: `${Math.min(Math.round((totalCalories / 2300) * 100), 100)}%`,
                },
              ]}
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
              <Text style={styles.macroValue}>
                <Text style={styles.macroValueBold}>
                  {meals.reduce((sum, m) => sum + m.protein, 0)}g
                </Text>
                <Text style={styles.macroValueDim}>/120g</Text>
              </Text>
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
              <Text style={styles.macroValue}>
                <Text style={styles.macroValueBold}>
                  {meals.reduce((sum, m) => sum + m.carbs, 0)}g
                </Text>
                <Text style={styles.macroValueDim}>/180g</Text>
              </Text>
            </View>

            {/* Fat */}
            <View
              style={[
                styles.macroBox,
                { borderColor: "rgba(244, 63, 94, 0.35)" },
              ]}
            >
              <Text style={[styles.macroLabel, { color: "#F43F5E" }]}>FAT</Text>
              <Text style={styles.macroValue}>
                <Text style={styles.macroValueBold}>
                  {meals.reduce((sum, m) => sum + m.fat, 0)}g
                </Text>
                <Text style={styles.macroValueDim}>/55g</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Logged Meals Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.iconBadge}>
            <Utensils size={13} color="#38BDF8" />
          </View>
          <Text style={styles.sectionTitle}>LOGGED MEALS TODAY</Text>
          <Text style={styles.counterText}>{meals.length} LOGGED</Text>
        </View>

        {/* Meal List */}
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
                style={({ pressed }) => [
                  styles.likeBtn,
                  pressed && { opacity: 0.7 },
                ]}
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

        {/* AI Metabolic Suggestion Box */}
        <View style={styles.suggestionBox}>
          <View style={styles.suggestionIconWrapper}>
            <Sparkles color="#FFB68C" size={16} />
          </View>
          <View style={styles.suggestionContent}>
            <Text style={styles.suggestionTitle}>
              AI METABOLIC RECOMMENDATION
            </Text>
            <Text style={styles.suggestionText}>
              "You are currently{" "}
              {120 - meals.reduce((sum, m) => sum + m.protein, 0)}g below
              optimal protein synthesis. Greek yogurt with organic berries is
              recommended."
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.addSuggestionBtn,
                pressed && { opacity: 0.75 },
              ]}
              onPress={handleAddSuggestion}
            >
              {suggestionAdded ? (
                <>
                  <Check size={12} color="#2DD4BF" style={{ marginRight: 4 }} />
                  <Text
                    style={[styles.addSuggestionText, { color: "#2DD4BF" }]}
                  >
                    LOGGED TO MENU
                  </Text>
                </>
              ) : (
                <>
                  <Plus size={12} color="#FFB68C" style={{ marginRight: 4 }} />
                  <Text style={styles.addSuggestionText}>
                    ADD TO LOG (+20g PROTEIN)
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.applyBtn,
              pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
            ]}
            onPress={handleApplyPlan}
          >
            <LinearGradient
              colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.applyBtnGradient}
            >
              <Text style={styles.applyBtnText}>APPLY NUTRITION PROTOCOL</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.regenerateBtn,
              pressed && { opacity: 0.75, transform: [{ scale: 0.99 }] },
            ]}
            onPress={handleRegenerate}
          >
            <RefreshCw
              color="#38BDF8"
              size={14}
              style={[
                { marginRight: 8 },
                isRegenerating && { transform: [{ rotate: "180deg" }] },
              ]}
            />
            <Text style={styles.regenerateText}>
              {isRegenerating ? "RECALIBRATING..." : "RECALIBRATE MEAL PLAN"}
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
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#2DD4BF",
    marginRight: 5,
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
    fontSize: 16,
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
    flexDirection: "row",
    alignItems: "baseline",
  },
  macroValueBold: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  macroValueDim: {
    color: "#64748B",
    fontSize: 10,
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
    marginBottom: 4,
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
  suggestionBox: {
    backgroundColor: "rgba(255, 182, 140, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 182, 140, 0.2)",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  suggestionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255, 182, 140, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    color: "#FFB68C",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  suggestionText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 17,
    marginBottom: 10,
  },
  addSuggestionBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  addSuggestionText: {
    color: "#FFB68C",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  actionsContainer: {
    gap: 12,
  },
  applyBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  applyBtnGradient: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
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
