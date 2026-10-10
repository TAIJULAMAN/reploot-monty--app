import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowLeft, Search, Bell, Flame, Droplet, Leaf, Hexagon, Scale } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function MealAnalysisScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#38A1D6" size={20} />
        </Pressable>
        <View style={styles.headerRight}>
          <Search color="#FFFFFF" size={20} />
          <Bell color="#FFFFFF" size={20} />
          <Image
            source={require("../assets/coachOnline/coachOnline.png")} // Using a known avatar asset
            style={styles.avatar}
            contentFit="cover"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.titleGlow}>MEAL</Text>
          <Text style={styles.titleGlow}>ANALYSIS</Text>
        </View>

        {/* Meal Image */}
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={["#7552E8", "#2EE8B3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.imageGlowBorder}
          >
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop" }}
              style={styles.mealImage}
              contentFit="cover"
            />
          </LinearGradient>
        </View>

        {/* Detected Foods */}
        <View style={styles.detectedSection}>
          <Text style={styles.detectedTitle}>DETECTED FOODS</Text>
          <View style={styles.pillsRow}>
            <View style={styles.pill}><Text style={styles.pillText}>CHICKEN BREAST</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>RICE</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>BROCCOLI</Text></View>
          </View>
        </View>

        {/* Macros Grid */}
        <View style={styles.macrosGrid}>
          {/* Calories */}
          <View style={[styles.macroCard, { borderBottomWidth: 3, borderBottomColor: "#2EE8B3" }]}>
            <View style={styles.macroHeader}>
              <Text style={[styles.macroLabel, { color: "#2EE8B3" }]}>CALORIES</Text>
              <Flame color="#2EE8B3" size={14} />
            </View>
            <Text style={styles.macroValue}>450</Text>
            <Text style={styles.macroSub}>KCAL</Text>
          </View>

          {/* Protein */}
          <View style={[styles.macroCard, { borderBottomWidth: 3, borderBottomColor: "#7552E8" }]}>
            <View style={styles.macroHeader}>
              <Text style={[styles.macroLabel, { color: "#7552E8" }]}>PROTEIN</Text>
              <Droplet color="#7552E8" size={14} />
            </View>
            <Text style={styles.macroValue}>35g</Text>
            <Text style={styles.macroSub}>HIGH TARGET</Text>
          </View>

          {/* Carbs */}
          <View style={[styles.macroCard, { borderBottomWidth: 3, borderBottomColor: "#F29C38" }]}>
            <View style={styles.macroHeader}>
              <Text style={[styles.macroLabel, { color: "#F29C38" }]}>CARBS</Text>
              <Leaf color="#F29C38" size={14} />
            </View>
            <Text style={styles.macroValue}>42g</Text>
            <Text style={styles.macroSub}>COMPLEX</Text>
          </View>

          {/* Fat */}
          <View style={[styles.macroCard, { borderBottomWidth: 3, borderBottomColor: "#F2385A" }]}>
            <View style={styles.macroHeader}>
              <Text style={[styles.macroLabel, { color: "#F2385A" }]}>FAT</Text>
              <Hexagon color="#F2385A" size={14} />
            </View>
            <Text style={styles.macroValue}>12g</Text>
            <Text style={styles.macroSub}>UNSATURATED</Text>
          </View>
        </View>

        {/* Portion */}
        <View style={[styles.portionCard, { borderBottomWidth: 3, borderBottomColor: "#EAE041" }]}>
          <View style={styles.macroHeader}>
            <Text style={[styles.macroLabel, { color: "#EAE041" }]}>PORTION</Text>
            <Scale color="#EAE041" size={14} />
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={styles.macroValue}>320g</Text>
            <Text style={styles.macroSub}>NET WEIGHT</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable onPress={() => router.push("/meal-history")}>
            <LinearGradient
              colors={["#2D76A8", "#38A1D6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>SAVE MEAL</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.scanAgainButton} onPress={() => router.back()}>
            <Text style={styles.scanAgainText}>SCAN AGAIN</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161619",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 24,
  },
  titleGlow: {
    color: "#FFFFFF",
    fontSize: 42,
    fontFamily: "JetBrainsMono_700Bold",
    lineHeight: 44,
    textShadowColor: "#44EAC3",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  imageGlowBorder: {
    padding: 2,
    borderRadius: 24,
    width: "100%",
    aspectRatio: 1,
    shadowColor: "#44EAC3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mealImage: {
    flex: 1,
    borderRadius: 22,
    width: "100%",
  },
  detectedSection: {
    marginBottom: 32,
  },
  detectedTitle: {
    color: "#8A8A93",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 2,
    marginBottom: 12,
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  pillText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  macrosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    marginBottom: 16,
  },
  macroCard: {
    width: (width - 48 - 16) / 2, // 50% width minus padding and gap
    backgroundColor: "#1D1D23",
    borderRadius: 16,
    padding: 16,
  },
  macroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  macroLabel: {
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  macroValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "JetBrainsMono_700Bold",
    marginBottom: 4,
  },
  macroSub: {
    color: "#8A8A93",
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  portionCard: {
    backgroundColor: "#1D1D23",
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  actionsContainer: {
    gap: 16,
  },
  saveButton: {
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  scanAgainButton: {
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#1D1D23",
  },
  scanAgainText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
});
