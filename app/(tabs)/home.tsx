import { WorkoutModalitiesSection } from "@/features/home";
import { AiCoachFloatingCard } from "@/features/home/components/AiCoachFloatingCard";
import { AiWorkoutCard } from "@/features/home/components/AiWorkoutCard";
import { HomeGreeting } from "@/features/home/components/HomeGreeting";
import { NutritionDashboardCard } from "@/features/home/components/NutritionDashboardCard";
import { WeeklyProgressCard } from "@/features/home/components/WeeklyProgressCard";
import { WorkoutHeader } from "@/features/workouts";
import { useAuthStore } from "@/stores/authStore";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

export default function HomeTabRoute() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const userName = user?.fullName?.split(" ")[0] || "ALEX";

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <WorkoutHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <HomeGreeting name={userName} />
        <WeeklyProgressCard />
        <View style={styles.sectionSpacing}>
          <WorkoutModalitiesSection />
        </View>
        <AiWorkoutCard />
        <NutritionDashboardCard />
        <AiCoachFloatingCard />
      </ScrollView>
      <Pressable style={styles.fabContainer} onPress={() => router.push("/coach")}>
        <Image
          source={require("../../assets/coachOnline/floatingButton.png")}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1D1E2C",
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
