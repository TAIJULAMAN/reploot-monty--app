import * as Haptics from "expo-haptics";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Camera as CameraIcon,
  Image as ImageIcon,
  Sparkles,
  Zap,
  ZapOff,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const FRAME_SIZE = width * 0.82;

export default function ScanMealScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<"on" | "off" | "auto">("auto");
  const cameraRef = useRef<CameraView>(null);

  const triggerHaptic = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.permissionCenter]}>
        <View style={styles.permissionIconBadge}>
          <CameraIcon size={32} color="#38BDF8" />
        </View>
        <Text style={styles.permissionTitle}>CAMERA SENSOR REQUIRED</Text>
        <Text style={styles.permissionDesc}>
          Reploot AI Vision requires camera optics to scan food plates and
          analyze metabolic macro composition.
        </Text>

        <Pressable
          onPress={async () => {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
            try {
              const res = await requestPermission();
              if (!res.granted) {
                router.push("/meal-analysis");
              }
            } catch {
              router.push("/meal-analysis");
            }
          }}
          style={styles.grantBtn}
        >
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.grantBtnGradient}
          >
            <Text style={styles.grantBtnText}>INITIALIZE CAMERA SENSOR</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={() => {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
            router.push("/meal-analysis");
          }}
          style={styles.demoBypassBtn}
        >
          <Text style={styles.demoBypassText}>
            SIMULATE MEAL CAPTURE (EMULATOR)
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            triggerHaptic();
            if (router.canGoBack()) router.back();
            else router.replace("/(tabs)/nutrition");
          }}
          style={styles.backPlainBtn}
        >
          <Text style={styles.backPlainBtnText}>
            RETURN TO NUTRITION
          </Text>
        </Pressable>
      </View>
    );
  }

  const toggleFlash = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setFlash((current) =>
      current === "auto" ? "on" : current === "on" ? "off" : "auto",
    );
  };

  const takePicture = async () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          router.push("/meal-analysis");
        }
      } catch (error) {
        // Fallback for emulator
        router.push("/meal-analysis");
      }
    } else {
      router.push("/meal-analysis");
    }
  };

  const pickImage = async () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      router.push("/meal-analysis");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={flash === "on"}
        ref={cameraRef}
      >
        <LinearGradient
          colors={[
            "rgba(9, 10, 16, 0.8)",
            "rgba(9, 10, 16, 0.15)",
            "rgba(9, 10, 16, 0.85)",
          ]}
          locations={[0, 0.35, 1]}
          style={styles.overlay}
        >
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
            <Pressable
              onPress={() => {
                triggerHaptic();
                if (router.canGoBack()) router.back();
                else router.replace("/(tabs)/nutrition");
              }}
              style={styles.backButton}
            >
              <ArrowLeft color="#38BDF8" size={20} />
            </Pressable>

            <View style={styles.titleBadge}>
              <Sparkles size={12} color="#38BDF8" style={{ marginRight: 6 }} />
              <Text style={styles.headerTitle}>AI VISION SCANNER</Text>
            </View>

            <View style={styles.placeholderBox} />
          </View>

          {/* Instruction Pill */}
          <View style={styles.instructionCard}>
            <View style={styles.statusDot} />
            <Text style={styles.instructionText}>
              ALIGN MEAL PLATE ENTIRELY INSIDE SENSOR RETICLE
            </Text>
          </View>

          {/* Futuristic Cyber Scanner Reticle */}
          <View style={styles.frameContainer}>
            <View style={styles.frameWrapper}>
              {/* Corner Brackets */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* Crosshair Center */}
              <View style={styles.reticleHorizontal} />
              <View style={styles.reticleVertical} />

              {/* HUD Tags */}
              <View style={styles.hudTopTag}>
                <Text style={styles.hudText}>OPTICAL TARGET [LOCKED]</Text>
              </View>

              <View style={styles.hudBottomTag}>
                <Text style={styles.hudSubText}>60 FPS TELEMETRY</Text>
              </View>
            </View>
          </View>

          {/* Bottom Controls */}
          <View
            style={[
              styles.bottomControls,
              { paddingBottom: Math.max(insets.bottom + 20, 36) },
            ]}
          >
            {/* Gallery Picker */}
            <View style={styles.controlItem}>
              <Pressable
                style={styles.sideButton}
                onPress={pickImage}
              >
                <ImageIcon color="#FFFFFF" size={20} />
              </Pressable>
              <Text style={styles.controlLabel}>GALLERY</Text>
            </View>

            {/* Shutter Button */}
            <View style={styles.shutterWrapper}>
              <Pressable
                style={styles.shutterBtnOuter}
                onPress={takePicture}
              >
                <LinearGradient
                  colors={["#00f2fe", "#4facfe", "#2DD4BF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.shutterGradient}
                >
                  <View style={styles.shutterInnerCircle}>
                    <CameraIcon color="#FFFFFF" size={26} />
                  </View>
                </LinearGradient>
              </Pressable>
              <Text style={styles.shutterLabel}>CAPTURE & ANALYZE</Text>
            </View>

            {/* Flash Toggle */}
            <View style={styles.controlItem}>
              <Pressable
                style={styles.sideButton}
                onPress={toggleFlash}
              >
                {flash === "off" ? (
                  <ZapOff color="#94A3B8" size={20} />
                ) : (
                  <Zap
                    color={flash === "auto" ? "#FFFFFF" : "#FFB68C"}
                    size={20}
                  />
                )}
              </Pressable>
              <Text style={styles.controlLabel}>{flash.toUpperCase()}</Text>
            </View>
          </View>
        </LinearGradient>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  permissionCenter: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  permissionIconBadge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  permissionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 10,
  },
  permissionDesc: {
    color: "#94A3B8",
    fontSize: 13,
    fontFamily: "monospace",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 28,
  },
  grantBtn: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
  },
  grantBtnGradient: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  grantBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  demoBypassBtn: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.4)",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  demoBypassText: {
    color: "#38BDF8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  backPlainBtn: {
    paddingVertical: 12,
  },
  backPlainBtnText: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  placeholderBox: {
    width: 40,
    height: 40,
  },
  instructionCard: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    marginTop: 10,
    gap: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2DD4BF",
  },
  instructionText: {
    color: "#E2E8F0",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  frameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 36,
    height: 36,
    borderColor: "#38BDF8",
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 10,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 10,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 10,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 10,
  },
  reticleHorizontal: {
    position: "absolute",
    top: "50%",
    left: "44%",
    right: "44%",
    height: 1,
    backgroundColor: "rgba(56, 189, 248, 0.4)",
  },
  reticleVertical: {
    position: "absolute",
    top: "44%",
    bottom: "44%",
    left: "50%",
    width: 1,
    backgroundColor: "rgba(56, 189, 248, 0.4)",
  },
  hudTopTag: {
    position: "absolute",
    top: 8,
    left: 10,
  },
  hudText: {
    color: "rgba(56, 189, 248, 0.7)",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  hudBottomTag: {
    position: "absolute",
    bottom: 8,
    right: 10,
  },
  hudSubText: {
    color: "rgba(45, 212, 191, 0.7)",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 36,
  },
  controlItem: {
    alignItems: "center",
    gap: 8,
    width: 60,
  },
  sideButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  controlLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  shutterWrapper: {
    alignItems: "center",
    gap: 8,
  },
  shutterBtnOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    padding: 3,
  },
  shutterGradient: {
    flex: 1,
    borderRadius: 38,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInnerCircle: {
    flex: 1,
    width: "100%",
    borderRadius: 36,
    backgroundColor: "#090A10",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterLabel: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
