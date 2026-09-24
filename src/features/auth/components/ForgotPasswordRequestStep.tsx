import { LinearGradient } from "expo-linear-gradient";
import { Mail, Zap } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NeonBorderInput } from "./NeonBorderInput";
import { SparkleDecoration } from "./SparkleDecoration";

export interface ForgotPasswordRequestStepProps {
  email: string;
  setEmail: (val: string) => void;
  onSendResetLink: () => void;
}

export function ForgotPasswordRequestStep({
  email,
  setEmail,
  onSendResetLink,
}: ForgotPasswordRequestStepProps) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.heroSection}>
        <View style={styles.resetSparklePosition}>
          <SparkleDecoration size={36} color="#2DD4BF" />
        </View>

        <Text style={styles.heroTitle}>RESET</Text>
        <Text style={styles.heroTitle}>PASSWORD</Text>

        <Text style={styles.subtitle}>
          No sweat! Enter your email and we'll get you back to the grind.
        </Text>
      </View>

      <NeonBorderInput
        value={email}
        onChangeText={setEmail}
        placeholder="GymHero@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon={<Mail size={20} color="#94A3B8" />}
        containerStyle={styles.inputSpacing}
      />

      <View style={styles.actionButtonWrapper}>
        <Pressable
          onPress={onSendResetLink}
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
            <Text style={styles.actionButtonText}>SEND RESET LINK</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <View style={styles.bottomZapPosition}>
        <Zap size={30} color="#10B981" fill="#10B981" style={styles.zapIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position: "relative",
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
  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 320,
  },
  resetSparklePosition: {
    position: "absolute",
    top: 4,
    right: 28,
    zIndex: 2,
  },
  inputSpacing: {
    marginBottom: 24,
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
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  bottomZapPosition: {
    position: "absolute",
    right: 24,
    bottom: 20,
    opacity: 0.45,
  },
  zapIcon: {
    transform: [{ rotate: "15deg" }],
  },
});
