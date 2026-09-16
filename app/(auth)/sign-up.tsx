import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { ArrowLeft, User, Mail, Lock, ShieldCheck } from "lucide-react-native";

import {
  SignUpBackground,
  ArrowheadDecoration,
  WarmSparkleDecoration,
  AuthDarkPillInput,
  GoogleIcon,
  AppleIcon,
} from "@/features/auth";

export default function SignUpRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/sign-in");
    }
  };

  const handleCreateAccount = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // Haptics fallback
    }
    router.push("/(profile-setup)");
  };

  const handleGoogleSignUp = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
  };

  const handleAppleSignUp = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
  };

  const handleGoToLogin = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.root}>
      {/* Dark Ambient Background with Warm Bronze Glow & Overhead Curved Arc */}
      <SignUpBackground />

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
              paddingBottom: Math.max(insets.bottom, 16) + 16,
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

          {/* Hero Section: JOIN + Turquoise Arrowhead, TODAY + Warm Gradient Bar */}
          <View style={styles.heroSection}>
            {/* Row 1: JOIN + Upward Turquoise Arrowhead */}
            <View style={styles.titleRow}>
              <Text style={styles.heroTitle}>JOIN</Text>
              <View style={styles.arrowheadSlot}>
                <ArrowheadDecoration size={38} color="#2DD4BF" />
              </View>
            </View>

            {/* Row 2: TODAY */}
            <Text style={styles.heroTitle}>TODAY</Text>

            {/* Fading Peach / Amber Underline Accent */}
            <LinearGradient
              colors={["#FED7AA", "#FFEDD5", "rgba(254, 215, 170, 0)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.todayUnderline}
            />
          </View>

          {/* Authentication Panel */}
          <View style={styles.cardContainer}>
            {/* Warm Sparkle Cluster on Right Edge next to Full Name */}
            <View style={styles.cardSparklePosition}>
              <WarmSparkleDecoration size={26} color="#E2B89D" opacity={0.8} />
            </View>

            <View style={styles.cardWrapper}>
              <LinearGradient
                colors={["#462D24", "#2E2644", "#1B1D38"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                {/* Full Name Field */}
                <AuthDarkPillInput
                  label="FULL NAME"
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Alex Sterling"
                  autoCapitalize="words"
                  autoCorrect={false}
                  rightIcon={<User size={19} color="#CBD5E1" />}
                />

                {/* Email Field */}
                <AuthDarkPillInput
                  label="EMAIL"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="alex@kinetic.ai"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  rightIcon={<Mail size={19} color="#CBD5E1" />}
                />

                {/* Password Field */}
                <AuthDarkPillInput
                  label="PASSWORD"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  rightIcon={<Lock size={19} color="#CBD5E1" />}
                />

                {/* Confirm Password Field */}
                <AuthDarkPillInput
                  label="CONFIRM PASSWORD"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  rightIcon={<ShieldCheck size={19} color="#CBD5E1" />}
                  containerStyle={styles.confirmPasswordField}
                />

                {/* Primary Create Account CTA Button - Dedicated Static Container */}
                <View style={styles.createAccountWrapper}>
                  <Pressable
                    onPress={handleCreateAccount}
                    style={({ pressed }) => [
                      styles.fullWidth,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <LinearGradient
                      colors={["#3568A5", "#4B85C4", "#69A6E3"]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.createAccountGradient}
                    >
                      <Text style={styles.createAccountText}>
                        CREATE ACCOUNT
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>

                {/* OR CONTINUE WITH Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social: Continue with Google */}
                <View style={styles.socialButtonWrapper}>
                  <Pressable
                    onPress={handleGoogleSignUp}
                    style={({ pressed }) => [
                      styles.fullWidth,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <View style={styles.socialButtonContainer}>
                      <View style={styles.socialIconBox}>
                        <GoogleIcon size={19} />
                      </View>
                      <Text style={styles.socialButtonText}>
                        Continue with Google
                      </Text>
                    </View>
                  </Pressable>
                </View>

                {/* Social: Continue with Apple */}
                <View style={styles.appleButtonWrapper}>
                  <Pressable
                    onPress={handleAppleSignUp}
                    style={({ pressed }) => [
                      styles.fullWidth,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <View style={styles.socialButtonContainer}>
                      <View style={styles.socialIconBox}>
                        <AppleIcon size={20} color="#FFFFFF" />
                      </View>
                      <Text style={styles.socialButtonText}>
                        Continue with Apple
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Bottom Account CTA */}
          <View style={styles.bottomCtaContainer}>
            <Text style={styles.bottomCtaText}>
              Already have an account?{" "}
              <Text
                style={styles.loginLink}
                onPress={handleGoToLogin}
              >
                Login
              </Text>
            </Text>
          </View>
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
    paddingHorizontal: 20,
  },

  /* Top Navigation Bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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

  /* Hero Section */
  heroSection: {
    position: "relative",
    marginBottom: 22,
    paddingLeft: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowheadSlot: {
    marginLeft: 12,
    marginBottom: 4,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(34, 211, 238, 0.65)",
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

  /* Card Container & Warm Sparkle */
  cardContainer: {
    position: "relative",
    width: "100%",
  },
  cardSparklePosition: {
    position: "absolute",
    right: -8,
    top: 36,
    zIndex: 5,
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

  /* Form Fields Spacing */
  confirmPasswordField: {
    marginBottom: 22,
  },

  /* Primary Create Account Button */
  createAccountWrapper: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 22,
  },
  createAccountGradient: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  createAccountText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },

  /* OR CONTINUE WITH Divider */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  dividerText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginHorizontal: 16,
  },

  /* Social Buttons - Guaranteed Static Layout Margins */
  socialButtonWrapper: {
    width: "100%",
    height: 52,
    marginBottom: 14,
  },
  appleButtonWrapper: {
    width: "100%",
    height: 52,
    marginBottom: 0,
  },
  socialButtonContainer: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.22)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIconBox: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  /* Bottom Account CTA */
  bottomCtaContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  bottomCtaText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
  },
  loginLink: {
    color: "#10B981",
    fontWeight: "700",
  },

  /* Press Feedback */
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
