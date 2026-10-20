import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Check, Sparkles, Zap } from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function ManagePlanRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/profile");
    }
  };

  const handleCycleChange = (cycle: "monthly" | "annual") => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setBillingCycle(cycle);
  };

  const handleSelectPlan = (planId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    setSelectedPlan(planId);
    const planName =
      planId === "elite"
        ? "APEX ATHLETE"
        : planId === "free"
          ? "ROOKIE FREE"
          : "REPLOOT PRO";
    setToastMessage(`TIER SYNCHRONIZED: ${planName}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const plans = [
    {
      id: "free",
      name: "ROOKIE",
      badge: null,
      price: "$0",
      period: "forever",
      description: "Fundamental telemetry & standard workout logging",
      features: [
        "Standard Workout Logging",
        "Global Community Rankings",
        "Daily Mission Tracker",
        "Basic Profile Telemetry",
      ],
      isCurrent: false,
      cta: "DOWNGRADE TO FREE",
    },
    {
      id: "pro",
      name: "REPLOOT PRO",
      badge: "ACTIVE PLAN",
      price: billingCycle === "monthly" ? "$9.99" : "$7.49",
      period: billingCycle === "monthly" ? "/month" : "/mo (billed $89/yr)",
      description: "Full AI kinetic intelligence & real-time HUD analysis",
      features: [
        "Unlimited AI Kinetic Coaching",
        "Real-Time Biometric HUD Tracking",
        "Form Correction & Video Telemetry",
        "Priority Global Arena Battles",
        "Unlimited Routine Cloud Backups",
      ],
      isCurrent: true,
      cta: "CURRENT ACTIVE PLAN",
    },
    {
      id: "elite",
      name: "APEX ATHLETE",
      badge: "ELITE PERFORMANCE",
      price: billingCycle === "monthly" ? "$19.99" : "$14.99",
      period: billingCycle === "monthly" ? "/month" : "/mo (billed $179/yr)",
      description:
        "Pro human coaching integration & customized hypertrophy engine",
      features: [
        "Everything in Reploot Pro",
        "1-on-1 Dedicated Human Coach Support",
        "Custom Macro & Nutrition Engine",
        "Verified Apex Gold Profile Emblem",
        "Early Beta Access to Kinetic Hardware",
      ],
      isCurrent: false,
      cta: "UPGRADE TO APEX",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <CustomHeader
        titleVariant="text"
        title=""
        showBackButton={true}
        onPressBack={handleBack}
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
                    MEMBERSHIP PLANS
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
            Select your training protocol & upgrade your athletic performance
          </Text>
        </View>

        {/* Billing Cycle Switcher */}
        <View style={styles.cycleContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.cycleTab,
              billingCycle === "monthly" && styles.cycleTabActive,
            ]}
            onPress={() => handleCycleChange("monthly")}
          >
            <Text
              style={[
                styles.cycleText,
                billingCycle === "monthly" && styles.cycleTextActive,
              ]}
            >
              MONTHLY
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.cycleTab,
              billingCycle === "annual" && styles.cycleTabActive,
            ]}
            onPress={() => handleCycleChange("annual")}
          >
            <Text
              style={[
                styles.cycleText,
                billingCycle === "annual" && styles.cycleTextActive,
              ]}
            >
              ANNUAL
            </Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>SAVE 25%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Plans List */}
        <View style={styles.plansList}>
          {plans.map((plan) => {
            const isHighlight = plan.id === "pro";
            const isApex = plan.id === "elite";
            const isSelected = selectedPlan === plan.id;

            return (
              <View
                key={plan.id}
                style={[
                  styles.planCard,
                  isHighlight && styles.planCardHighlight,
                  isApex && styles.planCardApex,
                  isSelected && styles.planCardSelected,
                ]}
              >
                {/* Header row with Badge */}
                <View style={styles.planHeaderRow}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  {plan.badge && (
                    <View
                      style={[
                        styles.badgePill,
                        isHighlight && styles.badgePillCyan,
                        isApex && styles.badgePillGold,
                      ]}
                    >
                      {isHighlight ? (
                        <Sparkles
                          size={11}
                          color="#38BDF8"
                          style={{ marginRight: 4 }}
                        />
                      ) : (
                        <Zap
                          size={11}
                          color="#FFB68C"
                          style={{ marginRight: 4 }}
                        />
                      )}
                      <Text
                        style={[
                          styles.badgeText,
                          isHighlight && { color: "#38BDF8" },
                          isApex && { color: "#FFB68C" },
                        ]}
                      >
                        {plan.badge}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Price block */}
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>{plan.price}</Text>
                  <Text style={styles.periodText}>{plan.period}</Text>
                </View>

                <Text style={styles.descriptionText}>{plan.description}</Text>

                {/* Divider */}
                <View style={styles.cardDivider} />

                {/* Features Checklist */}
                <View style={styles.featuresList}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <View
                        style={[
                          styles.checkCircle,
                          isHighlight && styles.checkCircleCyan,
                          isApex && styles.checkCircleGold,
                        ]}
                      >
                        <Check
                          size={11}
                          color={
                            isApex
                              ? "#FFB68C"
                              : isHighlight
                                ? "#38BDF8"
                                : "#94A3B8"
                          }
                        />
                      </View>
                      <Text style={styles.featureLabel}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {/* Call to action button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.ctaBtn}
                  onPress={() => handleSelectPlan(plan.id)}
                >
                  {plan.isCurrent ? (
                    <View style={styles.currentPlanBtn}>
                      <Text style={styles.currentPlanBtnText}>{plan.cta}</Text>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={
                        isApex
                          ? ["#D97706", "#EA580C", "#F97316"]
                          : ["#0284C7", "#0EA5E9", "#38BDF8"]
                      }
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.ctaGradient}
                    >
                      <Text style={styles.ctaBtnText}>{plan.cta}</Text>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Cyber HUD Toast */}
      {toastMessage && (
        <View style={styles.savedToast}>
          <Check size={16} color="#00f2fe" style={{ marginRight: 8 }} />
          <Text style={styles.savedToastText}>{toastMessage}</Text>
        </View>
      )}
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
  cycleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 20,
  },
  cycleTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  cycleTabActive: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
  },
  cycleText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  cycleTextActive: {
    color: "#FFFFFF",
  },
  discountBadge: {
    backgroundColor: "rgba(45, 212, 191, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.35)",
  },
  discountText: {
    color: "#2DD4BF",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  plansList: {
    gap: 16,
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
  },
  planCardHighlight: {
    borderColor: "rgba(56, 189, 248, 0.4)",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
  },
  planCardApex: {
    borderColor: "rgba(255, 182, 140, 0.35)",
  },
  planCardSelected: {
    borderWidth: 1.5,
  },
  planHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  planName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgePillCyan: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "rgba(56, 189, 248, 0.3)",
  },
  badgePillGold: {
    backgroundColor: "rgba(255, 182, 140, 0.12)",
    borderColor: "rgba(255, 182, 140, 0.3)",
  },
  badgeText: {
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 6,
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  periodText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  descriptionText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 16,
    marginBottom: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 16,
  },
  featuresList: {
    gap: 10,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkCircleCyan: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
  },
  checkCircleGold: {
    backgroundColor: "rgba(255, 182, 140, 0.12)",
  },
  featureLabel: {
    color: "#CBD5E1",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "600",
    flex: 1,
  },
  ctaBtn: {
    borderRadius: 14,
    overflow: "hidden",
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  ctaGradient: {
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  currentPlanBtn: {
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: 14,
  },
  currentPlanBtnText: {
    color: "#38BDF8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  savedToast: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7, 10, 17, 0.95)",
    borderWidth: 1.5,
    borderColor: "#00f2fe",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    zIndex: 9999,
    elevation: 12,
    shadowColor: "#00f2fe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  savedToastText: {
    color: "#00f2fe",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
  },
});
