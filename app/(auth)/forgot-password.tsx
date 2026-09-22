import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  RotateCcw,
  Star,
  Zap,
} from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ForgotPasswordBackground,
  NeonBorderInput,
  SecurityStrengthBar,
  SparkleDecoration,
} from "@/features/auth";

type ForgotPasswordStep = "request" | "check_email" | "new_password";

export default function ForgotPasswordRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState<ForgotPasswordStep>("request");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
    if (step === "new_password") {
      setStep("check_email");
    } else if (step === "check_email") {
      setStep("request");
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  };

  const handleSendResetLink = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // Haptics fallback
    }
    setStep("check_email");
  };

  const handleOpenMailApp = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // Haptics fallback
    }
    // Attempt to open native mail app, with fallback to advancing to new_password
    if (Platform.OS === "ios") {
      Linking.openURL("message:").catch(() => setStep("new_password"));
    } else {
      Linking.openURL("mailto:").catch(() => setStep("new_password"));
    }
  };

  const handleResendEmail = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // Haptics fallback
    }
  };

  const handleUpdatePassword = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // Haptics fallback
    }
    router.replace("/(auth)/sign-in");
  };

  const handleCancelAndReturn = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.root}>
      {/* Dark Ambient Background with Atmospheric Lines & Glows */}
      <ForgotPasswordBackground />

      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flexOne}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top, 16) + 8,
              paddingBottom: Math.max(insets.bottom, 16) + 20,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Bar: Circular Outlined Back Button & KINETQX Wordmark */}
          <View style={styles.topBar}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.buttonPressed,
              ]}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2.2} />
            </Pressable>

            <Text style={styles.wordmark}>KINETQX</Text>
          </View>

          {/* ========================================================= */}
          {/* PHASE 1: RESET PASSWORD (Enter Email)                      */}
          {/* ========================================================= */}
          {step === "request" && (
            <View style={styles.contentContainer}>
              {/* Hero Section */}
              <View style={styles.heroSection}>
                {/* Floating Top-Right Sparkle Cluster */}
                <View style={styles.resetSparklePosition}>
                  <SparkleDecoration size={36} color="#2DD4BF" />
                </View>

                <Text style={styles.heroTitle}>RESET</Text>
                <Text style={styles.heroTitle}>PASSWORD</Text>

                <Text style={styles.subtitle}>
                  No sweat! Enter your email and we'll get you back to the
                  grind.
                </Text>
              </View>

              {/* Neon Gradient Border Email Input */}
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

              {/* Primary Action Button: SEND RESET LINK */}
              <View style={styles.actionButtonWrapper}>
                <Pressable
                  onPress={handleSendResetLink}
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

              {/* Atmospheric Floating Lightning Bolt */}
              <View style={styles.bottomZapPosition}>
                <Zap
                  size={30}
                  color="#10B981"
                  fill="#10B981"
                  style={styles.zapIcon}
                />
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* PHASE 2: CHECK EMAIL (Magic Link Sent Confirmation)       */}
          {/* ========================================================= */}
          {step === "check_email" && (
            <View style={styles.contentContainer}>
              {/* Top Floating Lightning Bolt on Left */}
              <View style={styles.checkEmailZapPosition}>
                <Zap size={26} color="#2DD4BF" fill="#2DD4BF" />
              </View>

              {/* Hero Section */}
              <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>CHECK</Text>
                <View style={styles.emailRow}>
                  <Text style={styles.heroTitle}>EMAIL</Text>
                  <View style={styles.emailSparklePosition}>
                    <SparkleDecoration size={32} color="#2DD4BF" />
                  </View>
                </View>

                <Text style={styles.subtitle}>
                  We sent a magic link to your inbox. Tap it to get back in the
                  game.
                </Text>
              </View>

              {/* Primary Action Button: OPEN MAIL APP */}
              <View style={styles.actionButtonWrapper}>
                <Pressable
                  onPress={handleOpenMailApp}
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

              {/* Secondary Action: RESEND EMAIL */}
              <Pressable
                onPress={handleResendEmail}
                style={({ pressed }) => [
                  styles.resendButton,
                  pressed && styles.buttonPressed,
                ]}
                hitSlop={12}
              >
                <RotateCcw
                  size={15}
                  color="#94A3B8"
                  style={styles.resendIcon}
                />
                <Text style={styles.resendText}>RESEND EMAIL</Text>
              </Pressable>

              {/* Bottom Subtle Star Decoration */}
              <View style={styles.checkEmailStarPosition}>
                <Star size={20} color="#2DD4BF" fill="#2DD4BF" opacity={0.35} />
              </View>

              {/* Footer Encryption Caption */}
              <View style={styles.encryptionFooter}>
                <Text style={styles.encryptionText}>
                  KINETIC AI ENCRYPTION ACTIVE
                </Text>
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* PHASE 3: NEW PASSWORD (Choose Fresh Password)             */}
          {/* ========================================================= */}
          {step === "new_password" && (
            <View style={styles.contentContainer}>
              {/* Hero Section */}
              <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>NEW</Text>
                <Text style={styles.heroTitle}>PASSWORD</Text>

                <Text style={styles.subtitle}>
                  Time for a fresh start. Choose a strong one this time!
                </Text>
              </View>

              {/* New Password Input */}
              <NeonBorderInput
                label="NEW PASSWORD"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="••••••••••••"
                secureTextEntry={!showNewPassword}
                leftIcon={<Lock size={20} color="#2DD4BF" />}
                rightIcon={
                  <Pressable
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    hitSlop={10}
                  >
                    {showNewPassword ? (
                      <EyeOff size={20} color="#2DD4BF" />
                    ) : (
                      <Eye size={20} color="#2DD4BF" />
                    )}
                  </Pressable>
                }
              />

              {/* Confirm Password Input */}
              <NeonBorderInput
                label="CONFIRM PASSWORD"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••••••"
                secureTextEntry={!showConfirmPassword}
                leftIcon={<RotateCcw size={20} color="#2DD4BF" />}
                rightIcon={
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    hitSlop={10}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#2DD4BF" />
                    ) : (
                      <Eye size={20} color="#2DD4BF" />
                    )}
                  </Pressable>
                }
              />

              {/* Security Strength Indicator */}
              <SecurityStrengthBar strength="STRONG" />

              {/* Small Floating Lightning Bolt below Strength Bar */}
              <View style={styles.strengthZapPosition}>
                <Zap size={22} color="#10B981" fill="#10B981" opacity={0.45} />
              </View>

              {/* Primary Action Button: UPDATE PASSWORD */}
              <View style={styles.actionButtonWrapper}>
                <Pressable
                  onPress={handleUpdatePassword}
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
                    <Text style={styles.actionButtonText}>UPDATE PASSWORD</Text>
                  </LinearGradient>
                </Pressable>
              </View>

              {/* Secondary Link: CANCEL & RETURN */}
              <Pressable
                onPress={handleCancelAndReturn}
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.buttonPressed,
                ]}
                hitSlop={12}
              >
                <Text style={styles.cancelText}>CANCEL & RETURN</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#070A12",
  },
  flexOne: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
  },

  /* Top Navigation Bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.32)",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    alignItems: "center",
    justifyContent: "center",
  },
  wordmark: {
    color: "#0284C7",
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  /* Content Wrapper */
  contentContainer: {
    flex: 1,
    position: "relative",
  },

  /* Hero Typography & Glow */
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

  /* Phase 1 Sparkle & Zap */
  resetSparklePosition: {
    position: "absolute",
    top: 4,
    right: 28,
    zIndex: 2,
  },
  inputSpacing: {
    marginBottom: 24,
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

  /* Phase 2 Specific */
  checkEmailZapPosition: {
    marginBottom: 16,
    marginLeft: 4,
    opacity: 0.65,
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailSparklePosition: {
    marginLeft: 16,
    marginBottom: 4,
  },
  mailButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mailIcon: {
    marginRight: 10,
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

  /* Phase 3 Specific */
  strengthZapPosition: {
    position: "absolute",
    right: 20,
    top: 338,
    opacity: 0.45,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    paddingVertical: 8,
  },
  cancelText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },

  /* Action Buttons */
  actionButtonWrapper: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
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
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  /* Utility */
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
