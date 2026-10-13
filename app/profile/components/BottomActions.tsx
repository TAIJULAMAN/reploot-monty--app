import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Trash2 } from "lucide-react-native";
import React from "react";

export function BottomActions() {
  const handleLogout = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    Alert.alert(
      "CONFIRM LOGOUT",
      "Are you sure you want to terminate your current session?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => {} },
      ],
    );
  };

  const handleDeleteAccount = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(
        () => {},
      );
    }
    Alert.alert(
      "DELETE ACCOUNT",
      "This action will permanently delete all telemetry, streak logs, and workout records. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete Permanently", style: "destructive", onPress: () => {} },
      ],
    );
  };

  return (
    <View style={styles.bottomActions}>
      {/* Logout Button */}
      <Pressable
        style={({ pressed }) => [
          styles.logoutBtn,
          pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        ]}
        onPress={handleLogout}
      >
        <LinearGradient
          colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.logoutGradient}
        >
          <Text style={styles.logoutText}>TERMINATE SESSION (LOG OUT)</Text>
        </LinearGradient>
      </Pressable>

      {/* Delete Account Button */}
      <Pressable
        style={({ pressed }) => [
          styles.deleteAccountBtn,
          pressed && { opacity: 0.7 },
        ]}
        onPress={handleDeleteAccount}
      >
        <Trash2 size={15} color="#EF4444" style={{ marginRight: 8 }} />
        <Text style={styles.deleteAccountText}>DELETE ATHLETE ACCOUNT</Text>
      </Pressable>

      <Text style={styles.footerVersion}>
        REPLOOT ENGINE V1.0.0 • SECURE PROTOCOL
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActions: {
    marginTop: 10,
    alignItems: "center",
  },
  logoutBtn: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  logoutGradient: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  deleteAccountBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    marginBottom: 28,
  },
  deleteAccountText: {
    color: "#EF4444",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  footerVersion: {
    color: "#475569",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});
