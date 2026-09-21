import { WorkoutModalitiesSection } from "@/features/home";
import { useAuthStore } from "@/stores/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Activity,
  Award,
  Clock,
  Flame,
  Play,
  Sparkles,
  Zap,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeTabRoute() {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);

  const userName = user?.fullName?.split(" ")[0] || "Kinetic";

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Ambient Background Glows */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: "#080A10" }]}
        />
        <LinearGradient
          colors={[
            "rgba(56, 189, 248, 0.12)",
            "rgba(99, 102, 241, 0.05)",
            "transparent",
          ]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 0.5 }}
          style={styles.ambientTopGlow}
        />
        <LinearGradient
          colors={["transparent", "rgba(45, 212, 191, 0.06)", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.ambientMidGlow}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingTop: Math.max(insets.top + 12, 24),
            paddingBottom: 110, // Generous padding so TabBar never covers content
          },
        ]}
      >
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingSub}>WELCOME BACK</Text>
            <Text style={styles.greetingName}>{userName.toUpperCase()} ⚡</Text>
          </View>

          {/* Streak Counter Pill */}
          <View style={styles.streakPill}>
            <Flame size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.streakText}>12 DAYS</Text>
          </View>
        </View>

        {/* AI Coach Status Banner */}
        <View style={styles.aiCoachBanner}>
          <LinearGradient
            colors={["rgba(45, 212, 191, 0.16)", "rgba(99, 102, 241, 0.08)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiCoachBannerGradient}
          >
            <View style={styles.aiCoachBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.aiCoachBadgeText}>AI COACH READY</Text>
            </View>
            <Text style={styles.aiCoachMessage}>
              Biomechanics calibrated • Target routine ready for your next
              session.
            </Text>
          </LinearGradient>
        </View>

        {/* Hero Workout Card */}
        <View style={styles.heroCardContainer}>
          <LinearGradient
            colors={["#161B2E", "#0F1320"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroCardHeader}>
              <View style={styles.workoutTag}>
                <Sparkles size={13} color="#2DD4BF" />
                <Text style={styles.workoutTagText}>TODAY'S AI WORKOUT</Text>
              </View>
              <Text style={styles.levelBadge}>LVL 42 • ELITE</Text>
            </View>

            <Text style={styles.workoutTitle}>Hypertrophy & Kinetic Power</Text>
            <Text style={styles.workoutDesc}>
              Chest, Shoulders & Explosive Triceps • Custom AI adaptive volume
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Clock size={15} color="#94A3B8" />
                <Text style={styles.metaText}>45 MIN</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Flame size={15} color="#F59E0B" />
                <Text style={styles.metaText}>480 KCAL</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Zap size={15} color="#38BDF8" />
                <Text style={styles.metaText}>HIGH INTENSITY</Text>
              </View>
            </View>

            {/* Start Workout Button */}
            <Pressable style={styles.startWorkoutButton}>
              <LinearGradient
                colors={["#2DD4BF", "#0EA5E9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.startWorkoutGradient}
              >
                <Play
                  size={18}
                  color="#0B0E14"
                  fill="#0B0E14"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.startWorkoutText}>START WORKOUT</Text>
              </LinearGradient>
            </Pressable>
          </LinearGradient>
        </View>

        {/* Daily Kinetic Metrics Row */}
        <Text style={styles.sectionHeading}>DAILY METRICS</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            title="CALORIES"
            current="640"
            target="850 kcal"
            color="#2DD4BF"
            icon={<Flame size={18} color="#2DD4BF" />}
          />
          <MetricCard
            title="ACTIVE TIME"
            current="42"
            target="60 min"
            color="#38BDF8"
            icon={<Activity size={18} color="#38BDF8" />}
          />
          <MetricCard
            title="KINETIC XP"
            current="1,450"
            target="Tier 1"
            color="#818CF8"
            icon={<Award size={18} color="#818CF8" />}
          />
        </View>

        {/* Training Modalities */}
        {/* <Text style={styles.sectionHeading}>TRAINING MODALITIES</Text> */}
        <WorkoutModalitiesSection style={styles.modalitiesSection} />
      </ScrollView>
    </View>
  );
}

function MetricCard({
  title,
  current,
  target,
  color,
  icon,
}: {
  title: string;
  current: string;
  target: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricCardTop}>
        <Text style={styles.metricTitle}>{title}</Text>
        {icon}
      </View>
      <Text style={[styles.metricValue, { color }]}>{current}</Text>
      <Text style={styles.metricTarget}>/ {target}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080A10",
  },
  ambientTopGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 360,
  },
  ambientMidGlow: {
    position: "absolute",
    top: 320,
    left: 0,
    right: 0,
    height: 300,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingSub: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  greetingName: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    gap: 6,
  },
  streakText: {
    color: "#F59E0B",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  aiCoachBanner: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.2)",
    marginBottom: 20,
  },
  aiCoachBannerGradient: {
    padding: 14,
  },
  aiCoachBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2DD4BF",
    marginRight: 8,
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  aiCoachBadgeText: {
    color: "#2DD4BF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  aiCoachMessage: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  heroCardContainer: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.09)",
    marginBottom: 26,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  heroCard: {
    padding: 20,
  },
  heroCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  workoutTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  workoutTagText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  levelBadge: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  workoutTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
    marginBottom: 6,
  },
  workoutDesc: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "700",
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    marginHorizontal: 10,
  },
  startWorkoutButton: {
    borderRadius: 14,
    overflow: "hidden",
  },
  startWorkoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  startWorkoutText: {
    color: "#0B0E14",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },
  sectionHeading: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 26,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#0F1320",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    padding: 12,
  },
  metricCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  metricTitle: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 24,
  },
  metricTarget: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  modalitiesSection: {
    marginBottom: 24,
  },
});
