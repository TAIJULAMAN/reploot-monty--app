import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  Path,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";

const brainAsset = require("../../../../assets/profile-setup/ai-brain-neural.jpg");

function GoldSparkleCluster() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Path
        d="M12 2C12 7 15 10 20 10C15 10 12 13 12 18C12 13 9 10 4 10C9 10 12 7 12 2Z"
        fill="#FBBF24"
        opacity="0.85"
      />
      <Path
        d="M22 14C22 17 24 19 27 19C24 19 22 21 22 24C22 21 20 19 17 19C20 19 22 17 22 14Z"
        fill="#F59E0B"
        opacity="0.7"
      />
    </Svg>
  );
}
function CyanStatusSparkles() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 2C10 6 13 8.5 17 8.5C13 8.5 10 11 10 15C10 11 7 8.5 3 8.5C7 8.5 10 6 10 2Z"
        fill="#2DD4BF"
      />
      <Path
        d="M18 13C18 15 19.5 16.5 21.5 16.5C19.5 16.5 18 18 18 20C18 18 16.5 16.5 14.5 16.5C16.5 16.5 18 15 18 13Z"
        fill="#2DD4BF"
        opacity="0.8"
      />
    </Svg>
  );
}
function HeaderZapIcon() {
  return (
    <Svg width={22} height={26} viewBox="0 0 24 24" fill="#71717A">
      <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg>
  );
}
function BrainOrbitIcon() {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
      <Path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
    </Svg>
  );
}

export function Step5YourCoach() {
  const router = useRouter();
  const { data } = useProfileSetupStore();
  const setUser = useAuthStore((s) => s.setUser);
  const setHasSeenOnboarding = useAppStore((s) => s.setHasSeenOnboarding);
  const { width } = useWindowDimensions();

  const chamberSize = Math.min(width - 80, 280);

  const [progress, setProgress] = useState(20);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          requestAnimationFrame(() => {
            try {
              void Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
            } catch {
              // ignore
            }
          });
          return 100;
        }
        return prev + 12;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
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

    requestAnimationFrame(() => {
      try {
        void Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      } catch {
        // ignore
      }
    });

    router.replace("/(tabs)/home");
  };

  const statusMessages = [
    "Analyzing personal biomechanics...",
    "Calibrating kinetic force vectors...",
    "Building customized workout routine...",
    "Optimizing your kinetic profile...",
    "Your AI Coach is ready!",
  ];

  const currentStatus =
    progress < 30
      ? statusMessages[0]
      : progress < 60
        ? statusMessages[1]
        : progress < 85
          ? statusMessages[2]
          : progress < 100
            ? statusMessages[3]
            : statusMessages[4];

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR COACH</Text>
        <View style={styles.readyRow}>
          <Text style={styles.title}>READY</Text>
          <View style={styles.zapWrap}>
            <HeaderZapIcon />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.chamberContainer,
          { width: chamberSize, height: chamberSize },
        ]}
      >
        <Svg
          width={chamberSize}
          height={chamberSize}
          style={StyleSheet.absoluteFill}
        >
          <Defs>
            <SvgGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
              <Stop offset="40%" stopColor="#F472B6" stopOpacity="0.7" />
              <Stop offset="80%" stopColor="#38BDF8" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.9" />
            </SvgGradient>
          </Defs>
          {/* Outer Ring */}
          <Circle
            cx={chamberSize / 2}
            cy={chamberSize / 2}
            r={chamberSize / 2 - 3}
            stroke="url(#ringGrad)"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Subtle Inner Faint Orbit */}
          <Circle
            cx={chamberSize / 2}
            cy={chamberSize / 2}
            r={chamberSize / 2 - 12}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            fill="none"
          />
        </Svg>

        {/* Brain Image in Masked Circular Chamber */}
        <View
          style={[
            styles.brainCircleMask,
            {
              width: chamberSize - 20,
              height: chamberSize - 20,
              borderRadius: (chamberSize - 20) / 2,
            },
          ]}
        >
          <Image
            source={brainAsset}
            style={styles.brainImage}
            resizeMode="cover"
          />
        </View>

        {/* Orbit Brain/Gear Badge on Top-Right */}
        <View style={styles.orbitBadgeTopRight}>
          <BrainOrbitIcon />
        </View>

        {/* Gold/Bronze Sparkles on Lower-Left */}
        <View style={styles.goldSparkleWrap}>
          <GoldSparkleCluster />
        </View>
      </View>
      <View style={styles.statusSection}>
        <View style={styles.routineRow}>
          <CyanStatusSparkles />
          <Text style={styles.routineText}>BUILDING WORKOUT ROUTINE ...</Text>
        </View>
        <View style={styles.statusDivider} />
        <Text style={styles.statusSubtitle}>{currentStatus}</Text>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#2DD4BF", "#38BDF8", "#3B82F6"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
      </View>
      <ProfileNavigationButton
        title={isReady ? "ENTER KINETIC ARENA" : "CALIBRATING AI COACH..."}
        disabled={!isReady}
        onPress={handleFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
    alignItems: "center",
  },
  hero: {
    marginTop: 2,
    marginBottom: 20,
    width: "100%",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -0.5,
    fontStyle: "italic",
    textShadowColor: "rgba(95, 255, 215, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  readyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  zapWrap: {
    marginLeft: 10,
    opacity: 0.65,
  },
  chamberContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  brainCircleMask: {
    overflow: "hidden",
    backgroundColor: "#080A10",
    alignItems: "center",
    justifyContent: "center",
  },
  brainImage: {
    width: "100%",
    height: "100%",
  },
  orbitBadgeTopRight: {
    position: "absolute",
    top: 14,
    right: 18,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2E2D40",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  goldSparkleWrap: {
    position: "absolute",
    bottom: 2,
    left: -8,
  },
  statusSection: {
    alignItems: "center",
    width: "100%",
    marginTop: 18,
    marginBottom: 24,
  },
  routineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  routineText: {
    color: "#2DD4BF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    fontFamily: "monospace",
  },
  statusDivider: {
    width: "60%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 16,
  },
  statusSubtitle: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 18,
    textAlign: "center",
  },
  progressTrack: {
    width: "75%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
