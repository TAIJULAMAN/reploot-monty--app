import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";
import { ProfileHeader } from "./components/ProfileHeader";
import { Step1LetsStart } from "./components/Step1LetsStart";
import { Step2YourBody } from "./components/Step2YourBody";
import { Step3YourGoal } from "./components/Step3YourGoal";
import { Step4YourStyle } from "./components/Step4YourStyle";
import { Step5YourCoach } from "./components/Step5YourCoach";
import { useProfileSetupStore } from "./store/profileSetupStore";

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
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          <SvgLine
            x1="420"
            y1="-20"
            x2="-40"
            y2="440"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
          />
          <SvgLine
            x1="460"
            y1="260"
            x2="-40"
            y2="760"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeWidth="1"
          />
          <SvgLine
            x1="480"
            y1="560"
            x2="-40"
            y2="1080"
            stroke="rgba(56, 237, 216, 0.04)"
            strokeWidth="1"
          />
        </Svg>
      </View>
      <View style={{ paddingTop: Math.max(insets.top + 6, 16) }}>
        <ProfileHeader
          currentStep={currentStep}
          totalSteps={5}
          onBack={handleBack}
          showBack={currentStep > 1}
        />
      </View>
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
            isForward ? FadeInRight.duration(140) : FadeInLeft.duration(140)
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
    alignSelf: "stretch",
    alignItems: "center",
  },
});
