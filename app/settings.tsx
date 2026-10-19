import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Svg, { Line as SvgLine } from "react-native-svg";
import * as Haptics from "expo-haptics";
import MaskedView from "@react-native-masked-view/masked-view";
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
} from "lucide-react-native";
import { router } from "expo-router";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";

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
  bg: "#070A11",
  cardBg: "rgba(15, 23, 42, 0.65)",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  textGray: "#94A3B8",
  textWhite: "#FFFFFF",
  iconColor: "#38BDF8",
  selectedCyan: "#00f2fe",
  selectedBg: "rgba(0, 242, 254, 0.08)",
  selectedBorder: "rgba(0, 242, 254, 0.5)",
};

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  const [frequency, setFrequency] = useState(4);
  const [location, setLocation] = useState("gym");
  const [experience, setExperience] = useState("intermed");
  const [goal, setGoal] = useState("muscle");
  const [stylesSelected, setStylesSelected] = useState<string[]>(["push", "upper"]);
  const [isSaved, setIsSaved] = useState(false);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(style).catch(() => {});
    }
  };

  const toggleStyle = (id: string) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setStylesSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const renderSectionHeader = (
    title: string,
    IconComponent: any
  ) => (
    <View style={styles.sectionHeader}>
      <View style={styles.iconBadge}>
        <IconComponent size={13} color="#38BDF8" />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Cyber Kinetic Ambient Gradient & Accent Lines */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
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

      <CustomHeader
        titleVariant="text"
        title=""
        showBackButton={true}
        showSearch={true}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
        onPressBack={() =>
          router.canGoBack() ? router.back() : router.replace("/(tabs)/home")
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 60, 80) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    SETTINGS
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
            System preferences, training frequency & AI engine parameters
          </Text>
        </View>
        
        {/* Frequency */}
        {renderSectionHeader("1. FREQUENCY (DAYS PER WEEK)", RefreshCw)}
        <View style={styles.grid2}>
          {FREQUENCY_OPTIONS.map((opt) => {
            const isSelected = frequency === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.75}
                onPress={() => {
                  triggerHaptic();
                  setFrequency(opt.id);
                }}
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
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Location */}
        {renderSectionHeader("2. WORKOUT LOCATION", MapPin)}
        <View style={styles.grid2}>
          {LOCATION_OPTIONS.map((opt) => {
            const isSelected = location === opt.id;
            const Icon = opt.icon;
            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.75}
                onPress={() => {
                  triggerHaptic();
                  setLocation(opt.id);
                }}
                style={[
                  styles.cardRow,
                  isSelected && styles.cardSelected,
                ]}
              >
                <View style={[styles.iconWrapper, isSelected && { backgroundColor: THEME.selectedCyan }]}>
                  <Icon size={16} color={isSelected ? "#070A11" : "#94A3B8"} />
                </View>
                <Text
                  style={[
                    styles.cardTitle,
                    { marginLeft: 12, marginBottom: 0 },
                    isSelected && styles.textSelected,
                  ]}
                >
                  {opt.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Experience */}
        {renderSectionHeader("3. EXPERIENCE LEVEL", BarChart2)}
        <View style={styles.grid3}>
          {EXPERIENCE_OPTIONS.map((opt) => {
            const isSelected = experience === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.75}
                onPress={() => {
                  triggerHaptic();
                  setExperience(opt.id);
                }}
                style={[
                  styles.card,
                  { paddingVertical: 18, flexBasis: "31%" },
                  isSelected && styles.cardSelected,
                ]}
              >
                <Text
                  style={[
                    styles.cardTitle,
                    { fontSize: 11, marginBottom: 0 },
                    isSelected && styles.textSelected,
                  ]}
                >
                  {opt.title}
                </Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.75}
                onPress={() => {
                  triggerHaptic();
                  setGoal(opt.id);
                }}
                style={[
                  styles.card,
                  { alignItems: "flex-start", padding: 16 },
                  isSelected && styles.cardSelected,
                ]}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
                  <Icon size={18} color={isSelected ? THEME.selectedCyan : "#94A3B8"} />
                  {isSelected && <CheckCircle2 size={16} color={THEME.selectedCyan} />}
                </View>
                <Text
                  style={[
                    styles.cardTitle,
                    { fontSize: 12, marginBottom: 0, textAlign: "left" },
                    isSelected && styles.textSelected,
                  ]}
                >
                  {opt.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Style */}
        {renderSectionHeader("5. WORKOUT STYLE", Layers)}
        <View style={styles.grid2}>
          {STYLE_OPTIONS.map((opt) => {
            const isSelected = stylesSelected.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.75}
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
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Save Training Parameters Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.updateButtonContainer}
          onPress={() => {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
            setIsSaved(true);
            setTimeout(() => {
              setIsSaved(false);
            }, 3000);
          }}
        >
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.updateButton}
          >
            <RefreshCw color="#050811" size={18} />
            <Text style={styles.updateButtonText}>
              SAVE TRAINING PARAMETERS
            </Text>
            <ArrowRight color="#050811" size={18} />
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>

      {/* Floating HUD Sync Toast */}
      {isSaved && (
        <View style={styles.savedToast}>
          <CheckCircle2 size={16} color="#00f2fe" style={{ marginRight: 8 }} />
          <Text style={styles.savedToastText}>
            TRAINING PARAMETERS SYNCHRONIZED
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleSection: {
    marginTop: 4,
    marginBottom: 20,
  },
  maskedTitleWrapper: {
    height: 48,
    width: "100%",
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 14,
    gap: 8,
  },
  iconBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: THEME.textGray,
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
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
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  cardRow: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexBasis: "48%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.cardBorder,
  },
  cardSelected: {
    borderColor: THEME.selectedBorder,
    backgroundColor: THEME.selectedBg,
  },
  cardTitle: {
    color: THEME.textWhite,
    fontFamily: "monospace",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 4,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: "#64748B",
    fontFamily: "monospace",
    fontWeight: "700",
    fontSize: 9,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  textSelected: {
    color: THEME.selectedCyan,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  updateButtonContainer: {
    marginTop: 28,
    borderRadius: 16,
    overflow: "hidden",
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },
  updateButtonText: {
    color: "#050811",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1,
  },
  savedToast: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7, 10, 17, 0.95)",
    borderWidth: 1.5,
    borderColor: "#00f2fe",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    zIndex: 9999,
    elevation: 12,
    shadowColor: "#00f2fe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  savedToastText: {
    color: "#00f2fe",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
  },
});
