import { LinearGradient } from "expo-linear-gradient";
import { Mail, RotateCcw, Star, Zap } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SparkleDecoration } from "./SparkleDecoration";

export interface ForgotPasswordCheckEmailStepProps {
  onOpenMailApp: () => void;
  onResendEmail: () => void;
}

export function ForgotPasswordCheckEmailStep({
  onOpenMailApp,
  onResendEmail,
}: ForgotPasswordCheckEmailStepProps) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.checkEmailZapPosition}>
        <Zap size={26} color="#2DD4BF" fill="#2DD4BF" />
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>CHECK</Text>
        <View style={styles.emailRow}>
          <Text style={styles.heroTitle}>EMAIL</Text>
          <View style={styles.emailSparklePosition}>
            <SparkleDecoration size={32} color="#2DD4BF" />
          </View>
        </View>

        <Text style={styles.subtitle}>
          We sent a magic link to your inbox. Tap it to get back in the game.
        </Text>
      </View>

      <View style={styles.actionButtonWrapper}>
        <Pressable
          onPress={onOpenMailApp}
          style={({ pressed }) => [
            styles.fullWidth,
            pressed && styles.buttonPressed,
          ]}
        >
          <LinearGradient
            colors={["#3568A5", "#4B85C4", "#69A6E3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.actionGradient}
          >
            <View style={styles.mailButtonContent}>
              <Mail size={20} color="#FFFFFF" style={styles.mailIcon} />
              <Text style={styles.actionButtonText}>OPEN MAIL APP</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>

      <Pressable
        onPress={onResendEmail}
        style={({ pressed }) => [
          styles.resendButton,
          pressed && styles.buttonPressed,
        ]}
        hitSlop={12}
      >
        <RotateCcw size={15} color="#94A3B8" style={styles.resendIcon} />
        <Text style={styles.resendText}>RESEND EMAIL</Text>
      </Pressable>

      <View style={styles.checkEmailStarPosition}>
        <Star size={20} color="#2DD4BF" fill="#2DD4BF" opacity={0.35} />
      </View>

      <View style={styles.encryptionFooter}>
        <Text style={styles.encryptionText}>KINETIC AI ENCRYPTION ACTIVE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  checkEmailZapPosition: {
    marginBottom: 16,
    marginLeft: 4,
    opacity: 0.65,
  },
  heroSection: {
    position: "relative",
    marginBottom: 32,
    paddingLeft: 2,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(34, 211, 238, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailSparklePosition: {
    marginLeft: 16,
    marginBottom: 4,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 320,
  },
  actionButtonWrapper: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%",
    height: "100%",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  actionGradient: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  mailButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mailIcon: {
    marginRight: 10,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    paddingVertical: 10,
  },
  resendIcon: {
    marginRight: 8,
  },
  resendText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  checkEmailStarPosition: {
    marginTop: 48,
    marginLeft: 16,
  },
  encryptionFooter: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    paddingTop: 40,
    paddingBottom: 8,
  },
  encryptionText: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
