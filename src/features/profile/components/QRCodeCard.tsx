import { LinearGradient } from "expo-linear-gradient";
import { QrCode, ScanLine } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const QRCodeCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <QrCode size={16} color="#94A3B8" />
        <Text style={styles.cardTitle}>MY KINETQX PROFILE QR</Text>
      </View>
      <View style={styles.qrPlaceholderContainer}>
        <LinearGradient
          colors={[
            "rgba(99,102,241,0.4)",
            "rgba(45,212,191,0.4)",
            "rgba(249,115,22,0.4)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.qrGlowCircle}
        >
          <View style={styles.qrInnerCircle}>
            <ScanLine size={32} color="#FFFFFF" />
          </View>
        </LinearGradient>
      </View>
      <Pressable style={styles.buttonWrapper}>
        <LinearGradient
          colors={["#0284C7", "#38BDF8"]}
          style={styles.btnGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.btnText}>GENERATE MY KINETQX PROFILE QR</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginLeft: 8,
  },
  qrPlaceholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  qrGlowCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  qrInnerCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#151B24",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  btnGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
