import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, Check } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine, Path as SvgPath, Rect as SvgRect } from "react-native-svg";

const { width } = Dimensions.get("window");

export interface GetReadyRequirement {
  id: string;
  label: string;
}

export interface GetReadyScreenProps {
  onReady?: () => void;
  onBack?: () => void;
  exerciseTitle?: string;
}

const DEFAULT_REQUIREMENTS: GetReadyRequirement[] = [
  { id: "dist", label: "Stand 2–3 meters away" },
  { id: "visible", label: "Keep your full body visible" },
  { id: "light", label: "Ensure good lighting" },
  { id: "clear", label: "Remove obstacles from camera view" },
];

export const GetReadyScreen: React.FC<GetReadyScreenProps> = ({
  onReady,
  onBack,
  exerciseTitle,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Requirements checklist state (all checked by default or togglable)
  const [checkedIds, setCheckedIds] = useState<string[]>(
    DEFAULT_REQUIREMENTS.map((r) => r.id)
  );

  const toggleRequirement = (id: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allCovered = checkedIds.length === DEFAULT_REQUIREMENTS.length;

  const handleReadyPress = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );
    }
    onReady?.();
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/workouts");
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Kinetic Ambient Gradient & Accent Lines */}
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
        </Svg>
      </View>

      <CustomHeader transparent={true} showBackButton onPressBack={handleBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 20, 40) },
        ]}
      >
        {/* Glow Title: GET READY */}
        <View style={styles.titleSection}>
          <Text style={styles.glowTitle}>GET</Text>
          <Text style={styles.glowTitle}>READY</Text>
        </View>

        {/* Camera Viewport / Body Detection Frame with user's exact uploaded image */}
        <View style={styles.cameraBox}>
          <Image
            source={require("../../../../assets/workout/getReadyDetection.png")}
            style={styles.cameraBackdrop}
            contentFit="cover"
          />
        </View>

        {/* 4 Checklist Requirements */}
        <View style={styles.requirementsList}>
          {DEFAULT_REQUIREMENTS.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <Pressable
                key={item.id}
                style={[
                  styles.requirementItem,
                  isChecked && styles.requirementItemChecked,
                ]}
                onPress={() => toggleRequirement(item.id)}
              >
                <View
                  style={[
                    styles.checkCircle,
                    isChecked && styles.checkCircleChecked,
                  ]}
                >
                  <Check
                    size={13}
                    color={isChecked ? "#38EDD8" : "#475569"}
                    strokeWidth={2.8}
                  />
                </View>
                <Text
                  style={[
                    styles.requirementText,
                    isChecked && styles.requirementTextChecked,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Bottom CTA: I'M READY -> */}
        <Pressable
          style={({ pressed }) => [
            styles.readyButton,
            pressed && { opacity: 0.88, transform: [{ scale: 0.99 }] },
          ]}
          onPress={handleReadyPress}
          accessibilityRole="button"
          accessibilityLabel="I'm Ready, start countdown"
        >
          <LinearGradient
            colors={["#1E6BB8", "#258CE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.readyButtonGradient}
          >
            <Text style={styles.readyButtonText}>I'M READY</Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 2,
  },
  glowTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textAlign: "center",
    textShadowColor: "rgba(56, 237, 216, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    ...(Platform.OS === "web"
      ? ({
          filter: "drop-shadow(0 0 20px rgba(56, 237, 216, 0.8))",
        } as any)
      : {}),
  },

  // Camera Box
  cameraBox: {
    width: "100%",
    height: 310,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "#0E121B",
    borderWidth: 1.2,
    borderColor: "rgba(56, 237, 216, 0.25)",
    position: "relative",
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.65,
  },
  cornerGuide: {
    position: "absolute",
    width: 22,
    height: 22,
    borderColor: "#38EDD8",
  },
  cornerTL: {
    top: 14,
    left: 14,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: 14,
    right: 14,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: 14,
    left: 14,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: 14,
    right: 14,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    borderBottomRightRadius: 6,
  },

  bodyDetectedPill: {
    position: "absolute",
    top: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(10, 16, 24, 0.88)",
    borderWidth: 1.2,
    borderColor: "rgba(56, 237, 216, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    zIndex: 2,
  },
  greenDotRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#38EDD8",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyDetectedText: {
    color: "#38EDD8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  silhouetteContainer: {
    width: 150,
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  floorMatBar: {
    position: "absolute",
    bottom: 24,
    width: "74%",
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(18, 22, 33, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.25)",
  },

  // Requirements Checklist
  requirementsList: {
    gap: 10,
    marginBottom: 20,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(17, 20, 30, 0.8)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 13,
    paddingHorizontal: 16,
    gap: 12,
  },
  requirementItemChecked: {
    borderColor: "rgba(56, 237, 216, 0.2)",
    backgroundColor: "rgba(17, 20, 30, 0.95)",
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleChecked: {
    backgroundColor: "rgba(56, 237, 216, 0.15)",
  },
  requirementText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
  },
  requirementTextChecked: {
    color: "#E2E8F0",
    fontWeight: "600",
  },

  // Ready Button
  readyButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    shadowColor: "#258CE8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  readyButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
  },
  readyButtonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  readyButtonText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
});
