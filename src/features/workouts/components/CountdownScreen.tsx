import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Svg, { Line as SvgLine } from "react-native-svg";

const { width } = Dimensions.get("window");

export interface CountdownScreenProps {
  onCountdownComplete?: () => void;
  onCancel?: () => void;
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({
  onCountdownComplete,
  onCancel,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(3);

  useEffect(() => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // When countdown reaches 0, trigger onCountdownComplete safely outside of render/updater
  useEffect(() => {
    if (secondsLeft === 0) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        ).catch(() => {});
      }
      const timeout = setTimeout(() => {
        onCountdownComplete?.();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [secondsLeft, onCountdownComplete]);

  return (
    <View style={styles.screen}>
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
        </Svg>
      </View>

      <CustomHeader transparent={true} showBackButton={false} />

      <View style={styles.centerContainer}>
        {/* Top Header Tag: INITIALIZING PROTOCOL */}
        <Text style={styles.protocolTag}>INITIALIZING PROTOCOL</Text>

        {/* Big Neon Countdown Number: 3 -> 2 -> 1 */}
        <View style={styles.numberWrapper}>
          <Text style={styles.countdownBigNumber}>
            {secondsLeft > 0 ? secondsLeft : "GO"}
          </Text>
        </View>

        {/* 3 Progress Dots */}
        <View style={styles.dotsRow}>
          <View
            style={[styles.dot, secondsLeft >= 3 && styles.dotActive]}
          />
          <View
            style={[styles.dot, secondsLeft === 2 && styles.dotActive]}
          />
          <View
            style={[styles.dot, secondsLeft <= 1 && styles.dotActive]}
          />
        </View>
      </View>

      {/* Bottom Footer Text */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Prepare for Maximum Intensity</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070A11",
    justifyContent: "space-between",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  protocolTag: {
    color: "#38EDD8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 2.2,
    textTransform: "uppercase",
    marginBottom: 40,
  },
  numberWrapper: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  countdownBigNumber: {
    fontSize: 130,
    lineHeight: 140,
    fontFamily: "monospace",
    fontWeight: "900",
    color: "#4FACFE",
    textShadowColor: "rgba(0, 242, 254, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 36,
    textAlign: "center",
    ...(Platform.OS === "web"
      ? ({
          filter: "drop-shadow(0 0 30px rgba(0, 242, 254, 0.85))",
        } as any)
      : {}),
  },
  dotsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  dotActive: {
    backgroundColor: "#38EDD8",
    shadowColor: "#38EDD8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: 48,
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "600",
  },
});
