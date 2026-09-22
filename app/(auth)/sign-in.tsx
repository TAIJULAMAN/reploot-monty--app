import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, AtSign, Lock } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AppleIcon,
  AuthBackground,
  AuthPillInput,
  DumbbellDecoration,
  GoogleIcon,
  SparkleDecoration,
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
    router.push("/(profile-setup)");
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {
        // Haptics fallback
      }
    });
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
      {/* Dark Space Ambient Background with Subtle Geometric Lines */}
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

          {/* Hero Section: Sparkle, Crisp Glowing Title, Floating Dumbbell */}
          <View style={styles.heroSection}>
            {/* Sparkle Cluster */}
            <View style={styles.sparklePosition}>
              <SparkleDecoration size={32} />
            </View>

            {/* Crisp Foreground Title with Neon Cyan Glow */}
            <Text style={styles.heroTitle}>WELCOME</Text>
            <Text style={styles.heroTitle}>BACK</Text>

            {/* Fully Rendered Unclipped Dumbbell Floating Right of BACK */}
            <View style={styles.dumbbellPosition}>
              <DumbbellDecoration size={42} color="#64748B" opacity={0.4} />
            </View>
          </View>

          {/* Authentication Panel */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={["#322B60", "#22374E", "#134648"]}
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
                rightIcon={<AtSign size={19} color="#94A3B8" />}
              />

              {/* Password Field */}
              <AuthPillInput
                label="PASSWORD"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                rightIcon={<Lock size={19} color="#94A3B8" />}
                containerStyle={styles.passwordField}
              />

              {/* Forgot Password Link - Dedicated Static Container */}
              <View style={styles.forgotPasswordContainer}>
                <Pressable
                  onPress={handleForgotPassword}
                  style={({ pressed }) => [pressed && styles.buttonPressed]}
                  hitSlop={10}
                >
                  <Text style={styles.forgotPasswordText}>
                    FORGOT PASSWORD?
                  </Text>
                </Pressable>
              </View>

              {/* Primary Continue CTA Button - Dedicated Static Container */}
              <View style={styles.continueWrapper}>
                <Pressable
                  onPress={handleLogin}
                  unstable_pressDelay={0}
                  hitSlop={6}
                  style={({ pressed }) => [
                    styles.fullWidth,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <LinearGradient
                    colors={["#3568A5", "#4B85C4", "#69A6E3"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.continueGradient}
                  >
                    <Text style={styles.continueText}>CONTINUE</Text>
                  </LinearGradient>
                </Pressable>
              </View>

              {/* OR Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login: Continue with Google - Dedicated Static Container */}
              <View style={styles.socialButtonWrapper}>
                <Pressable
                  onPress={handleGoogleLogin}
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

              {/* Social Login: Continue with Apple - Dedicated Static Container */}
              <View style={styles.appleButtonWrapper}>
                <Pressable
                  onPress={handleAppleLogin}
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

          {/* Bottom Account CTA - Dedicated Pressable with HitTarget */}
          <View style={styles.bottomCtaContainer}>
            <Text style={styles.bottomCtaText}>Don't have an account? </Text>
            <Pressable
              onPress={handleCreateAccount}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={({ pressed }) => [pressed && styles.buttonPressed]}
            >
              <Text style={styles.createAccountLink}>Create Account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#080A14",
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
    marginBottom: 22,
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
  sparklePosition: {
    position: "absolute",
    top: -22,
    left: -2,
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
    right: 22,
    top: 36,
    zIndex: 1,
  },

  /* Authentication Card */
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

  /* Password & Forgot Password */
  passwordField: {
    marginTop: 2,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 22,
  },
  forgotPasswordText: {
    color: "#FF7700",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  /* Continue Button Wrapper & Gradient */
  continueWrapper: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 22,
  },
  continueGradient: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },

  /* OR Divider */
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
    letterSpacing: 2,
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
    flexDirection: "row",
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
  createAccountLink: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "700",
  },

  /* Press Feedback */
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
