import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Search, Bell, Sparkles, Award, TrendingUp, Flame, BarChart2, History, ChevronRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function ProgressTabRoute() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.logoText}>KINETQX</Text>
        <View style={styles.headerRight}>
          <Search color="#FFFFFF" size={20} />
          <Bell color="#FFFFFF" size={20} />
          <Image
            source={require("../../assets/coachOnline/coachOnline.png")}
            style={styles.avatar}
            contentFit="cover"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.titleGlow}>LEVEL</Text>
          <Text style={styles.titleGlow}>UP...</Text>
        </View>

        {/* Level Card */}
        <View style={styles.levelCardWrapper}>
          <LinearGradient
            colors={["#7552E8", "#2EE8B3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardBorder}
          >
            <LinearGradient
              colors={["#352B58", "#1E2A38"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.levelCardInner}
            >
              <View style={styles.levelHeaderRow}>
                <View>
                  <Text style={styles.currentStatusLabel}>CURRENT STATUS</Text>
                  <Text style={styles.levelMainText}>Level 12</Text>
                </View>
                <View style={styles.sparkleBadge}>
                  <Sparkles color="#2EE8B3" size={20} />
                </View>
              </View>

              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={["#7552E8", "#2EE8B3"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: "81%" }]}
                />
              </View>

              <View style={styles.xpRow}>
                <Text style={styles.xpTextLeft}>
                  2,450 /{"\n"}3,000 XP
                </Text>
                <Text style={styles.xpTextRight}>
                  ONLY 550 XP LEFT TO REACH{"\n"}THE NEXT LEVEL!
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>
        </View>

        {/* Personal Records */}
        <View style={styles.prCard}>
          <View style={styles.prHeader}>
            <View style={styles.prIconWrapper}>
              <Award color="#A0A0B0" size={18} />
            </View>
            <Text style={styles.prTitle}>PERSONAL{"\n"}RECORDS</Text>
          </View>
          
          <View style={styles.prProgressRow}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <TrendingUp color="#F29C38" size={16} />
              <Text style={styles.prProgressLabel}>Overall Progress</Text>
            </View>
            <Text style={styles.prProgressStatus}>Excellent</Text>
          </View>

          <Pressable style={styles.viewRecordsBtn}>
            <Text style={styles.viewRecordsText}>VIEW ALL RECORDS</Text>
          </Pressable>
        </View>

        {/* Quote Card */}
        <View style={styles.quoteCard}>
          <View style={styles.flameIconWrapper}>
            <Flame color="#FFFFFF" size={18} fill="#F29C38" />
          </View>
          <Text style={styles.quoteText}>
            Every workout{"\n"}makes you{"\n"}stronger.
          </Text>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <Text style={styles.streakTitle}>12 Day Streak</Text>
          <Text style={styles.streakDesc}>Complete today's workout to{"\n"}keep your streak alive.</Text>
          
          <Pressable style={{ marginTop: 20 }}>
            <LinearGradient
              colors={["#1B648C", "#3FA8DD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startWorkoutBtn}
            >
              <Text style={styles.startWorkoutText}>START TODAY'S WORKOUT</Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Weekly Challenge Card */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>Weekly{"\n"}Challenge</Text>
            <View style={styles.xpPill}>
              <Text style={styles.xpPillText}>+500{"\n"}XP</Text>
            </View>
          </View>
          <Text style={styles.challengeDesc}>Complete 5 workouts this{"\n"}week</Text>

          <View style={styles.segmentsRow}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.segment, 
                  { backgroundColor: index < 3 ? "#F29C38" : "rgba(255,255,255,0.1)" }
                ]} 
              />
            ))}
          </View>
          <Text style={styles.challengeProgressText}>3 / 5 PROGRESS</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
              <BarChart2 color="#A0A0B0" size={18} />
            </View>
            <Text style={styles.menuText}>View Reports</Text>
            <ChevronRight color="#A0A0B0" size={18} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
              <History color="#2EE8B3" size={18} />
            </View>
            <Text style={styles.menuText}>Workout History</Text>
            <ChevronRight color="#A0A0B0" size={18} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
              <Award color="#A0A0B0" size={18} />
            </View>
            <Text style={styles.menuText}>Achievements</Text>
            <ChevronRight color="#A0A0B0" size={18} />
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111114",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    paddingBottom: 16,
  },
  logoText: {
    color: "#38A1D6",
    fontSize: 20,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2EE8B3",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  titleSection: {
    marginBottom: 32,
  },
  titleGlow: {
    color: "#FFFFFF",
    fontSize: 42,
    fontFamily: "JetBrainsMono_700Bold",
    lineHeight: 44,
    textShadowColor: "#44EAC3",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  levelCardWrapper: {
    marginBottom: 24,
    shadowColor: "#44EAC3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  cardBorder: {
    padding: 1,
    borderRadius: 24,
  },
  levelCardInner: {
    borderRadius: 23,
    padding: 24,
  },
  levelHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  currentStatusLabel: {
    color: "#A0A0B0",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 2,
    marginBottom: 8,
  },
  levelMainText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: "JetBrainsMono_700Bold",
  },
  sparkleBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(46, 232, 179, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  xpTextLeft: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
    lineHeight: 16,
  },
  xpTextRight: {
    color: "#2EE8B3",
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
    lineHeight: 14,
    textAlign: "right",
  },
  prCard: {
    backgroundColor: "#16161A",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  prHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  prIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  prTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "JetBrainsMono_700Bold",
    lineHeight: 22,
  },
  prProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  prProgressLabel: {
    color: "#A0A0B0",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  prProgressStatus: {
    color: "#2EE8B3",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
  },
  viewRecordsBtn: {
    borderWidth: 1,
    borderColor: "rgba(46, 232, 179, 0.2)",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  viewRecordsText: {
    color: "#2EE8B3",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  quoteCard: {
    backgroundColor: "#16161A",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  flameIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(242, 156, 56, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  quoteText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    lineHeight: 26,
  },
  streakCard: {
    backgroundColor: "#16161A",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  streakTitle: {
    color: "#F29C38",
    fontSize: 24,
    fontFamily: "JetBrainsMono_700Bold",
    marginBottom: 8,
  },
  streakDesc: {
    color: "#A0A0B0",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  startWorkoutBtn: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#38A1D6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  startWorkoutText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  challengeCard: {
    backgroundColor: "#16161A",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(242, 156, 56, 0.15)",
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  challengeTitle: {
    color: "#F29C38",
    fontSize: 20,
    fontFamily: "JetBrainsMono_700Bold",
    lineHeight: 24,
  },
  xpPill: {
    backgroundColor: "#F29C38",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: "center",
  },
  xpPillText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    textAlign: "center",
    lineHeight: 12,
  },
  challengeDesc: {
    color: "#A0A0B0",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 20,
    lineHeight: 18,
  },
  segmentsRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  challengeProgressText: {
    color: "#F29C38",
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
    textAlign: "right",
  },
  menuList: {
    gap: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16161A",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  menuIconWrapper: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
