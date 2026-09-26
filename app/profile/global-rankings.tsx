import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StandingCard } from "./components/StandingCard";
import { SearchInput } from "./components/SearchInput";
import { WorkoutTabs } from "./components/WorkoutTabs";
import { LeaderboardList } from "./components/LeaderboardList";

export default function GlobalRankingsRoute() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("gym");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#161722", "#0B0D14"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={{ paddingTop: insets.top }}>
        <CustomHeader
          titleVariant="text"
          title=""
          showBackButton={true}
          showSearch={true}
          showNotifications={true}
          showAvatar={true}
          transparent={true}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>GLOBAL{"\n"}RANKINGS</Text>

        <StandingCard />
        <SearchInput />
        <WorkoutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <LeaderboardList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D14",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 20,
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    lineHeight: 44,
    textAlign: "left",
  },
});
