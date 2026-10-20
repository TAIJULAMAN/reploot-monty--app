import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Lock, ShieldCheck, UserCheck } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function PrivacyPolicyRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile/account-settings");
    }
  };

  const sections = [
    {
      icon: <ShieldCheck size={18} color="#38BDF8" />,
      title: "1. BIOMETRIC & TELEMETRY DATA",
      body: "Kinetqx collects velocity, motion vector kinematics, and heart rate telemetry solely to optimize your personalized training algorithm. All sensor data is processed via zero-knowledge client cryptographic layers.",
    },
    {
      icon: <Lock size={18} color="#38BDF8" />,
      title: "2. ENCRYPTED CLOUD SYNCHRONIZATION",
      body: "Workout logs and historical analytics are synchronized using AES-256 bit military-grade encryption. We never sell, monetize, or expose athlete biometric data to unauthorized third-party broker networks.",
    },
    {
      icon: <UserCheck size={18} color="#38BDF8" />,
      title: "3. ATHLETE SOVEREIGNTY & CONTROL",
      body: "You maintain complete ownership of your fitness profile. You can export complete telemetry datasets or execute an immutable account purge at any time from your Account Settings terminal.",
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
                    PRIVACY PROTOCOL
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
            Zero-knowledge biometric encryption & athlete data governance
          </Text>
        </View>

        {/* Policy Cards */}
        <View style={styles.cardsContainer}>
          {sections.map((section, idx) => (
            <View key={idx} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconBadge}>{section.icon}</View>
                <Text style={styles.cardTitle}>{section.title}</Text>
              </View>
              <Text style={styles.cardBody}>{section.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerBadge}>
          <Text style={styles.footerText}>
            LAST REVISED: OCTOBER 2026 • COMPLIANT WITH GDPR & CCPA PROTOCOLS
          </Text>
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
  cardsContainer: {
    gap: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 18,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    flex: 1,
  },
  cardBody: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 18,
  },
  footerBadge: {
    alignItems: "center",
    paddingVertical: 12,
  },
  footerText: {
    color: "#475569",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
  },
});
