import { WorkoutModalitiesSection } from "@/features/home";
import { AiCoachFloatingCard } from "@/features/home/components/AiCoachFloatingCard";
import { AiWorkoutCard } from "@/features/home/components/AiWorkoutCard";
import { HomeGreeting } from "@/features/home/components/HomeGreeting";
import { NutritionDashboardCard } from "@/features/home/components/NutritionDashboardCard";
import { TodaysMissionsCard } from "@/features/home/components/TodaysMissionsCard";
import { WeeklyProgressCard } from "@/features/home/components/WeeklyProgressCard";
import { WorkoutHeader } from "@/features/workouts";
import { useAppSelector } from "@/store/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function HomeTabRoute() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const userName = user?.fullName?.split(" ")[0] || "USER";

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View
        style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg
          style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}
          pointerEvents="none"
        >
          <SvgLine
            x1="420"
            y1="-20"
            x2="-40"
            y2="440"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
          />
          <SvgLine
            x1="460"
            y1="260"
            x2="-40"
            y2="760"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeWidth="1"
          />
          <SvgLine
            x1="480"
            y1="560"
            x2="-40"
            y2="1080"
            stroke="rgba(56, 237, 216, 0.04)"
            strokeWidth="1"
          />
        </Svg>
      </View>
      <WorkoutHeader transparent={true} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <HomeGreeting name={userName} />
        <WeeklyProgressCard />
        <TodaysMissionsCard />
        <View style={styles.sectionSpacing}>
          <WorkoutModalitiesSection />
        </View>
        <AiWorkoutCard />
        <NutritionDashboardCard />
        <AiCoachFloatingCard />
      </ScrollView>
      <Pressable
        style={styles.fabContainer}
        onPress={() => router.push("/coach")}
      >
        <Image
          source={require("../../assets/coachOnline/floatingButton.png")}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 110,
  },
  sectionSpacing: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  fabContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 50,
  },
});
