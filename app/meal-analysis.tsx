import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  CheckCircle2,
  Droplet,
  Flame,
  Hexagon,
  Leaf,
  RotateCcw,
  Scale,
  Sparkles,
} from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function MealAnalysisScreen() {
  const insets = useSafeAreaInsets();

  const triggerHaptic = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleSaveMeal = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/meal-history");
  };

  const handleScanAgain = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const ingredients = [
    { name: "CHICKEN BREAST", portion: "180g" },
    { name: "BROWN RICE", portion: "100g" },
    { name: "STEAMED BROCCOLI", portion: "40g" },
  ];

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
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    MEAL ANALYSIS
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
            Computer vision macro breakdown & portion telemetry
          </Text>
        </View>

        {/* Meal Image with Cyber Frame & Confidence HUD */}
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={["#00f2fe", "#4facfe", "#2DD4BF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.imageGlowBorder}
          >
            <View style={styles.imageInnerWrapper}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop",
                }}
                style={styles.mealImage}
                contentFit="cover"
              />
              <View style={styles.verifiedBadge}>
                <CheckCircle2
                  size={11}
                  color="#2DD4BF"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.verifiedText}>CLASSIFIED</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Detected Ingredients Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBadge}>
              <Sparkles size={13} color="#38BDF8" />
            </View>
            <Text style={styles.sectionTitle}>DETECTED INGREDIENTS</Text>
          </View>

          <View style={styles.pillsRow}>
            {ingredients.map((item, idx) => (
              <View key={idx} style={styles.pill}>
                <View style={styles.pillDot} />
                <Text style={styles.pillText}>{item.name}</Text>
                <Text style={styles.pillPortion}>{item.portion}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Macros Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBadge}>
              <Flame size={13} color="#38BDF8" />
            </View>
            <Text style={styles.sectionTitle}>METABOLIC MACRO TELEMETRY</Text>
          </View>

          <View style={styles.macrosGrid}>
            {/* Calories */}
            <View
              style={[
                styles.macroCard,
                { borderColor: "rgba(56, 189, 248, 0.35)" },
              ]}
            >
              <View style={styles.macroHeader}>
                <Text style={[styles.macroLabel, { color: "#38BDF8" }]}>
                  CALORIES
                </Text>
                <Flame color="#38BDF8" size={15} />
              </View>
              <Text style={styles.macroValue}>450</Text>
              <Text style={styles.macroSub}>KCAL</Text>
            </View>

            {/* Protein */}
            <View
              style={[
                styles.macroCard,
                { borderColor: "rgba(45, 212, 191, 0.35)" },
              ]}
            >
              <View style={styles.macroHeader}>
                <Text style={[styles.macroLabel, { color: "#2DD4BF" }]}>
                  PROTEIN
                </Text>
                <Droplet color="#2DD4BF" size={15} />
              </View>
              <Text style={styles.macroValue}>35g</Text>
              <Text style={[styles.macroSub, { color: "#2DD4BF" }]}>
                HIGH TARGET
              </Text>
            </View>

            {/* Carbs */}
            <View
              style={[
                styles.macroCard,
                { borderColor: "rgba(255, 182, 140, 0.35)" },
              ]}
            >
              <View style={styles.macroHeader}>
                <Text style={[styles.macroLabel, { color: "#FFB68C" }]}>
                  CARBS
                </Text>
                <Leaf color="#FFB68C" size={15} />
              </View>
              <Text style={styles.macroValue}>42g</Text>
              <Text style={[styles.macroSub, { color: "#FFB68C" }]}>
                COMPLEX
              </Text>
            </View>

            {/* Fat */}
            <View
              style={[
                styles.macroCard,
                { borderColor: "rgba(244, 63, 94, 0.35)" },
              ]}
            >
              <View style={styles.macroHeader}>
                <Text style={[styles.macroLabel, { color: "#F43F5E" }]}>
                  FAT
                </Text>
                <Hexagon color="#F43F5E" size={15} />
              </View>
              <Text style={styles.macroValue}>12g</Text>
              <Text style={[styles.macroSub, { color: "#F43F5E" }]}>
                UNSATURATED
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.saveButton} onPress={handleSaveMeal}>
            <LinearGradient
              colors={["#00f2fe", "#4facfe"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.saveGradient}
            >
              <CheckCircle2
                color="#000000"
                size={16}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.saveButtonText}>SAVE MEAL TO MATRIX</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.scanAgainButton} onPress={handleScanAgain}>
            <RotateCcw color="#38BDF8" size={16} style={{ marginRight: 8 }} />
            <Text style={styles.scanAgainText}>SCAN ANOTHER MEAL</Text>
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageGlowBorder: {
    padding: 2,
    borderRadius: 24,
    width: "100%",
    aspectRatio: 1.25,
  },
  imageInnerWrapper: {
    flex: 1,
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
  },
  mealImage: {
    width: "100%",
    height: "100%",
  },
  hudBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  hudBadgeText: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  verifiedText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    gap: 6,
  },
  pillDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#38BDF8",
  },
  pillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  pillPortion: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  macrosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  macroCard: {
    width: (width - 40 - 12) / 2,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  macroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  macroLabel: {
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  macroValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  macroSub: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
  },
  portionCard: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    marginBottom: 24,
  },
  portionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  portionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  portionIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  portionTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  portionSubtitle: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 2,
  },
  portionValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  portionValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  portionUnit: {
    color: "#38BDF8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  portionBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    overflow: "hidden",
    marginBottom: 8,
  },
  portionBarMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  portionMetaText: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  portionMetaPercent: {
    color: "#38BDF8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  actionsContainer: {
    gap: 12,
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  saveGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  saveButtonText: {
    color: "#050811",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  scanAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
  },
  scanAgainText: {
    color: "#38BDF8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
});
