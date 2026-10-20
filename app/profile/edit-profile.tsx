import { EditProfileActions } from "@/features/profile/components/EditProfileActions";
import { EditProfileBanner } from "@/features/profile/components/EditProfileBanner";
import { EditProfileForm } from "@/features/profile/components/EditProfileForm";
import { EditProfileSecurityBox } from "@/features/profile/components/EditProfileSecurityBox";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function EditProfileRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/profile");
    }
  };

  const handleSave = () => {
    setToastMessage("ATHLETE PROFILE SYNCHRONIZED");
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <CustomHeader
        titleVariant="text"
        title=""
        showBackButton={true}
        onPressBack={handleBack}
        showSearch={true}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom + 80, 100) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title Section with Masked Gradient Title & Description */}
          <View style={styles.titleSection}>
            <View style={styles.maskedTitleWrapper}>
              <MaskedView
                style={styles.maskedTitleView}
                maskElement={
                  <View style={styles.maskWrapper}>
                    <Text
                      style={styles.mainTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      EDIT PROFILE
                    </Text>
                  </View>
                }
              >
                <LinearGradient
                  colors={["#00f2fe", "#4facfe"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                />
              </MaskedView>
            </View>
            <Text style={styles.subtitle}>
              Update your athlete credentials, biometric data & profile
            </Text>
          </View>

          <EditProfileBanner />
          <EditProfileForm />
          <EditProfileSecurityBox />
          <EditProfileActions onSave={handleSave} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Cyber HUD Toast */}
      {toastMessage && (
        <View style={styles.savedToast}>
          <Check size={16} color="#00f2fe" style={{ marginRight: 8 }} />
          <Text style={styles.savedToastText}>{toastMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    flexGrow: 1,
  },
  titleSection: {
    marginTop: 4,
    marginBottom: 20,
  },
  maskedTitleWrapper: {
    height: 48,
    width: "100%",
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },
  savedToast: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7, 10, 17, 0.95)",
    borderWidth: 1.5,
    borderColor: "#00f2fe",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    zIndex: 9999,
    elevation: 12,
    shadowColor: "#00f2fe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  savedToastText: {
    color: "#00f2fe",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
  },
});
