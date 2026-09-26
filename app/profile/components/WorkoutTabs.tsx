import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface WorkoutTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function WorkoutTabs({ activeTab, setActiveTab }: WorkoutTabsProps) {
  return (
    <View style={styles.tabsContainer}>
      <Pressable
        style={[styles.tab, activeTab === "gym" && styles.activeTab]}
        onPress={() => setActiveTab("gym")}
      >
        {activeTab === "gym" && (
          <LinearGradient
            colors={["#38EDD8", "#2DD4BF"]}
            style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
          />
        )}
        <Text
          style={[styles.tabText, activeTab === "gym" && styles.activeTabText]}
        >
          GYM WORKOUT
        </Text>
      </Pressable>
      <Pressable
        style={[styles.tab, activeTab === "home" && styles.activeTab]}
        onPress={() => setActiveTab("home")}
      >
        {activeTab === "home" && (
          <LinearGradient
            colors={["#38EDD8", "#2DD4BF"]}
            style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
          />
        )}
        <Text
          style={[styles.tabText, activeTab === "home" && styles.activeTabText]}
        >
          HOME WORKOUT
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "transparent",
    shadowColor: "#38EDD8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  tabText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
  activeTabText: {
    color: "#0B0D14",
  },
});
