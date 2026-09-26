import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const EditProfileActions = () => {
  return (
    <View>
      <Pressable style={styles.saveBtn}>
        <LinearGradient
          colors={["#4B85C4", "#69A6E3"]}
          style={styles.saveBtnGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.saveBtnText}>SAVE CHANGES</Text>
        </LinearGradient>
      </Pressable>

      <Pressable style={styles.deleteBtn}>
        <Text style={styles.deleteBtnText}>DELETE ACCOUNT</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
  },
  saveBtnGradient: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  deleteBtn: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  deleteBtnText: {
    color: "#FFB68C",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
