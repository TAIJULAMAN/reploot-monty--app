import React, { useRef, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line as SvgLine } from "react-native-svg";
import Animated, {
  FadeInRight,
  FadeInLeft,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
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
  const scrollRef = useRef<ScrollView>(null);
  const prevStepRef = useRef(currentStep);
  const isForward = currentStep >= prevStepRef.current;

  useEffect(() => {
    prevStepRef.current = currentStep;
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentStep]);

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
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "#090A10" }]} />

        {/* Top-left soft violet radial bloom */}
        <LinearGradient
          colors={["rgba(99, 102, 241, 0.24)", "rgba(99, 102, 241, 0.06)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 0.7 }}
          style={[styles.glowOrb, { top: -60, left: -60 }]}
        />

        {/* Bottom-right soft cyber mint bloom */}
        <LinearGradient
          colors={["transparent", "rgba(56, 237, 216, 0.08)", "rgba(56, 237, 216, 0.22)"]}
          start={{ x: 0.2, y: 0.3 }}
          end={{ x: 1, y: 1 }}
          style={[styles.glowOrb, { bottom: -60, right: -60 }]}
        />

        {/* Subtle Cyber Diagonal Laser Lines */}
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          <SvgLine x1="420" y1="-20" x2="-40" y2="440" stroke="rgba(255, 255, 255, 0.035)" strokeWidth="1" />
          <SvgLine x1="460" y1="260" x2="-40" y2="760" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
          <SvgLine x1="480" y1="560" x2="-40" y2="1080" stroke="rgba(56, 237, 216, 0.04)" strokeWidth="1" />
        </Svg>
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
        ref={scrollRef}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <Animated.View
          key={currentStep}
          entering={
            isForward
              ? FadeInRight.duration(180).springify().damping(28).stiffness(320)
              : FadeInLeft.duration(180).springify().damping(28).stiffness(320)
          }
          style={styles.stepAnimatedWrapper}
        >
          {currentStep === 1 && <Step1LetsStart />}
          {currentStep === 2 && <Step2YourBody />}
          {currentStep === 3 && <Step3YourGoal />}
          {currentStep === 4 && <Step4YourStyle />}
          {currentStep === 5 && <Step5YourCoach />}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  glowOrb: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 190,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },
  stepAnimatedWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
