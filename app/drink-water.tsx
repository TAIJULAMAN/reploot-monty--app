import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Check,
  Droplet,
  GlassWater,
  Plus,
  Sparkles,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
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

const { width } = Dimensions.get("window");

export default function DrinkWaterScreen() {
  const insets = useSafeAreaInsets();
  const [currentLiters, setCurrentLiters] = useState(1.8);
  const [waterInput, setWaterInput] = useState("");
  const targetLiters = 3.0;

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleQuickAdd = (ml: number) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setCurrentLiters((prev) => +(Math.min(prev + ml / 1000, 6.0)).toFixed(2));
  };

  const handleAddCustom = () => {
    const val = parseFloat(waterInput);
    if (!isNaN(val) && val > 0) {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
      setCurrentLiters((prev) => +(Math.min(prev + val / 1000, 6.0)).toFixed(2));
      setWaterInput("");
    }
  };

  const handleSaveAndExit = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    router.back();
  };

  const progressPercentage = Math.min(
    Math.round((currentLiters / targetLiters) * 100),
    100
  );
  const remainingLiters = Math.max(+(targetLiters - currentLiters).toFixed(2), 0);

  const quickPacks = [
    { label: "+250 ML", amount: 250, desc: "Standard Glass" },
    { label: "+500 ML", amount: 500, desc: "Water Bottle" },
    { label: "+750 ML", amount: 750, desc: "Cycling Flask" },
    { label: "+1,000 ML", amount: 1000, desc: "Hydration Shaker" },
  ];

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
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                  >
                    DRINK WATER
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
            Metabolic cellular replenishment & athletic hydration protocol
          </Text>
        </View>

        {/* Main Hydration Telemetry Card */}
        <View style={styles.card}>
          <View style={styles.badgeRow}>
            <View style={styles.badgePill}>
              <View style={styles.dot} />
              <Text style={styles.badgeText}>CURRENT HYDRATION</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>
                {progressPercentage >= 100 ? "OPTIMAL" : "HYDRATING"}
              </Text>
            </View>
          </View>

          {/* Amount Display */}
          <View style={styles.amountRow}>
            <Text style={styles.mainAmount}>{currentLiters.toFixed(1)}</Text>
            <Text style={styles.unitAmount}>L</Text>
          </View>

          {/* Progress Track */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={["#00f2fe", "#4facfe", "#2DD4BF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  StyleSheet.absoluteFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>

            <View style={styles.progressMetaRow}>
              <Text style={styles.metaLabel}>
                GOAL: {targetLiters.toFixed(1)} L
              </Text>
              <Text style={styles.metaPercent}>
                {progressPercentage}% REACHED
              </Text>
              <Text style={styles.metaRemaining}>
                {remainingLiters > 0
                  ? `${remainingLiters} L REMAINING`
                  : "TARGET MET"}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Add Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.iconBadge}>
            <Droplet size={13} color="#38BDF8" />
          </View>
          <Text style={styles.sectionTitle}>QUICK VOLUME LOG</Text>
          <Text style={styles.sectionSub}>TAP TO REPLENISH</Text>
        </View>

        <View style={styles.quickAddGrid}>
          {quickPacks.map((pack, idx) => (
            <Pressable
              key={idx}
              style={styles.quickAddBox}
              onPress={() => handleQuickAdd(pack.amount)}
            >
              <View style={styles.quickAddIconWrapper}>
                <Droplet color="#38BDF8" size={18} />
              </View>
              <Text style={styles.quickAddAmount}>{pack.label}</Text>
              <Text style={styles.quickAddDesc}>{pack.desc}</Text>
            </Pressable>
          ))}
        </View>

        {/* Custom Volume Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.iconBadge}>
            <GlassWater size={13} color="#38BDF8" />
          </View>
          <Text style={styles.sectionTitle}>CUSTOM VOLUME</Text>
        </View>

        <View style={styles.customInputContainer}>
          <Droplet color="#38BDF8" size={16} />
          <TextInput
            style={styles.customInput}
            placeholder="0"
            placeholderTextColor="#64748B"
            keyboardType="number-pad"
            value={waterInput}
            onChangeText={(text) =>
              setWaterInput(text.replace(/[^0-9]/g, ""))
            }
            maxLength={5}
          />
          <Text style={styles.customInputUnit}>ML</Text>
          <Pressable
            style={styles.inlineAddBtn}
            onPress={handleAddCustom}
          >
            <Plus size={12} color="#050811" style={{ marginRight: 2 }} />
            <Text style={styles.inlineAddText}>LOG</Text>
          </Pressable>
        </View>

        {/* Save & Confirm Button */}
        <Pressable
          style={styles.saveBtnWrapper}
          onPress={handleSaveAndExit}
        >
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.saveBtn}
          >
            <Check size={16} color="#050811" style={{ marginRight: 8 }} />
            <Text style={styles.saveBtnText}>SAVE HYDRATION LOG</Text>
          </LinearGradient>
        </Pressable>
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
    borderColor: "rgba(56, 189, 248, 0.35)",
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2DD4BF",
    marginRight: 6,
  },
  badgeText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  statusPill: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
  },
  statusPillText: {
    color: "#38BDF8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 12,
  },
  mainAmount: {
    color: "#FFFFFF",
    fontSize: 68,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
    lineHeight: 76,
  },
  unitAmount: {
    color: "#38BDF8",
    fontSize: 22,
    fontFamily: "monospace",
    fontWeight: "900",
    marginLeft: 6,
  },
  progressContainer: {
    width: "100%",
    marginTop: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  metaPercent: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  metaRemaining: {
    color: "#2DD4BF",
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
  sectionSub: {
    color: "#64748B",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
  },
  quickAddGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginBottom: 24,
  },
  quickAddBox: {
    width: (width - 40 - 12) / 2,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  quickAddIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  quickAddAmount: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  quickAddDesc: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  customInputContainer: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 24,
  },
  customInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    marginLeft: 10,
  },
  customInputUnit: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
    marginRight: 12,
  },
  inlineAddBtn: {
    backgroundColor: "#00f2fe",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  inlineAddText: {
    color: "#050811",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  saveBtnWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  saveBtnText: {
    color: "#050811",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
});
