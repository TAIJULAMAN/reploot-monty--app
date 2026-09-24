import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AuthHeader,
  ForgotPasswordBackground,
  ForgotPasswordCheckEmailStep,
  ForgotPasswordNewPasswordStep,
  ForgotPasswordRequestStep,
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
    } catch {}
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
    } catch {}
    setStep("check_email");
  };

  const handleOpenMailApp = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    if (Platform.OS === "ios") {
      Linking.openURL("message:").finally(() => setStep("new_password"));
    } else {
      Linking.openURL("mailto:").finally(() => setStep("new_password"));
    }
  };

  const handleResendEmail = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  };

  const handleUpdatePassword = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    router.replace("/(auth)/sign-in");
  };

  const handleCancelAndReturn = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.root}>
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
          <AuthHeader onBack={handleBack} />

          {step === "request" && (
            <ForgotPasswordRequestStep
              email={email}
              setEmail={setEmail}
              onSendResetLink={handleSendResetLink}
            />
          )}

          {step === "check_email" && (
            <ForgotPasswordCheckEmailStep
              onOpenMailApp={handleOpenMailApp}
              onResendEmail={handleResendEmail}
            />
          )}

          {step === "new_password" && (
            <ForgotPasswordNewPasswordStep
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              onUpdatePassword={handleUpdatePassword}
              onCancel={handleCancelAndReturn}
            />
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
  },
});
