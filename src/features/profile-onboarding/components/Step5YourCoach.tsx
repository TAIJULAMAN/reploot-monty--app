import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Settings, Sparkles, Zap } from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { useAuthStore } from "@/stores/authStore";
import { useAppStore } from "@/stores/appStore";

const brainAsset = require("../../../../assets/profile-setup/ai-brain-circle.png");

export function Step5YourCoach() {
  const router = useRouter();
  const { data } = useProfileSetupStore();
  const setUser = useAuthStore((s) => s.setUser);
  const setHasSeenOnboarding = useAppStore((s) => s.setHasSeenOnboarding);

  const [progress, setProgress] = useState(15);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch {
            // ignore
          }
          return 100;
        }
        return prev + 17;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Smooth auto-redirect once AI Coach finishes calibration
  useEffect(() => {
    if (isReady) {
      const autoRedirectTimer = setTimeout(() => {
        handleFinish();
      }, 1500);
      return () => clearTimeout(autoRedirectTimer);
    }
  }, [isReady]);

  const handleFinish = () => {
    // Persist user and onboarding completion in stores
    setHasSeenOnboarding(true);
    setUser({
      id: "user_kinetic_" + Date.now(),
      email: data.email || "runner@kinetic.ai",
      fullName: data.fullName || "Kinetic Runner",
      avatarUrl: data.avatarUri,
      phoneNumber: data.phoneNumber,
      createdAt: new Date().toISOString(),
      hasCompletedOnboarding: true,
    });

    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // ignore
    }

    // Navigate to main tab navigator (Home)
    router.replace("/(tabs)/home");
  };

  const statusMessages = [
    "Analyzing personal biomechanics...",
    "Calibrating target heart rate zones...",
    "Synthesizing customized AI workout routine...",
    "Optimizing your kinetic profile...",
    "AI Coach is ready!",
  ];

  const currentStatus =
    progress < 30
      ? statusMessages[0]
      : progress < 60
      ? statusMessages[1]
      : progress < 90
      ? statusMessages[2]
      : progress < 100
      ? statusMessages[3]
      : statusMessages[4];

  return (
    <View style={styles.container}>
      {/* Title with cyan neon bloom */}
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR COACH</Text>
        <View style={styles.readyRow}>
          <Text style={styles.title}>READY</Text>
          <Zap size={30} color="#38BDF8" fill="#38BDF8" style={styles.zapIcon} />
        </View>
      </View>

      {/* Holographic Neural Brain Chamber */}
      <View style={styles.chamberContainer}>
        {/* Outer concentric pulsing ring */}
        <LinearGradient
          colors={["rgba(56, 189, 248, 0.4)", "rgba(99, 102, 241, 0.4)", "rgba(68, 234, 195, 0.4)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.outerRing}
        >
          {/* Middle Ring */}
          <View style={styles.middleRing}>
            {/* Brain Orb Image */}
            <Image
              source={brainAsset}
              style={styles.brainImage}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>

        {/* Settings Badge on top right */}
        <View style={styles.settingsBadge}>
          <Settings size={16} color="#FFFFFF" strokeWidth={2.2} />
        </View>
      </View>

      {/* Dynamic Status & Routine Generation */}
      <View style={styles.statusSection}>
        <View style={styles.statusBadgeRow}>
          <Sparkles size={16} color="#C5C0FF" style={{ marginRight: 8 }} />
          <Text style={styles.statusTitle}>BUILDING WORKOUT ROUTINE ...</Text>
        </View>

        <Text style={styles.statusSubtitle}>{currentStatus}</Text>

        {/* Routine Generation Progress Track */}
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#0EA5E9", "#38BDF8", "#44EAC3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
      </View>

      {/* Final Action CTA */}
      <ProfileNavigationButton
        title={isReady ? "ENTER KINETIC ARENA" : "PREPARING COACH..."}
        disabled={!isReady}
        onPress={handleFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: "center",
  },
  hero: {
    marginTop: 12,
    marginBottom: 24,
    width: "100%",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(95, 255, 215, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  readyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  zapIcon: {
    marginLeft: 8,
  },
  chamberContainer: {
    position: "relative",
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  outerRing: {
    width: 244,
    height: 244,
    borderRadius: 122,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
  },
  middleRing: {
    width: "100%",
    height: "100%",
    borderRadius: 118,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.18)",
    backgroundColor: "#0F1015",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  brainImage: {
    width: "100%",
    height: "100%",
  },
  settingsBadge: {
    position: "absolute",
    top: 10,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(80, 78, 100, 0.85)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  statusSection: {
    alignItems: "center",
    width: "100%",
    marginTop: 14,
    marginBottom: 16,
  },
  statusBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusTitle: {
    color: "#C5C0FF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  statusSubtitle: {
    color: "#44EAC3",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  progressTrack: {
    width: "80%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
