import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WorkoutTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function WorkoutTabs({ activeTab, setActiveTab }: WorkoutTabsProps) {
  const handleTabPress = (tab: string) => {
    if (tab === activeTab) return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setActiveTab(tab);
  };

  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.8}
        onPress={() => handleTabPress("gym")}
      >
        {activeTab === "gym" && (
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
        )}
        <Text
          style={[styles.tabText, activeTab === "gym" && styles.activeTabText]}
        >
          GYM WORKOUT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.8}
        onPress={() => handleTabPress("home")}
      >
        {activeTab === "home" && (
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
        )}
        <Text
          style={[styles.tabText, activeTab === "home" && styles.activeTabText]}
        >
          HOME WORKOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  tabText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  activeTabText: {
    color: "#090A10",
    fontWeight: "900",
  },
});
