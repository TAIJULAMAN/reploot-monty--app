import { LinearGradient } from "expo-linear-gradient";
import { Mail, Zap } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthDarkPillInput } from "./AuthDarkPillInput";
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
        <Text style={styles.heroTitle}>RESET</Text>
        <Text style={styles.heroTitle}>PASSWORD</Text>

        <LinearGradient
          colors={["#FED7AA", "#FFEDD5", "rgba(254, 215, 170, 0)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.todayUnderline}
        />
        <Text style={styles.subtitle}>
          No sweat! Enter your email and we'll get you back to the grind.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={["#462D24", "#2E2644", "#1B1D38"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.inputSpacing}>
              <AuthDarkPillInput
                label="EMAIL"
                value={email}
                onChangeText={setEmail}
                placeholder="GymHero@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                rightIcon={<Mail size={19} color="#CBD5E1" />}
              />
            </View>

            <View style={styles.actionButtonWrapper}>
              <TouchableOpacity
                onPress={onSendResetLink}
                activeOpacity={0.8}
                style={styles.fullWidth}
              >
                <LinearGradient
                  colors={["#3568A5", "#4B85C4", "#69A6E3"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.actionGradient}
                >
                  <Text style={styles.actionButtonText}>SEND RESET LINK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
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
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(34, 211, 238, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  todayUnderline: {
    width: 96,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
    marginLeft: 2,
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
  cardContainer: {
    position: "relative",
    width: "100%",
  },
  cardWrapper: {
    borderRadius: 32,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 8,
  },
  cardGradient: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 28,
  },
  inputSpacing: {
    marginBottom: 24,
  },
  actionButtonWrapper: {
    width: "100%",
    height: 52,
    borderRadius: 26,
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
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  bottomZapPosition: {
    position: "absolute",
    right: 24,
    bottom: -10,
    opacity: 0.45,
  },
  zapIcon: {
    transform: [{ rotate: "15deg" }],
  },
});
