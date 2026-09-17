import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProfileSetupStore } from "./store/profileSetupStore";
import { ProfileHeader } from "./components/ProfileHeader";
import { Step1LetsStart } from "./components/Step1LetsStart";
import { Step2YourBody } from "./components/Step2YourBody";
import { Step3YourGoal } from "./components/Step3YourGoal";
import { Step4YourStyle } from "./components/Step4YourStyle";
import { Step5YourCoach } from "./components/Step5YourCoach";

export function ProfileOnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentStep, prevStep } = useProfileSetupStore();

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep();
    } else {
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Ambient Lighting Background (Hardware-accelerated self-contained gradients) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "#0F1015" }]} />

        {/* Top-left soft violet radial bloom */}
        <LinearGradient
          colors={["rgba(108, 92, 255, 0.28)", "rgba(108, 92, 255, 0.08)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 0.7 }}
          style={[styles.glowOrb, { top: -60, left: -60 }]}
        />

        {/* Bottom-right soft cyber mint bloom */}
        <LinearGradient
          colors={["transparent", "rgba(68, 234, 195, 0.08)", "rgba(68, 234, 195, 0.22)"]}
          start={{ x: 0.2, y: 0.3 }}
          end={{ x: 1, y: 1 }}
          style={[styles.glowOrb, { bottom: -60, right: -60 }]}
        />
      </View>

      {/* Top Fixed Header with Progress Tracker */}
      <View style={{ paddingTop: Math.max(insets.top + 6, 16) }}>
        <ProfileHeader
          currentStep={currentStep}
          totalSteps={5}
          onBack={handleBack}
          showBack={currentStep > 1}
        />
      </View>

      {/* Scrollable Content for Active Step */}
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        {currentStep === 1 && <Step1LetsStart />}
        {currentStep === 2 && <Step2YourBody />}
        {currentStep === 3 && <Step3YourGoal />}
        {currentStep === 4 && <Step4YourStyle />}
        {currentStep === 5 && <Step5YourCoach />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0F1015",
  },
  glowOrb: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 190,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
