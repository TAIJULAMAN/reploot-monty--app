import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { AlertCircle, FileCheck, Scale } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function TermsRoute() {
  const insets = useSafeAreaInsets();

  const articles = [
    {
      icon: <Scale size={18} color="#38BDF8" />,
      title: "ARTICLE I: ACCEPTANCE OF PROTOCOLS",
      body: "By initializing and operating the Kinetqx application, the athlete agrees to abide by all operational guidelines, kinetic algorithmic telemetry standards, and safety advisories outlined within this document.",
    },
    {
      icon: <FileCheck size={18} color="#38BDF8" />,
      title: "ARTICLE II: ATHLETIC ACCOUNT INTEGRITY",
      body: "Athletes are solely responsible for safeguarding credentials. Tampering with global arena leaderboards, falsifying motion data, or attempting unauthorized API access results in immediate session revocation.",
    },
    {
      icon: <AlertCircle size={18} color="#38BDF8" />,
      title: "ARTICLE III: PHYSICAL READINESS & DISCLAIMER",
      body: "Kinetqx provides AI-assisted conditioning guidance. Athletes should consult qualified medical physicians prior to engaging in high-intensity hypertrophy, plyometric, or cardiovascular routines.",
    },
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
                    TERMS OF SERVICE
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
            Platform compliance, athletic integrity & usage policies
          </Text>
        </View>

        {/* Terms Cards */}
        <View style={styles.cardsContainer}>
          {articles.map((article, idx) => (
            <View key={idx} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconBadge}>{article.icon}</View>
                <Text style={styles.cardTitle}>{article.title}</Text>
              </View>
              <Text style={styles.cardBody}>{article.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerBadge}>
          <Text style={styles.footerText}>
            EFFECTIVE DATE: OCTOBER 2026 • ALL RIGHTS RESERVED KINETQX INC.
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
