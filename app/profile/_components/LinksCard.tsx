import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ChevronRight, FileText, Info, Shield } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function LinksCard() {
  const router = useRouter();

  const handlePress = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push(route as any);
  };

  return (
    <View style={styles.card}>
      {/* Privacy Policy */}
      <TouchableOpacity
        style={styles.linkRow}
        activeOpacity={0.75}
        onPress={() => handlePress("/profile/privacy-policy")}
      >
        <View style={styles.linkLeft}>
          <View style={styles.iconBadge}>
            <Shield size={16} color="#38BDF8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle}>PRIVACY PROTOCOL</Text>
            <Text style={styles.linkSubtitle}>
              Data telemetry & encryption policies
            </Text>
          </View>
        </View>
        <View style={styles.chevronWrapper}>
          <ChevronRight size={16} color="#38BDF8" />
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Terms & Conditions */}
      <TouchableOpacity
        style={styles.linkRow}
        activeOpacity={0.75}
        onPress={() => handlePress("/profile/terms")}
      >
        <View style={styles.linkLeft}>
          <View style={styles.iconBadge}>
            <FileText size={16} color="#38BDF8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle}>TERMS OF SERVICE</Text>
            <Text style={styles.linkSubtitle}>Athletic platform agreement</Text>
          </View>
        </View>
        <View style={styles.chevronWrapper}>
          <ChevronRight size={16} color="#38BDF8" />
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* About */}
      <TouchableOpacity
        style={styles.linkRow}
        activeOpacity={0.75}
        onPress={() => handlePress("/profile/about")}
      >
        <View style={styles.linkLeft}>
          <View style={styles.iconBadge}>
            <Info size={16} color="#38BDF8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle}>ABOUT REPLOOT</Text>
            <Text style={styles.linkSubtitle}>
              Architecture, team & release logs
            </Text>
          </View>
        </View>
        <View style={styles.chevronWrapper}>
          <ChevronRight size={16} color="#38BDF8" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 18,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    marginVertical: 14,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  linkTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  linkSubtitle: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
  },
  chevronWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
