import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Search, Bell, Heart, Sparkles, RefreshCw } from "lucide-react-native";

export default function MealHistoryScreen() {
  const insets = useSafeAreaInsets();

  const meals = [
    {
      id: 1,
      type: "BREAKFAST",
      name: "Avocado Toast",
      calories: 420,
      protein: 18,
      liked: true,
    },
    {
      id: 2,
      type: "LUNCH",
      name: "Grilled Chicken Bowl",
      calories: 650,
      protein: 45,
      liked: false,
    },
    {
      id: 3,
      type: "SNACK",
      name: "Almond & Cacao Mix",
      calories: 280,
      protein: 8,
      liked: false,
    },
    {
      id: 4,
      type: "DINNER",
      name: "Atlantic Salmon",
      calories: 520,
      protein: 38,
      liked: false,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.logoText}>KINETQX</Text>
        <View style={styles.headerRight}>
          <Search color="#FFFFFF" size={20} />
          <Bell color="#FFFFFF" size={20} />
          <Image
            source={require("../assets/coachOnline/coachOnline.png")}
            style={styles.avatar}
            contentFit="cover"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.titleGlow}>MEAL HISTORY</Text>
          <Text style={styles.subtitle}>
            Precision-engineered nutrition tailored to your biometrics and performance goals.
          </Text>
        </View>

        {/* Daily Target Card */}
        <LinearGradient
          colors={["#7552E8", "#2EE8B3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardBorder}
        >
          <View style={styles.cardInner}>
            <Text style={styles.dailyTargetTitle}>DAILY TARGET</Text>
            <View style={styles.caloriesRow}>
              <Text style={styles.caloriesMain}>1,850</Text>
              <Text style={styles.caloriesTotal}> / 2,300 kcal</Text>
            </View>

            <View style={styles.macrosRow}>
              {/* Protein */}
              <View style={[styles.macroBox, { borderColor: "rgba(117, 82, 232, 0.3)" }]}>
                <Text style={[styles.macroLabel, { color: "#7552E8" }]}>PROTEIN</Text>
                <Text style={styles.macroValue}>
                  <Text style={styles.macroValueBold}>70g</Text>
                  <Text style={styles.macroValueDim}>/120g</Text>
                </Text>
              </View>
              {/* Carbs */}
              <View style={[styles.macroBox, { borderColor: "rgba(242, 156, 56, 0.3)" }]}>
                <Text style={[styles.macroLabel, { color: "#F29C38" }]}>CARBS</Text>
                <Text style={styles.macroValue}>
                  <Text style={styles.macroValueBold}>70g</Text>
                  <Text style={styles.macroValueDim}>/180g</Text>
                </Text>
              </View>
              {/* Fat */}
              <View style={[styles.macroBox, { borderColor: "rgba(242, 56, 90, 0.3)" }]}>
                <Text style={[styles.macroLabel, { color: "#F2385A" }]}>FAT</Text>
                <Text style={styles.macroValue}>
                  <Text style={styles.macroValueBold}>30g</Text>
                  <Text style={styles.macroValueDim}>/55g</Text>
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Today's Menu */}
        <Text style={styles.menuTitle}>Today's Menu</Text>

        <View style={styles.mealList}>
          {meals.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealInfo}>
                <Text style={styles.mealType}>{meal.type}</Text>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealStats}>
                  {meal.calories} kcal  •  {meal.protein}g Protein
                </Text>
              </View>
              <Pressable>
                <Heart
                  color={meal.liked ? "#2EE8B3" : "#64748B"}
                  fill={meal.liked ? "#2EE8B3" : "transparent"}
                  size={20}
                />
              </Pressable>
            </View>
          ))}
        </View>

        {/* AI Suggestion Box */}
        <View style={styles.suggestionBox}>
          <View style={styles.suggestionIconWrapper}>
            <Sparkles color="#F29C38" size={16} />
          </View>
          <View style={styles.suggestionContent}>
            <Text style={styles.suggestionText}>
              "You're slightly below your protein goal today. Try adding Greek yogurt as an evening snack."
            </Text>
            <Pressable>
              <Text style={styles.addSuggestionText}>ADD SUGGESTION +</Text>
            </Pressable>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable>
            <LinearGradient
              colors={["#1B648C", "#3FA8DD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.applyBtn}
            >
              <Text style={styles.applyBtnText}>APPLY MEAL PLAN</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.regenerateBtn}>
            <Text style={styles.regenerateText}>REGENERATE PLAN</Text>
            <RefreshCw color="#FFFFFF" size={14} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111114",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    paddingBottom: 16,
  },
  logoText: {
    color: "#38A1D6",
    fontSize: 20,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2EE8B3",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 32,
    marginTop: 10,
  },
  titleGlow: {
    color: "#FFFFFF",
    fontSize: 36,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: -1,
    textShadowColor: "#38A1D6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 12,
  },
  subtitle: {
    color: "#A0A0B0",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  cardBorder: {
    padding: 1,
    borderRadius: 24,
    marginBottom: 32,
  },
  cardInner: {
    backgroundColor: "#1A1A22",
    borderRadius: 23,
    padding: 24,
  },
  dailyTargetTitle: {
    color: "#2EE8B3",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 2,
    marginBottom: 8,
  },
  caloriesRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 24,
  },
  caloriesMain: {
    color: "#FFFFFF",
    fontSize: 48,
    fontFamily: "JetBrainsMono_700Bold",
  },
  caloriesTotal: {
    color: "#8A8A93",
    fontSize: 18,
    fontFamily: "Inter_400Regular",
    marginLeft: 8,
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  macroBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "rgba(255,255,255,0.02)",
    alignItems: "center",
  },
  macroLabel: {
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
    marginBottom: 6,
  },
  macroValue: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  macroValueBold: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
  },
  macroValueDim: {
    color: "#8A8A93",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
  },
  menuTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  mealList: {
    gap: 16,
    marginBottom: 24,
  },
  mealCard: {
    backgroundColor: "#16161A",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  mealInfo: {
    flex: 1,
  },
  mealType: {
    color: "#2EE8B3",
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
    marginBottom: 6,
  },
  mealName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    marginBottom: 6,
  },
  mealStats: {
    color: "#8A8A93",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  suggestionBox: {
    backgroundColor: "rgba(242, 156, 56, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(242, 156, 56, 0.15)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    marginBottom: 40,
  },
  suggestionIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(242, 156, 56, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionText: {
    color: "#F29C38",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    marginBottom: 12,
  },
  addSuggestionText: {
    color: "#F29C38",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  actionsContainer: {
    gap: 16,
  },
  applyBtn: {
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  regenerateBtn: {
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#16161A",
  },
  regenerateText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
});
