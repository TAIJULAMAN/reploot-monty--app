import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Settings,
  RefreshCw,
  ArrowRight,
  MapPin,
  BarChart2,
  Flag,
  Layers,
  Dumbbell,
  Home,
  Flame,
  Zap,
  Activity,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react-native";
import { router } from "expo-router";

// Mock data structures
const FREQUENCY_OPTIONS = [
  { id: 3, title: "3 DAYS", subtitle: "RECOVERY FOCUS" },
  { id: 4, title: "4 DAYS", subtitle: "RECOMMENDED" },
  { id: 5, title: "5 DAYS", subtitle: "HYPERTROPHY" },
  { id: 6, title: "6 DAYS", subtitle: "HIGH INTENSITY" },
];

const LOCATION_OPTIONS = [
  { id: "gym", title: "GYM", icon: Dumbbell },
  { id: "home", title: "HOME", icon: Home },
];

const EXPERIENCE_OPTIONS = [
  { id: "beginner", title: "BEGINNER" },
  { id: "intermed", title: "INTERMED." },
  { id: "advanced", title: "ADVANCED" },
];

const GOAL_OPTIONS = [
  { id: "muscle", title: "BUILD MUSCLE", icon: Dumbbell },
  { id: "fat", title: "FAT LOSS / SHRED", icon: Flame },
  { id: "strength", title: "STRENGTH & POWER", icon: Zap },
  { id: "endurance", title: "ENDURANCE & AGILITY", icon: Activity },
];

const STYLE_OPTIONS = [
  { id: "bro", title: "CLASSIC BRO-\nSPLIT", subtitle: "1 Muscle / Session" },
  { id: "push", title: "PUSH DAY", subtitle: "Chest, Delts &\nTriceps" },
  { id: "pull", title: "PULL DAY", subtitle: "Back, Lats & Biceps" },
  { id: "upper", title: "UPPER BODY", subtitle: "Full Torso\nHypertrophy" },
  { id: "lower", title: "LOWER BODY /\nLEGS", subtitle: "Quads, Hamstrings,\nGlutes" },
  { id: "full", title: "FULL BODY BLITZ", subtitle: "Compound Functional" },
];

const THEME = {
  bg: "#1D1D23",
  cardBg: "#25252D",
  textGray: "#A0A0B0",
  textWhite: "#FFFFFF",
  iconColor: "#C49A6C",
  selectedCyan: "#2EE8B3",
  selectedBg: "rgba(46, 232, 179, 0.08)",
};

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  const [frequency, setFrequency] = useState(4);
  const [location, setLocation] = useState("gym");
  const [experience, setExperience] = useState("intermed");
  const [goal, setGoal] = useState("muscle");
  const [stylesSelected, setStylesSelected] = useState<string[]>(["push", "upper"]);

  const toggleStyle = (id: string) => {
    setStylesSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const renderSectionHeader = (
    title: string,
    IconComponent: any
  ) => (
    <View style={styles.sectionHeader}>
      <IconComponent size={14} color={THEME.iconColor} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace("/")} style={styles.backBtn}>
          <ChevronLeft color="#94A3B8" size={16} />
        </Pressable>
        <View style={styles.titleContainer}>
          <LinearGradient
            colors={["#6C5CFF", "#44EAC3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.headerIconContainer}
          >
            <Settings color="#FFFFFF" size={24} />
          </LinearGradient>
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Frequency */}
        {renderSectionHeader("1.FREQUENCY (DAYS PER WEEK)", RefreshCw)}
        <View style={styles.grid2}>
          {FREQUENCY_OPTIONS.map((opt) => {
            const isSelected = frequency === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setFrequency(opt.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                ]}
              >
                <Text
                  style={[
                    styles.cardTitle,
                    isSelected && styles.textSelected,
                  ]}
                >
                  {opt.title}
                </Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    isSelected && { color: "#E0E0E0" },
                  ]}
                >
                  {opt.subtitle}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Location */}
        {renderSectionHeader("2.WORKOUT LOCATION", MapPin)}
        <View style={styles.grid2}>
          {LOCATION_OPTIONS.map((opt) => {
            const isSelected = location === opt.id;
            const Icon = opt.icon;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setLocation(opt.id)}
                style={[
                  styles.cardRow,
                  isSelected && styles.cardSelected,
                ]}
              >
                <View style={[styles.iconWrapper, isSelected && { backgroundColor: THEME.selectedCyan }]}>
                  <Icon size={16} color={isSelected ? "#1D1D23" : "#8A8A93"} />
                </View>
                <Text
                  style={[
                    styles.cardTitle,
                    { marginLeft: 12, marginBottom: 0 },
                  ]}
                >
                  {opt.title}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Experience */}
        {renderSectionHeader("3. EXPERIENCE LEVEL", BarChart2)}
        <View style={styles.grid3}>
          {EXPERIENCE_OPTIONS.map((opt) => {
            const isSelected = experience === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setExperience(opt.id)}
                style={[
                  styles.card,
                  { paddingVertical: 20, flexBasis: "31%" },
                  isSelected && styles.cardSelected,
                ]}
              >
                <Text
                  style={[
                    styles.cardTitle,
                    { fontSize: 10, marginBottom: 0 },
                    isSelected && styles.textSelected,
                  ]}
                >
                  {opt.title}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Goal */}
        {renderSectionHeader("4. WORKOUT GOAL", Flag)}
        <View style={styles.grid2}>
          {GOAL_OPTIONS.map((opt) => {
            const isSelected = goal === opt.id;
            const Icon = opt.icon;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setGoal(opt.id)}
                style={[
                  styles.card,
                  { alignItems: "flex-start", padding: 16 },
                  isSelected && styles.cardSelected,
                ]}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 24 }}>
                  <Icon size={18} color={isSelected ? THEME.selectedCyan : "#8A8A93"} />
                  {isSelected && <CheckCircle2 size={16} color={THEME.selectedCyan} />}
                </View>
                <Text
                  style={[
                    styles.cardTitle,
                    { fontSize: 13, marginBottom: 0 },
                    isSelected && { color: "#FFFFFF" },
                  ]}
                >
                  {opt.title}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Style */}
        {renderSectionHeader("5.WORKOUT STYLE", Layers)}
        <View style={styles.grid2}>
          {STYLE_OPTIONS.map((opt) => {
            const isSelected = stylesSelected.includes(opt.id);
            return (
              <Pressable
                key={opt.id}
                onPress={() => toggleStyle(opt.id)}
                style={[
                  styles.card,
                  { alignItems: "flex-start", padding: 16 },
                  isSelected && styles.cardSelected,
                ]}
              >
                <Text
                  style={[
                    styles.cardTitle,
                    { fontSize: 12, marginBottom: 8, lineHeight: 18, textAlign: "left" },
                    isSelected && styles.textSelected,
                  ]}
                >
                  {opt.title}
                </Text>
                <Text style={[styles.cardSubtitle, { textAlign: "left", lineHeight: 14 }]}>
                  {opt.subtitle}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Update Schedule Button */}
        <Pressable style={styles.updateButtonContainer}>
          <LinearGradient
            colors={["#1B648C", "#3FA8DD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.updateButton}
          >
            <RefreshCw color="#FFFFFF" size={20} />
            <Text style={styles.updateButtonText}>
              UPDATE MY WORKOUT{"\n"}SCHEDULE
            </Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </LinearGradient>
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E2E36",
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "JetBrainsMono_700Bold",
    fontStyle: "italic",
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    color: THEME.textGray,
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 0.5,
  },
  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  grid3: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexBasis: "48%",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  cardRow: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexBasis: "48%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: THEME.selectedCyan,
    backgroundColor: THEME.selectedBg,
  },
  cardTitle: {
    color: THEME.textWhite,
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 15,
    marginBottom: 4,
    textAlign: "center",
  },
  cardSubtitle: {
    color: "#8A8A93",
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 9,
    textAlign: "center",
  },
  textSelected: {
    color: THEME.selectedCyan,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#2E2E36",
    justifyContent: "center",
    alignItems: "center",
  },
  updateButtonContainer: {
    marginTop: 32,
    shadowColor: "#3CD4ED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "JetBrainsMono_700Bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});
