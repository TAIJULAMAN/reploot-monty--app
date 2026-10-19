import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, Camera as CameraIcon, Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
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
import Svg, {
  Circle as SvgCircle,
  Line as SvgLine,
  Path as SvgPath,
} from "react-native-svg";

const { width } = Dimensions.get("window");

export interface GetReadyRequirement {
  id: string;
  label: string;
}

export interface GetReadyScreenProps {
  onReady?: () => void;
  onBack?: () => void;
  exerciseTitle?: string;
  title?: string;
  description?: string;
}

const DEFAULT_REQUIREMENTS: GetReadyRequirement[] = [
  { id: "dist", label: "Stand 2–3 meters away" },
  { id: "dist", label: "Stand 2–3 meters away" },
  { id: "visible", label: "Keep your full body visible" },
  { id: "light", label: "Ensure good lighting" },
  { id: "clear", label: "Remove obstacles from camera view" },
];

export const GetReadyScreen: React.FC<GetReadyScreenProps> = ({
  onReady,
  onBack,
  exerciseTitle,
  title = "GET READY",
  description = "Align your full body within the camera frame to calibrate real-time AI tracking.",
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Camera permissions & facing
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("front");

  useEffect(() => {
    if (!permission) {
      requestPermission().catch(() => {});
    } else if (!permission.granted && permission.canAskAgain) {
      requestPermission().catch(() => {});
    }
  }, [permission]);

  const toggleFacing = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setFacing((current) => (current === "front" ? "back" : "front"));
  };

  // Requirements checklist state (all checked by default or togglable)
  const [checkedIds, setCheckedIds] = useState<string[]>(
    DEFAULT_REQUIREMENTS.map((r) => r.id),
  );

  const toggleRequirement = (id: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const allCovered = checkedIds.length === DEFAULT_REQUIREMENTS.length;

  const handleReadyPress = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
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

      <CustomHeader
        transparent={true}
        showBackButton
        onPressBack={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 20, 40) },
        ]}
      >
        {/* Title Section with Masked Gradient Title (Exact GenericWorkoutDetailScreen / ExerciseDetailScreen pattern) */}
        <View style={styles.titleSection}>
          {/* <Text style={styles.categoryBadge}>
            {exerciseTitle
              ? exerciseTitle.toUpperCase()
              : "AI WORKOUT PROTOCOL"}
          </Text> */}
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
                    {title}
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
          {description ? (
            <Text style={styles.subtitle}>{description}</Text>
          ) : null}
        </View>

        {/* Camera Viewport / Body Detection Frame with Live Camera */}
        <View style={styles.cameraBox}>
          {permission?.granted ? (
            <CameraView
              style={StyleSheet.absoluteFill}
              facing={facing}
              mode="picture"
            />
          ) : (
            <Image
              source={require("../../../../assets/workout/getReadyDetection.png")}
              style={styles.cameraBackdrop}
              contentFit="cover"
            />
          )}

          {/* Ambient Darkened Gradient for HUD Contrast */}
          <LinearGradient
            colors={[
              "rgba(5, 8, 14, 0.45)",
              "transparent",
              "rgba(5, 8, 14, 0.6)",
            ]}
            locations={[0, 0.4, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          {/* Corner Framing Brackets */}
          <View
            style={[styles.cornerGuide, styles.cornerTL]}
            pointerEvents="none"
          />
          <View
            style={[styles.cornerGuide, styles.cornerTR]}
            pointerEvents="none"
          />
          <View
            style={[styles.cornerGuide, styles.cornerBL]}
            pointerEvents="none"
          />
          <View
            style={[styles.cornerGuide, styles.cornerBR]}
            pointerEvents="none"
          />

          {/* Top Pill Badge: (✓) BODY DETECTED */}
          {/* <View style={styles.bodyDetectedPill} pointerEvents="none">
            <View style={styles.greenDotRing}>
              <Check size={11} color="#38EDD8" strokeWidth={3.2} />
            </View>
            <Text style={styles.bodyDetectedText}>BODY DETECTED</Text>
          </View> */}

          {/* Camera Flip Button */}
          {/* {permission?.granted && (
            <Pressable
              onPress={toggleFacing}
              style={styles.flipButton}
              accessibilityRole="button"
              accessibilityLabel="Flip camera"
              hitSlop={8}
            >
              <RotateCcw size={15} color="#38EDD8" strokeWidth={2.5} />
            </Pressable>
          )} */}

          {/* Silhouette Wireframe Guide Overlay */}
          <View style={styles.silhouetteContainer} pointerEvents="none">
            {/* Perspective Floor Workout Mat Bar */}
            {/* <View style={styles.floorMatBar} /> */}
          </View>

          {/* Camera Permission Prompt if not yet granted */}
          {!permission?.granted && (
            <Pressable
              style={styles.enableCameraPill}
              onPress={() => requestPermission()}
            >
              <CameraIcon size={14} color="#38EDD8" />
              <Text style={styles.enableCameraText}>ENABLE CAMERA</Text>
            </Pressable>
          )}
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
          style={styles.readyButton}
          onPress={handleReadyPress}
          accessibilityRole="button"
          accessibilityLabel="I'm Ready, start countdown"
        >
          <LinearGradient
            colors={["#1967B2", "#2B90EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.readyButtonGradient}
          >
            <Text style={styles.readyButtonText}>I'M READY</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
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
    marginBottom: 18,
    marginTop: 4,
  },
  categoryBadge: {
    color: "#44EAC3",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  maskedTitleWrapper: {
    height: 44,
    width: "100%",
    marginBottom: 4,
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
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
  },

  // Camera Box
  cameraBox: {
    width: "100%",
    height: 350,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#0B0E17",
    borderWidth: 1.5,
    borderColor: "rgba(56, 237, 216, 0.35)",
    position: "relative",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.75,
  },
  cornerGuide: {
    position: "absolute",
    width: 26,
    height: 26,
    borderColor: "#38EDD8",
    zIndex: 4,
  },
  cornerTL: {
    top: 14,
    left: 14,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 14,
    right: 14,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 14,
    left: 14,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 14,
    right: 14,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },

  bodyDetectedPill: {
    position: "absolute",
    top: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(9, 21, 26, 0.88)",
    borderWidth: 1.4,
    borderColor: "rgba(56, 237, 216, 0.55)",
    paddingHorizontal: 14,
    paddingVertical: 5.5,
    borderRadius: 18,
    zIndex: 5,
    shadowColor: "#38EDD8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  greenDotRing: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    borderWidth: 1.4,
    borderColor: "#38EDD8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(56, 237, 216, 0.12)",
  },
  bodyDetectedText: {
    color: "#38EDD8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  flipButton: {
    position: "absolute",
    top: 14,
    right: 48,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(10, 16, 24, 0.75)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  silhouetteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  floorMatBar: {
    position: "absolute",
    bottom: 18,
    width: "74%",
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(18, 22, 33, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.25)",
  },

  enableCameraPill: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(10, 20, 30, 0.92)",
    borderWidth: 1.2,
    borderColor: "#38EDD8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 6,
  },
  enableCameraText: {
    color: "#38EDD8",
    fontSize: 11.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  // Requirements Checklist
  requirementsList: {
    gap: 10,
    marginBottom: 20,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(18, 22, 33, 0.88)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  requirementItemChecked: {
    borderColor: "rgba(56, 237, 216, 0.22)",
    backgroundColor: "rgba(19, 24, 36, 0.95)",
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleChecked: {
    backgroundColor: "rgba(14, 48, 48, 0.9)",
    borderColor: "rgba(56, 237, 216, 0.4)",
  },
  requirementText: {
    color: "#64748B",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  requirementTextChecked: {
    color: "#F1F5F9",
    fontWeight: "700",
  },

  // Ready Button
  readyButton: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    shadowColor: "#258CE8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
    marginTop: 2,
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
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
