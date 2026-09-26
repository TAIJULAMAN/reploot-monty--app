import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Trash2 } from "lucide-react-native";

export function BottomActions() {
  return (
    <View style={styles.bottomActions}>
      <Pressable style={styles.logoutBtn}>
        <LinearGradient
          colors={["#3568A5", "#4B85C4", "#69A6E3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoutGradient}
        >
          <Text style={styles.logoutText}>LOG OUT</Text>
        </LinearGradient>
      </Pressable>

      <Pressable style={styles.deleteAccountBtn}>
        <Trash2 size={16} color="#EF4444" style={{ marginRight: 8 }} />
        <Text style={styles.deleteAccountText}>Delete Account</Text>
      </Pressable>

      <Text style={styles.footerVersion}>REPLOOT AI ENGINE V2.4.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActions: {
    marginTop: 20,
    alignItems: "center",
  },
  logoutBtn: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
  },
  logoutGradient: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  deleteAccountBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  deleteAccountText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  footerVersion: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 2,
  },
});
