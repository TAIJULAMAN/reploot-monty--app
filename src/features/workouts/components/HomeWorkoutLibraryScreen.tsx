import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Activity,
  ArrowRight,
  Clock,
  Compass,
  Dumbbell,
  Flame,
  RotateCcw,
  Sparkles,
  User,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  HOME_WORKOUT_LIBRARY_DATA,
  HomeChallengeItem,
  HomeWorkoutLibraryData,
  HomeWorkoutSessionItem,
} from "../data/homeWorkoutLibraryData";

export interface HomeWorkoutLibraryScreenProps {
  data?: HomeWorkoutLibraryData;
  onBack?: () => void;
  onStartQuest?: () => void;
  onSelectChallenge?: (challenge: HomeChallengeItem) => void;
  onSelectSession?: (session: HomeWorkoutSessionItem) => void;
}

export const HomeWorkoutLibraryScreen: React.FC<
  HomeWorkoutLibraryScreenProps
> = ({
  data = HOME_WORKOUT_LIBRARY_DATA,
  onBack,
  onStartQuest,
  onSelectChallenge,
  onSelectSession,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleStartQuest = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    if (onStartQuest) {
      onStartQuest();
    } else {
      router.push({
        pathname: "/workouts/ai-session" as any,
        params: { pathId: data.todayMainQuest.id },
      });
    }
  };

  const handleChallengePress = (challenge: HomeChallengeItem) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onSelectChallenge) {
      onSelectChallenge(challenge);
    } else {
      router.push({
        pathname: "/workouts/ai-session" as any,
        params: { pathId: challenge.id },
      });
    }
  };

  const handleSessionPress = (session: HomeWorkoutSessionItem) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onSelectSession) {
      onSelectSession(session);
    } else if (session.targetRoute) {
      router.push(session.targetRoute as any);
    } else {
      // Default fallback for session cards to Upper Body screen
      router.push("/workouts/upper" as any);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Top Header matching exact screenshot with back button, search, notifications, avatar */}
      <CustomHeader
        transparent={true}
        showBackButton={true}
        onPressBack={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 30, 60) },
        ]}
      >
        {/* Title Section with Masked Gradient Title (Exact Gym Workout Path pattern) */}
        <View style={styles.titleSection}>
          <Text style={styles.categoryBadge}>HOME WORKOUT</Text>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={2}>
                    {"SELECT YOUR\nPATH"}
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </MaskedView>
          </View>
          <Text style={styles.subtitle}>
            Choose your athletic focus & telemetry for today's session
          </Text>
        </View>

        {/* Current XP Progress Box with Neon Aura & Level Status */}
        <View style={styles.xpCardContainer}>
          <LinearGradient
            colors={["rgba(129, 140, 248, 0.08)", "rgba(68, 234, 195, 0.04)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          <View style={styles.xpCardHeader}>
            <View style={styles.xpHeaderLeft}>
              <View style={styles.xpIconBadge}>
                <Zap size={14} color="#44EAC3" fill="#44EAC3" />
              </View>
              <Text style={styles.currentXpLabel}>CURRENT XP</Text>
            </View>
            <Text style={styles.rankUpLabel}>{data.rankUpText}</Text>
          </View>

          <View style={styles.xpValueRow}>
            <Text style={styles.xpMainValue}>{data.currentXp}</Text>
            <Text style={styles.xpSlash}> / </Text>
            <Text style={styles.xpTotalValue}>{data.targetXp}</Text>
          </View>

          {/* Progress Bar Track */}
          <View style={styles.progressBarTrack}>
            <LinearGradient
              colors={["#818CF8", "#44EAC3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressBarFill,
                { width: `${data.progressPercent}%` },
              ]}
            />
          </View>
        </View>

        {/* UPCOMING CHALLENGES Header */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeaderTitle}>UPCOMING CHALLENGES</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.viewAllRow}
            onPress={() => router.push("/workouts/challenges" as any)}
          >
            <Text style={styles.viewAllText}>VIEW ALL</Text>
            <ArrowRight size={13} color="#44EAC3" />
          </TouchableOpacity>
        </View>

        {/* 2-Column Upcoming Challenges Grid */}
        <View style={styles.challengesGrid}>
          {data.upcomingChallenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              activeOpacity={0.85}
              onPress={() => handleChallengePress(challenge)}
              style={styles.challengeCard}
            >
              <View style={styles.challengeImageContainer}>
                <Image
                  source={challenge.image}
                  style={styles.challengeImage}
                  contentFit="cover"
                />
              </View>
              <View style={styles.challengeContent}>
                <Text style={styles.challengeDayBadge}>
                  {challenge.dayBadge}
                </Text>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <View style={styles.challengeXpRow}>
                  <Zap size={11} color="#44EAC3" fill="#44EAC3" />
                  <Text style={styles.challengeXpText}>{challenge.xp}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* SESSIONS Header with description */}
        <View style={[styles.sectionTitleRow, { marginTop: 32, marginBottom: 6 }]}>
          <Text style={styles.sectionHeaderTitle}>SESSIONS</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Select your training split to initiate tailored kinetic tracking and rep counts.
        </Text>

        {/* 2-Column Sessions Grid - Like Gym Workout Path Screen */}
        <View style={styles.sessionsGrid}>
          {data.sessions.map((session) => (
            <TouchableOpacity
              key={session.id}
              activeOpacity={0.85}
              onPress={() => handleSessionPress(session)}
              style={styles.sessionCard}
            >
              {/* Radial Glow Overlay */}
              <View
                style={[
                  styles.glowAura,
                  { backgroundColor: session.glowAura || "rgba(56, 237, 216, 0.12)" },
                ]}
                pointerEvents="none"
              />

              {/* Card Top Row: Lucide Icon + XP Pill (like Gym Workout Path) */}
              <View style={styles.sessionTopRow}>
                <View
                  style={[
                    styles.sessionIconBox,
                    {
                      backgroundColor:
                        session.iconBg || "rgba(56, 237, 216, 0.16)",
                      borderColor:
                        session.iconBorder || "rgba(56, 237, 216, 0.35)",
                    },
                  ]}
                >
                  {session.id === "upper-body" && (
                    <Dumbbell size={20} color={session.tagColor || "#C5C0FF"} />
                  )}
                  {session.id === "lower-body" && (
                    <Activity size={20} color={session.tagColor || "#38EDD8"} />
                  )}
                  {session.id === "full-body" && (
                    <User size={20} color={session.tagColor || "#C5C0FF"} />
                  )}
                  {session.id === "mobility" && (
                    <Compass size={20} color={session.tagColor || "#38EDD8"} />
                  )}
                  {session.id === "hiit" && (
                    <Flame size={20} color={session.tagColor || "#C5C0FF"} />
                  )}
                  {session.id === "strength" && (
                    <Zap size={20} color={session.tagColor || "#38EDD8"} />
                  )}
                  {![
                    "upper-body",
                    "lower-body",
                    "full-body",
                    "mobility",
                    "hiit",
                    "strength",
                  ].includes(session.id) && (
                    <Dumbbell size={20} color="#38EDD8" />
                  )}
                </View>

                <View
                  style={[
                    styles.sessionTagPill,
                    {
                      backgroundColor:
                        session.tagBg || "rgba(56, 237, 216, 0.12)",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sessionTagText,
                      { color: session.tagColor || "#38EDD8" },
                    ]}
                  >
                    {session.tag || "+60 XP"}
                  </Text>
                </View>
              </View>

              {/* Title and Arrow Row */}
              <View style={styles.sessionTitleRow}>
                <Text style={styles.sessionTitleText}>{session.title}</Text>
                <ArrowRight
                  size={16}
                  color={session.arrowColor || "#38EDD8"}
                />
              </View>

              {/* Subtitle / Focus description */}
              <Text style={styles.sessionCardSubtitle} numberOfLines={2}>
                {session.subtitle || "Targeted split for strength & muscular endurance"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  titleSection: {
    marginBottom: 26,
    marginTop: 4,
  },
  categoryBadge: {
    color: "#44EAC3",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  maskedTitleWrapper: {
    height: 84,
    width: "100%",
    marginBottom: 4,
    justifyContent: "center",
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    textAlign: "left",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  xpCardContainer: {
    backgroundColor: "#11141C",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.25)",
    padding: 20,
    marginBottom: 28,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  xpCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  xpHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  xpIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: "rgba(68, 234, 195, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  currentXpLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  rankUpLabel: {
    color: "#44EAC3",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 1.1,
    fontFamily: "monospace",
    textAlign: "right",
    textTransform: "uppercase",
  },
  xpValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  xpMainValue: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: -0.5,
    fontFamily: "monospace",
  },
  xpSlash: {
    color: "#64748B",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  xpTotalValue: {
    color: "#94A3B8",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  progressBarTrack: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  sectionHeader: {
    color: "#94A3B8",
    fontSize: 11.5,
    fontWeight: "800",
    letterSpacing: 1.4,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  mainQuestCard: {
    width: "100%",
    height: 420,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#161922",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 32,
  },
  questContent: {
    ...StyleSheet.absoluteFill,
    padding: 20,
    justifyContent: "flex-end",
  },
  questXpRow: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  questXpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: "rgba(10, 26, 32, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.35)",
  },
  questXpText: {
    color: "#44EAC3",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
  },
  questTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.3,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  questStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  questStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  questStatText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  questCtaButton: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
  },
  questCtaGradient: {
    height: 52,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  questCtaText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.3,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  viewAllRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    color: "#44EAC3",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  challengesGrid: {
    flexDirection: "row",
    gap: 14,
  },
  challengeCard: {
    flex: 1,
    backgroundColor: "#11141C",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    padding: 10,
  },
  challengeImageContainer: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#0D1017",
    marginBottom: 10,
  },
  challengeImage: {
    width: "100%",
    height: "100%",
  },
  challengeContent: {
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  challengeDayBadge: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  challengeTitle: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  challengeXpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  challengeXpText: {
    color: "#44EAC3",
    fontSize: 10.5,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  sectionSubtitle: {
    color: "#94A3B8",
    fontSize: 11.5,
    lineHeight: 16,
    fontFamily: "monospace",
    fontWeight: "600",
    marginBottom: 16,
  },
  sessionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  sessionCard: {
    width: "48%",
    height: 196,
    backgroundColor: "rgba(18, 22, 33, 0.72)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  glowAura: {
    position: "absolute",
    bottom: -30,
    right: -30,
    width: 90,
    height: 90,
    borderRadius: 45,
    opacity: 0.15,
  },
  sessionTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sessionTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sessionTagText: {
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  sessionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 4,
  },
  sessionTitleText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  sessionCardSubtitle: {
    color: "#94A3B8",
    fontSize: 10.5,
    lineHeight: 15,
    fontFamily: "monospace",
    fontWeight: "600",
  },
});
