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
import { ArrowLeft, Lock, AtSign, Dumbbell } from "lucide-react-native";

import {
  AuthBackground,
  SparkleDecoration,
  AuthPillInput,
  GoogleIcon,
  AppleIcon,
} from "@/features/auth";

export default function SignInRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(onboarding)");
    }
  };

  const handleLogin = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // Haptics fallback
    }
    router.push("/(profile-setup)");
  };

  const handleForgotPassword = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
    router.push("/(auth)/forgot-password");
  };

  const handleGoogleLogin = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
  };

  const handleAppleLogin = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
  };

  const handleCreateAccount = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback
    }
    router.push("/(auth)/sign-up");
  };

  return (
    <View style={styles.root}>
      {/* Dark Ambient Background with Subtle Geometric Lines */}
      <AuthBackground />

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

          {/* Hero Section: Sparkle, Title with Clean Cyan Glow, Floating Dumbbell */}
          <View style={styles.heroSection}>
            {/* Sparkle Cluster */}
            <View style={styles.sparklePosition}>
              <SparkleDecoration size={32} />
            </View>

            <Text style={styles.heroTitle}>WELCOME</Text>
            <Text style={styles.heroTitle}>BACK</Text>

            {/* Decorative Rotated Dumbbell floating on right */}
            <View style={styles.dumbbellPosition}>
              <Dumbbell size={32} color="#64748B" style={styles.dumbbellIcon} />
            </View>
          </View>

          {/* Authentication Panel */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={["#2D2852", "#203144", "#153638"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              {/* Email Address Field */}
              <AuthPillInput
                label="EMAIL ADDRESS"
                value={email}
                onChangeText={setEmail}
                placeholder="runner@kinetic.ai"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                rightIcon={<AtSign size={18} color="#94A3B8" />}
              />

              {/* Password Field */}
              <AuthPillInput
                label="PASSWORD"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                rightIcon={<Lock size={18} color="#94A3B8" />}
                containerStyle={styles.passwordField}
              />

              {/* Forgot Password Link */}
              <Pressable
                onPress={handleForgotPassword}
                style={({ pressed }) => [
                  styles.forgotPasswordButton,
                  pressed && styles.buttonPressed,
                ]}
                hitSlop={8}
              >
                <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
              </Pressable>

              {/* Primary Continue CTA Button */}
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.continueButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <LinearGradient
                  colors={["#2B64E3", "#0284C7", "#38BDF8"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.continueGradient}
                >
                  <Text style={styles.continueText}>CONTINUE</Text>
                </LinearGradient>
              </Pressable>

              {/* OR Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login: Continue with Google */}
              <Pressable
                onPress={handleGoogleLogin}
                style={({ pressed }) => [
                  styles.socialButtonWrapper,
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

              {/* Social Login: Continue with Apple */}
              <Pressable
                onPress={handleAppleLogin}
                style={({ pressed }) => [
                  styles.socialButtonWrapper,
                  styles.appleButtonWrapper,
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
            </LinearGradient>
          </View>

          {/* Bottom Account CTA */}
          <View style={styles.bottomCtaContainer}>
            <Text style={styles.bottomCtaText}>
              Don't have an account?{" "}
              <Text
                style={styles.createAccountLink}
                onPress={handleCreateAccount}
              >
                Create Account
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
    backgroundColor: "#060812",
  },
  flexOne: {
    flex: 1,
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
    borderColor: "rgba(255, 255, 255, 0.22)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  wordmark: {
    color: "#288BE5",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  /* Hero Section */
  heroSection: {
    position: "relative",
    marginBottom: 20,
    paddingLeft: 2,
  },
  sparklePosition: {
    position: "absolute",
    top: -20,
    left: 0,
    zIndex: 2,
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
  dumbbellPosition: {
    position: "absolute",
    right: 18,
    bottom: -6,
    zIndex: 1,
    opacity: 0.3,
  },
  dumbbellIcon: {
    transform: [{ rotate: "35deg" }],
  },

  /* Authentication Card */
  cardWrapper: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8,
  },
  cardGradient: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 26,
  },

  /* Password & Forgot Password */
  passwordField: {
    marginBottom: 8,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 22,
    paddingVertical: 2,
  },
  forgotPasswordText: {
    color: "#FF7A00",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  /* Continue Button */
  continueButton: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    marginBottom: 22,
  },
  continueGradient: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  /* OR Divider */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    letterSpacing: 1.5,
    marginHorizontal: 14,
  },

  /* Social Buttons */
  socialButtonWrapper: {
    width: "100%",
    height: 52,
    marginBottom: 12,
  },
  appleButtonWrapper: {
    marginBottom: 0,
  },
  socialButtonContainer: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
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
    marginTop: 22,
    marginBottom: 8,
  },
  bottomCtaText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
  },
  createAccountLink: {
    color: "#10B981",
    fontWeight: "700",
  },

  /* Press Feedback */
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
