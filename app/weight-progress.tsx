import { WorkoutHeader } from "@/features/workouts";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Calendar,
  Flame,
  Plus,
  Scale,
  Sparkles,
  Target,
  TrendingDown,
  X,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Circle,
  Defs,
  Line as SvgLine,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
} from "react-native-svg";

const { width } = Dimensions.get("window");

type TabType = "WEEKLY" | "MONTHLY" | "3 MONTHS";

interface TrendPoint {
  label: string;
  weight: number;
}

export default function WeightProgressScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabType>("MONTHLY");
  const [currentWeight, setCurrentWeight] = useState(72.4);
  const targetWeight = 68.0;
  const remainingWeight = Math.max(0, currentWeight - targetWeight);

  // Modal for logging new weight
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);
  const [inputWeight, setInputWeight] = useState("");

  const triggerHaptic = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const handleTabPress = (tab: TabType) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTab(tab);
  };

  const handleOpenLogModal = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setInputWeight(currentWeight.toFixed(1));
    setIsLogModalVisible(true);
  };

  const handleSaveWeight = () => {
    const val = parseFloat(inputWeight);
    if (!isNaN(val) && val > 30 && val < 300) {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
      setCurrentWeight(parseFloat(val.toFixed(1)));
    }
    setIsLogModalVisible(false);
  };

  // Trend dataset for each tab
  const trendData: Record<TabType, TrendPoint[]> = {
    WEEKLY: [
      { label: "MON", weight: 73.2 },
      { label: "TUE", weight: 73.0 },
      { label: "WED", weight: 72.8 },
      { label: "THU", weight: 72.9 },
      { label: "FRI", weight: 72.6 },
      { label: "SAT", weight: 72.5 },
      { label: "SUN", weight: currentWeight },
    ],
    MONTHLY: [
      { label: "WEEK 1", weight: 74.8 },
      { label: "WEEK 2", weight: 74.0 },
      { label: "WEEK 3", weight: 73.1 },
      { label: "WEEK 4", weight: currentWeight },
    ],
    "3 MONTHS": [
      { label: "MONTH 1", weight: 77.2 },
      { label: "MONTH 2", weight: 74.8 },
      { label: "MONTH 3", weight: currentWeight },
      { label: "CURRENT", weight: currentWeight },
    ],
  };

  const currentPoints = trendData[selectedTab];

  // Graph dimensions
  const graphWidth = width - 80;
  const graphHeight = 130;

  // Compute SVG curve points from data
  const minW = Math.min(...currentPoints.map((p) => p.weight)) - 0.8;
  const maxW = Math.max(...currentPoints.map((p) => p.weight)) + 0.8;
  const range = maxW - minW || 1;

  const pts = currentPoints.map((p, idx) => {
    const x = 16 + (idx / (currentPoints.length - 1)) * (graphWidth - 32);
    const normalized = (p.weight - minW) / range;
    const y = 25 + (1 - normalized) * (graphHeight - 55);
    return { x, y };
  });

  // Dynamically compute smooth Bezier curve through all points
  const curvePath = pts.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, "");

  const lastPt = pts[pts.length - 1];
  const firstPt = pts[0];
  const areaPath = `${curvePath} L ${lastPt.x} ${graphHeight} L ${firstPt.x} ${graphHeight} Z`;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Unified WorkoutHeader with back button enabled */}
      <WorkoutHeader
        transparent={true}
        showBackButton={true}
        onPressBack={() => {
          triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
          router.canGoBack()
            ? router.back()
            : router.replace("/(tabs)/progress");
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom + 140, 160) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section with Masked Gradient Title (Exact progress.tsx pattern) */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    WEIGHT PROGRESS
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
            Body weight telemetry, metabolic curves & goal trajectory
          </Text>
        </View>

        {/* Current Weight Card (Exact progress.tsx styles.card pattern) */}
        <View style={styles.card}>
          <View style={styles.levelHeaderRow}>
            {/* <View style={styles.sparkleBadge}>
              <Scale color="#38BDF8" size={22} />
            </View> */}
            <View style={styles.levelInfoCol}>
              <Text style={styles.statusLabel}>CURRENT WEIGHT</Text>
              <View style={styles.weightNumberRow}>
                <Text style={styles.levelMainText}>
                  {currentWeight.toFixed(1)}
                </Text>
                <Text style={styles.weightUnit}>KG</Text>
              </View>
            </View>
          </View>

          {/* Sub Metrics: Target and Remaining in card */}
          <View style={styles.prProgressRowFull}>
            <View style={styles.metricSubCol}>
              <View style={styles.inlineIconLabel}>
                <Target size={12} color="#64748B" style={{ marginRight: 5 }} />
                <Text style={styles.prProgressLabel}>TARGET</Text>
              </View>
              <Text style={styles.targetNumber}>
                {targetWeight.toFixed(1)}{" "}
                <Text style={styles.unitSmall}>kg</Text>
              </Text>
            </View>

            <View style={[styles.metricSubCol, { alignItems: "flex-end" }]}>
              <View style={styles.inlineIconLabel}>
                <Flame size={12} color="#FFB68C" style={{ marginRight: 5 }} />
                <Text style={styles.prProgressLabel}>REMAINING</Text>
              </View>
              <Text style={styles.remainingNumber}>
                {remainingWeight.toFixed(1)}{" "}
                <Text style={styles.unitSmall}>kg</Text>
              </Text>
            </View>
          </View>

          {/* XP-Style Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={["#00f2fe", "#4facfe", "#2DD4BF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill, { width: "72%" }]}
              />
            </View>
            <View style={styles.xpRow}>
              <View style={styles.xpLeftCol}>
                <Text style={styles.xpValue}>72.4</Text>
                <Text style={styles.xpTotal}> / 68.0 KG</Text>
              </View>
              <View style={styles.xpRightCol}>
                <Zap size={11} color="#2DD4BF" style={{ marginRight: 4 }} />
                <Text style={styles.xpNotice}>4.4 KG TO GOAL</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weight Trend Chart Card (styles.card) */}
        <View style={styles.card}>
          <View style={styles.prHeaderFull}>
            {/* <Image
              source={require("../assets/progressSparkle.svg")}
              style={{ width: 36, height: 36 }}
              contentFit="contain"
            /> */}
            <View style={styles.prTitleCol}>
              <Text style={styles.prCardTitle}>WEIGHT TREND</Text>
              <Text style={styles.prCardSub}>
                Metabolic regression & curve telemetry
              </Text>
            </View>
          </View>

          {/* Segment Filter Tabs */}
          <View style={styles.tabContainer}>
            {(["WEEKLY", "MONTHLY", "3 MONTHS"] as TabType[]).map((tab) => {
              const isActive = selectedTab === tab;
              return (
                <Pressable
                  key={tab}
                  style={styles.tabButton}
                  onPress={() => handleTabPress(tab)}
                >
                  {isActive ? (
                    <LinearGradient
                      colors={["#00f2fe", "#4facfe"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.tabActiveGradient}
                    >
                      <Text style={styles.tabTextActive}>{tab}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.tabInactiveInner}>
                      <Text style={styles.tabTextInactive}>{tab}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* SVG Wave Chart Container */}
          <View style={styles.chartWrapper}>
            {/* Subtle grid lines */}
            <View style={styles.chartGridLines}>
              <View style={styles.chartLine} />
              <View style={styles.chartLine} />
              <View style={styles.chartLine} />
            </View>

            <View
              style={{
                height: graphHeight,
                width: graphWidth,
                alignSelf: "center",
              }}
            >
              <Svg width={graphWidth} height={graphHeight}>
                <Defs>
                  <SvgLinearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
                    <Stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.0" />
                  </SvgLinearGradient>
                </Defs>

                {/* Filled gradient area */}
                <Path d={areaPath} fill="url(#waveFill)" />

                {/* Cyan curve line */}
                <Path
                  d={curvePath}
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {pts.map((pt, i) => (
                  <React.Fragment key={i}>
                    <Circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill="rgba(45, 212, 191, 0.35)"
                    />
                    <Circle cx={pt.x} cy={pt.y} r="3.5" fill="#FFFFFF" />
                  </React.Fragment>
                ))}
              </Svg>
            </View>

            {/* Axis Labels */}
            <View style={styles.axisLabelsRow}>
              {currentPoints.map((item, i) => (
                <Text key={i} style={styles.axisLabel}>
                  {item.label}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Metabolic Insight / Quote Card */}
        <View style={styles.insightCard}>
          {/* Subtle star background decorative watermarks */}
          <View style={styles.starWatermarkLarge} pointerEvents="none">
            <Svg width={90} height={90} viewBox="0 0 48 48">
              <Path
                d="M24 0L27.5 16.5L44 20L27.5 23.5L24 40L20.5 23.5L4 20L20.5 16.5L24 0Z"
                fill="rgba(255, 255, 255, 0.03)"
              />
            </Svg>
          </View>
          <View style={styles.starWatermarkSmall} pointerEvents="none">
            <Svg width={46} height={46} viewBox="0 0 48 48">
              <Path
                d="M24 0L27.5 16.5L44 20L27.5 23.5L24 40L20.5 23.5L4 20L20.5 16.5L24 0Z"
                fill="rgba(255, 255, 255, 0.02)"
              />
            </Svg>
          </View>

          <View style={styles.insightContentRow}>
            <Image
              source={require("../assets/progressSparkle.svg")}
              style={styles.insightSparkleImg}
              contentFit="contain"
            />
            <View style={styles.insightTextCol}>
              <Text style={styles.insightMainText}>
                Great progress! You've lost{" "}
                <Text style={styles.insightHighlightText}>2.4 kg</Text> this
                month. Your metabolic efficiency is peaking.
              </Text>
              <Text style={styles.insightSubText}>
                Every small change matters.{"\n"}Stay consistent.
              </Text>
            </View>
          </View>
        </View>

        {/* + LOG WEIGHT Action Button (Matching progress.tsx startWorkoutBtn) */}
        <Pressable style={styles.startWorkoutBtn} onPress={handleOpenLogModal}>
          <LinearGradient
            colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.startWorkoutGradient}
          >
            <Text style={styles.startWorkoutText}>+ LOG MORNING WEIGHT</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>

      {/* Interactive Log Weight Modal */}
      <Modal
        visible={isLogModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLogModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Current Weight</Text>
              <Pressable
                onPress={() => setIsLogModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X color="#94A3B8" size={20} />
              </Pressable>
            </View>

            <Text style={styles.modalSubtitle}>
              Enter your morning body weight reading:
            </Text>

            <View style={styles.modalInputRow}>
              <TextInput
                value={inputWeight}
                onChangeText={setInputWeight}
                keyboardType="decimal-pad"
                style={styles.modalInput}
                autoFocus
                placeholder="72.4"
                placeholderTextColor="#64748B"
              />
              <Text style={styles.modalInputUnit}>kg</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.modalSubmitBtn,
                pressed && { opacity: 0.85 },
              ]}
              onPress={handleSaveWeight}
            >
              <LinearGradient
                colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.modalSubmitGradient}
              >
                <Text style={styles.modalSubmitText}>SAVE WEIGHT</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  titleSection: {
    marginTop: 4,
    marginBottom: 20,
  },
  maskedTitleWrapper: {
    height: 44,
    width: "100%",
    justifyContent: "center",
  },
  maskedTitleView: {
    flex: 1,
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
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    textAlign: "left",
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
    marginBottom: 20,
  },
  levelHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  sparkleBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sparkleBadgeSmall: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  levelInfoCol: {
    flex: 1,
  },
  statusLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  weightNumberRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  levelMainText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
  },
  weightUnit: {
    color: "#38BDF8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "800",
    marginLeft: 6,
  },
  tierPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
  },
  tierPillText: {
    color: "#2DD4BF",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  prProgressRowFull: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  metricSubCol: {
    flex: 1,
  },
  inlineIconLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  prProgressLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  targetNumber: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  remainingNumber: {
    color: "#FFB68C",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  unitSmall: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xpLeftCol: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  xpValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  xpTotal: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  xpRightCol: {
    flexDirection: "row",
    alignItems: "center",
  },
  xpNotice: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  prHeaderFull: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  prTitleCol: {
    flex: 1,
    marginLeft: 12,
  },
  prCardTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  prCardSub: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 2,
  },
  colIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  tabButton: {
    flex: 1,
    height: 34,
    borderRadius: 9,
    overflow: "hidden",
  },
  tabInactiveInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabActiveGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
  },
  tabTextInactive: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "monospace",
  },
  chartWrapper: {
    position: "relative",
  },
  chartGridLines: {
    ...StyleSheet.absoluteFill,
    paddingTop: 25,
    paddingBottom: 40,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    opacity: 0.15,
  },
  chartLine: {
    height: 1,
    backgroundColor: "#94A3B8",
  },
  axisLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 10,
  },
  axisLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontFamily: "monospace",
  },
  /* Insight Card matching screenshot */
  insightCard: {
    backgroundColor: "rgba(22, 24, 34, 0.8)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  starWatermarkLarge: {
    position: "absolute",
    right: -10,
    top: -12,
    opacity: 0.8,
  },
  starWatermarkSmall: {
    position: "absolute",
    right: -12,
    top: 55,
    opacity: 0.6,
  },
  insightContentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  insightSparkleImg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    marginRight: 16,
  },
  insightTextCol: {
    flex: 1,
  },
  insightMainText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 36,
    marginBottom: 10,
  },
  insightHighlightText: {
    color: "#2DD4BF",
    fontWeight: "800",
  },
  insightSubText: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  startWorkoutBtn: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 4,
  },
  startWorkoutGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  startWorkoutText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    marginBottom: 20,
  },
  modalInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  modalInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  modalInputUnit: {
    color: "#38BDF8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  modalSubmitBtn: {
    height: 46,
    borderRadius: 14,
    overflow: "hidden",
  },
  modalSubmitGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalSubmitText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
