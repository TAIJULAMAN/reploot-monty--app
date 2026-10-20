import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Cpu, Globe, Sparkles } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function AboutRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile/account-settings");
    }
  };

  const specs = [
    {
      icon: <Cpu size={18} color="#38BDF8" />,
      title: "KINETIC ENGINE V2.4",
      desc: "Hyper-accurate motion telemetry modeling running at 60 FPS on-device neural processing.",
    },
    {
      icon: <Sparkles size={18} color="#38BDF8" />,
      title: "ADAPTIVE RESISTANCE AI",
      desc: "Real-time mechanical fatigue tracking adjusting set tempos and reps based on live velocity.",
    },
    {
      icon: <Globe size={18} color="#38BDF8" />,
      title: "DECENTRALIZED ARENA",
      desc: "Synchronized global leaderboards connecting thousands of elite athletes worldwide.",
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
                    ABOUT KINETQX
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
            Athletic engineering, neural biomechanics & release architecture
          </Text>
        </View>

        {/* Specs Cards */}
        <View style={styles.cardsContainer}>
          {specs.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconBadge}>{item.icon}</View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardBody}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* System Build Info Card */}
        <View style={styles.buildCard}>
          <View style={styles.buildRow}>
            <Text style={styles.buildLabel}>RELEASE BUILD</Text>
            <Text style={styles.buildValue}>2.4.0 (2026.10)</Text>
          </View>
          <View style={styles.buildRow}>
            <Text style={styles.buildLabel}>NEURAL RUNTIME</Text>
            <Text style={styles.buildValue}>KINETIC-CORE-V2</Text>
          </View>
          <View style={styles.buildRow}>
            <Text style={styles.buildLabel}>INFRASTRUCTURE</Text>
            <Text style={styles.buildValue}>AWS AP-NORTHEAST-1</Text>
          </View>
        </View>

        <View style={styles.footerBadge}>
          <Text style={styles.footerText}>
            ENGINEERED WITH PASSION FOR ELITE HUMAN PERFORMANCE
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
  buildCard: {
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    padding: 16,
    gap: 10,
    marginBottom: 20,
  },
  buildRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buildLabel: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
  },
  buildValue: {
    color: "#38BDF8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
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
