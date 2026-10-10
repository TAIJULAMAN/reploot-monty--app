import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Mail, RotateCcw } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>CHECK</Text>
        <View style={styles.emailRow}>
          <Text style={styles.heroTitle}>EMAIL</Text>
        </View>

        <LinearGradient
          colors={["#FED7AA", "#FFEDD5", "rgba(254, 215, 170, 0)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.todayUnderline}
        />
        <Text style={styles.subtitle}>
          We sent a magic link to your inbox. Tap it to get back in the game.
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
          </LinearGradient>
        </View>
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
    fontWeight: "700",
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
