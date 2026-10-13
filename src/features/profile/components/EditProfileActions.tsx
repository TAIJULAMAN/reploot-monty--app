import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export const EditProfileActions = () => {
  const handleSave = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
  };

  const handleDelete = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    }
  };

  return (
    <View style={styles.actionsContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.saveBtn,
          pressed && styles.btnPressed,
        ]}
        onPress={handleSave}
      >
        <LinearGradient
          colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
          style={styles.saveBtnGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.saveBtnText}>SAVE CHANGES</Text>
        </LinearGradient>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.deleteBtn,
          pressed && styles.btnPressed,
        ]}
        onPress={handleDelete}
      >
        <Text style={styles.deleteBtnText}>DELETE ACCOUNT</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  saveBtn: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  saveBtnGradient: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1.2,
  },
  deleteBtn: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
    backgroundColor: "rgba(239, 68, 68, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#F87171",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1.2,
  },
});
