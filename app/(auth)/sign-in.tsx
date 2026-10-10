import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
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
  AuthDarkPillInput,
  AuthHeader,
  GoogleIcon,
  SignUpBackground,
} from "@/features/auth";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

export default function SignInRoute() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(onboarding)");
    }
  };

  const handleLogin = () => {
    dispatch(
      setUser({
        id: "1",
        email: email || "runner@kinetic.ai",
        fullName: "Alex Runner",
        hasCompletedOnboarding: true,
        createdAt: new Date().toISOString(),
      }),
    );
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}
    });
  };

  const handleForgotPassword = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    router.push("/(auth)/forgot-password");
  };

  const handleGoogleLogin = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  };

  const handleAppleLogin = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  };

  const handleCreateAccount = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    router.push("/(auth)/sign-up");
  };

  return (
    <View style={styles.root}>
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
          <AuthHeader onBack={handleBack} />
          <View style={styles.heroSection}>
            <View style={styles.titleRow}>
              <Text style={styles.heroTitle}>WELCOME</Text>
            </View>
            <Text style={styles.heroTitle}>BACK</Text>
            <LinearGradient
              colors={["#FED7AA", "#FFEDD5", "rgba(254, 215, 170, 0)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.todayUnderline}
            />
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.cardWrapper}>
              <LinearGradient
                colors={["#462D24", "#2E2644", "#1B1D38"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
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
                <AuthDarkPillInput
                  label="PASSWORD"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  rightIcon={<Lock size={19} color="#CBD5E1" />}
                />
                <View style={styles.forgotPasswordWrapper}>
                  <Pressable
                    onPress={handleForgotPassword}
                    hitSlop={12}
                    style={({ pressed }) => [pressed && styles.buttonPressed]}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.createAccountWrapper}>
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
                      style={styles.createAccountGradient}
                    >
                      <Text style={styles.createAccountText}>SIGN IN</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>
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
          </View>
          <View style={styles.bottomCtaContainer}>
            <Text style={styles.bottomCtaText}>Don't have an account? </Text>
            <Pressable
              onPress={handleCreateAccount}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={({ pressed }) => [pressed && styles.buttonPressed]}
            >
              <Text style={styles.loginLink}>Sign Up</Text>
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
    fontWeight: "700",
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

  /* Card Container */
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

  /* Form Fields Spacing */
  forgotPasswordWrapper: {
    alignItems: "flex-end",
    marginBottom: 22,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: "#D97706",
    fontSize: 13,
    fontWeight: "500",
  },

  /* Primary Action Button */
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
    fontSize: 14,
    fontWeight: "400",
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
    letterSpacing: 1.8,
    marginHorizontal: 16,
  },

  /* Social Buttons */
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
  loginLink: {
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
