import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Camera as CameraIcon, Image as ImageIcon, Zap, ZapOff } from "lucide-react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");
const FRAME_SIZE = width * 0.8;

export default function ScanMealScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<"on" | "off" | "auto">("auto");
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "white", marginBottom: 20 }}>We need your permission to show the camera</Text>
        <Pressable 
          onPress={() => {
            // Bypass camera for simulator testing and go straight to analysis
            router.push("/meal-analysis");
          }} 
          style={{ backgroundColor: "#2EE8B3", padding: 12, borderRadius: 12, marginBottom: 20 }}
        >
          <Text style={{ color: "black", fontFamily: "JetBrainsMono_700Bold" }}>Grant Permission</Text>
        </Pressable>

        <Pressable 
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} 
          style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: 12, borderRadius: 12 }}
        >
          <Text style={{ color: "white", fontFamily: "JetBrainsMono_700Bold" }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const toggleFlash = () => {
    setFlash((current) => (current === "auto" ? "on" : current === "on" ? "off" : "auto"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          Alert.alert("Success", "Meal scanned successfully!");
          router.push("/meal-analysis");
        }
      } catch (error) {
        Alert.alert("Error", "Could not take photo");
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      Alert.alert("Success", "Meal image selected successfully!");
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
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          locations={[0, 0.3, 1]}
          style={styles.overlay}
        >
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
            <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} style={styles.backButton}>
              <ArrowLeft color="#38A1D6" size={20} />
            </Pressable>
            <Text style={styles.headerTitle}>SCAN MEAL</Text>
            <View style={styles.placeholderBox} />
          </View>

          {/* Instruction Card */}
          <View style={styles.instructionCard}>
            <Text style={styles.instructionLabel}>INSTRUCTION</Text>
            <Text style={styles.instructionText}>
              Place your entire meal inside the frame.
            </Text>
          </View>

          {/* Scanner Frame Overlay */}
          <View style={styles.frameContainer}>
            <View style={styles.frameWrapper}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
              
              <View style={styles.reticleHorizontal} />
              <View style={styles.reticleVertical} />
            </View>
          </View>

          {/* Bottom Controls */}
          <View style={[styles.bottomControls, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.controlItem}>
              <Pressable style={styles.sideButton} onPress={pickImage}>
                <ImageIcon color="#FFFFFF" size={20} />
              </Pressable>
              <Text style={styles.controlLabel}>GALLERY</Text>
            </View>

            <View style={styles.shutterWrapper}>
              <LinearGradient
                colors={["#7552E8", "#2EE8B3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.shutterOuter}
              >
                <View style={styles.shutterInnerBg}>
                  <Pressable style={styles.shutterBtn} onPress={takePicture}>
                    <CameraIcon color="#FFFFFF" size={28} />
                  </Pressable>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.controlItem}>
              <Pressable style={styles.sideButton} onPress={toggleFlash}>
                {flash === "off" ? (
                  <ZapOff color="#FFFFFF" size={20} />
                ) : (
                  <Zap color={flash === "auto" ? "#FFFFFF" : "#F29C38"} size={20} />
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
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  placeholderBox: {
    width: 44,
    height: 44,
  },
  instructionCard: {
    backgroundColor: "rgba(22, 22, 25, 0.8)",
    marginHorizontal: 40,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  instructionLabel: {
    color: "#A0A0B0",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 2,
    marginBottom: 8,
  },
  instructionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "JetBrainsMono_700Bold",
    textAlign: "center",
    lineHeight: 24,
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
    width: 40,
    height: 40,
    borderColor: "#2EE8B3",
    shadowColor: "#2EE8B3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 12,
    borderColor: "#7552E8",
    shadowColor: "#7552E8",
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 12,
    borderColor: "#7552E8",
    shadowColor: "#7552E8",
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 12,
  },
  reticleHorizontal: {
    position: "absolute",
    top: "50%",
    left: "45%",
    right: "45%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  reticleVertical: {
    position: "absolute",
    top: "45%",
    bottom: "45%",
    left: "50%",
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  controlItem: {
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  sideButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  controlLabel: {
    color: "#A0A0B0",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  shutterWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInnerBg: {
    flex: 1,
    width: "100%",
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#38A1D6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#38A1D6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
});
