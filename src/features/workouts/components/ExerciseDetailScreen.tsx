import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Check,
  ChevronDown,
  Eye,
  Flame,
  Minus,
  MoveDiagonal,
  Play,
  Plus,
  Radio,
  Sliders,
  TrendingUp,
  Video,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";
import {
  ExerciseDetailConfig,
  SetDetailItem,
} from "../data/exerciseDetailsData";

const { width } = Dimensions.get("window");

export interface ExerciseDetailScreenProps {
  exerciseData: ExerciseDetailConfig;
  onBack?: () => void;
  onStartExercise?: () => void;
  onViewFullWorkout?: () => void;
  onMarkDone?: () => void;
}

export const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({
  exerciseData,
  onBack,
  onStartExercise,
  onViewFullWorkout,
  onMarkDone,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Selected Step Tab (0, 1, 2)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isMarkedDone, setIsMarkedDone] = useState<boolean>(false);

  // Dynamic Sets State
  const [sets, setSets] = useState<SetDetailItem[]>(exerciseData.sets);
  const [totalSetsCount, setTotalSetsCount] = useState<number>(
    exerciseData.defaultSetsCount || exerciseData.sets.length || 4,
  );

  // Rest Period input
  const [restSeconds, setRestSeconds] = useState<string>(
    String(exerciseData.defaultRestSec || 75),
  );

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/workouts");
    }
  };

  const handleStartExercise = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    if (onStartExercise) {
      onStartExercise();
    } else {
      router.push({
        pathname: "/workouts/ai-session" as any,
        params: {
          exerciseId: exerciseData.id,
        },
      });
    }
  };

  const handleViewFullWorkout = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onViewFullWorkout) {
      onViewFullWorkout();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const handleToggleMarkDone = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }
    setIsMarkedDone((prev) => !prev);
    onMarkDone?.();
  };

  const handleStepSelect = (index: number) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setActiveStepIndex(index);
  };

  // Modify sets count (+ / -)
  const handleModifySets = (delta: number) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    const newCount = Math.max(1, Math.min(8, totalSetsCount + delta));
    setTotalSetsCount(newCount);

    if (delta > 0 && sets.length < newCount) {
      const last = sets[sets.length - 1] || { reps: 8, weightKg: 50 };
      setSets([
        ...sets,
        {
          setNumber: newCount,
          reps: last.reps,
          weightKg: last.weightKg,
        },
      ]);
    } else if (delta < 0 && sets.length > newCount) {
      setSets(sets.slice(0, newCount));
    }
  };

  // Modify reps or weight for a specific set index
  const handleUpdateSet = (
    index: number,
    field: "reps" | "weightKg",
    delta: number,
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    setSets((prevSets) =>
      prevSets.map((s, idx) => {
        if (idx !== index) return s;
        const currentVal = s[field];
        const stepAmount = field === "weightKg" ? 2.5 : 1;
        const minVal = field === "weightKg" ? 0 : 1;
        const updatedVal = Math.max(minVal, currentVal + delta * stepAmount);
        return {
          ...s,
          [field]: updatedVal,
        };
      }),
    );
  };

  const currentStep =
    exerciseData.executionSteps[activeStepIndex] ||
    exerciseData.executionSteps[0];

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

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
        transparent={true}
        showBackButton
        onPressBack={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 40, 60) },
        ]}
      >
        {/* Title Section with Masked Gradient Title (Exact progress.tsx / GenericWorkoutDetailScreen pattern) */}
        <View style={styles.titleSection}>
          <Text style={styles.categoryBadge}>EXERCISE TELEMETRY</Text>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                  >
                    {"EXERCISE DETAILS"}
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
            Biomechanical breakdown, progressive sets & execution cues
          </Text>
        </View>

        {/* Hero Poster Card: Big glowing image with Focus Tag & Exercise Title */}
        <View style={styles.heroPosterCard}>
          <Image
            source={exerciseData.heroImage}
            style={styles.heroPosterImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(7, 10, 17, 0.4)",
              "rgba(7, 10, 17, 0.95)",
            ]}
            locations={[0.3, 0.65, 1]}
            style={styles.heroPosterGradient}
          />
          <View style={styles.heroPosterContent}>
            <Text style={styles.heroFocusTag}>
              {exerciseData.focusBadge || "POWER FOCUS"}
            </Text>
            <Text style={styles.heroExerciseTitle}>{exerciseData.title}</Text>
          </View>
        </View>

        {/* Primary Action 1: START EXERCISE (Gradient CTA) */}
        <Pressable
          style={({ pressed }) => [
            styles.startExerciseButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}
          onPress={handleStartExercise}
        >
          <LinearGradient
            colors={["#3877E3", "#5C99F8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startExerciseGradient}
          >
            <View style={styles.playIconCircle}>
              <Play size={14} color="#3877E3" fill="#3877E3" />
            </View>
            <Text style={styles.startExerciseText}>START EXERCISE</Text>
          </LinearGradient>
        </Pressable>

        {/* Secondary Action 2: VIEW FULL WORKOUT */}
        <Pressable
          style={({ pressed }) => [
            styles.secondaryOutlineButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleViewFullWorkout}
        >
          <Eye size={17} color="#FFFFFF" />
          <Text style={styles.secondaryButtonText}>VIEW FULL WORKOUT</Text>
        </Pressable>

        {/* Secondary Action 3: MARK AS DONE */}
        <Pressable
          style={({ pressed }) => [
            styles.markDoneButton,
            isMarkedDone && styles.markDoneButtonActive,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleToggleMarkDone}
        >
          <View
            style={[
              styles.markDoneCheckCircle,
              isMarkedDone && styles.markDoneCheckCircleActive,
            ]}
          >
            <Check size={13} color="#070A11" strokeWidth={3} />
          </View>
          <Text
            style={[
              styles.markDoneText,
              isMarkedDone && styles.markDoneTextActive,
            ]}
          >
            {isMarkedDone ? "COMPLETED" : "MARK AS DONE"}
          </Text>
        </Pressable>

        {/* Video Demo Section Header */}
        <View style={styles.demoHeaderRow}>
          <View style={styles.demoTitleLeft}>
            <Video size={17} color="#44EAC3" />
            <Text style={styles.demoHeaderTitle}>WATCH DEMO</Text>
          </View>
          <Text style={styles.demoTrackingText}>REAL-TIME AI TRACKING</Text>
        </View>

        {/* Video Demo Thumbnail Card with Play Overlay */}
        <View style={styles.demoThumbnailCard}>
          <Image
            source={
              exerciseData.demoVideoThumbnail ||
              require("../../../../assets/workoutLibraryDetails/wld_hero.png")
            }
            style={styles.demoThumbnailImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(10, 14, 24, 0.2)", "rgba(10, 14, 24, 0.85)"]}
            style={styles.demoThumbnailGradient}
          />
          <View style={styles.demoPlayCenter}>
            <View style={styles.demoPlayOuterRing}>
              <Play
                size={22}
                color="#44EAC3"
                fill="#44EAC3"
                style={{ marginLeft: 3 }}
              />
            </View>
            <Text style={styles.demoCardTitle}>
              {exerciseData.demoTitle || "POWER UP"}
            </Text>
            <Text style={styles.demoCardSubtitle}>
              {exerciseData.demoSubtitle || "GEN-Z FIT APP DEMO"}
            </Text>
          </View>
        </View>

        {/* Execution Steps Card with Multi-Tab switcher */}
        <View style={styles.stepsCard}>
          <View style={styles.stepsHeaderRow}>
            <View style={styles.stepsHeaderLeft}>
              <View style={styles.stepsIconBadge}>
                <Sliders size={15} color="#818CF8" />
              </View>
              <Text style={styles.stepsHeaderText}>EXECUTION STEPS</Text>
            </View>
            <ChevronDown size={18} color="#94A3B8" />
          </View>

          {/* Steps Tabs (01 SETUP, 02 DESCENT, 03 PRESS) */}
          <View style={styles.stepTabsRow}>
            {exerciseData.executionSteps.map((step, idx) => {
              const isSelected = idx === activeStepIndex;
              return (
                <Pressable
                  key={step.id}
                  style={[
                    styles.stepTabButton,
                    isSelected && styles.stepTabButtonActive,
                  ]}
                  onPress={() => handleStepSelect(idx)}
                >
                  <Text
                    style={[
                      styles.stepTabText,
                      isSelected && styles.stepTabTextActive,
                    ]}
                  >
                    {step.tabLabel}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Step Detail Content Card */}
          <View style={styles.stepDetailContentCard}>
            <View style={styles.stepTitleRow}>
              <View style={styles.stepNumberBadge}>
                <Text style={styles.stepNumberText}>
                  {currentStep.stepNumber}
                </Text>
              </View>
              <Text style={styles.stepTitle}>{currentStep.title}</Text>
            </View>

            <Text style={styles.stepDescription}>
              {currentStep.description}
            </Text>

            {/* Coach Cue */}
            <View style={styles.coachCueRow}>
              <Radio size={14} color="#44EAC3" />
              <Text style={styles.coachCueText}>
                <Text style={styles.coachCueBold}>Coach Cue: </Text>
                {currentStep.coachCue}
              </Text>
            </View>
          </View>
        </View>

        {/* Target Areas Card with Anatomical / Kinetic Thumbnail */}
        <View style={styles.targetAreasCard}>
          <View style={styles.targetBodyThumbBox}>
            <Image
              source={require("../../../../assets/workoutLibraryDetails/wld4.png")}
              style={styles.targetBodyImage}
              contentFit="cover"
            />
          </View>
          <View style={styles.targetInfoCol}>
            <Text style={styles.targetAreasHeader}>Target Areas</Text>
            <Text style={styles.targetMusclePrimary}>
              {exerciseData.targetAreasTitle || "Chest & Triceps"}
            </Text>
            <View style={styles.muscleTagsRow}>
              {exerciseData.targetTags.map((tag) => (
                <View key={tag} style={styles.muscleTagPill}>
                  <Text style={styles.muscleTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 3-Col Meta Attributes (Equipment, Difficulty, Calories) */}
        <View style={styles.metaStatsRow}>
          <View style={styles.metaStatBox}>
            <MoveDiagonal size={16} color="#818CF8" />
            <Text style={styles.metaStatLabel}>EQUIPMENT</Text>
            <Text style={styles.metaStatValue}>
              {exerciseData.equipment || "Barbell"}
            </Text>
          </View>

          <View style={styles.metaStatBox}>
            <TrendingUp size={16} color="#34D399" />
            <Text style={styles.metaStatLabel}>DIFFICULTY</Text>
            <Text style={styles.metaStatValue}>
              {exerciseData.difficulty || "Intm."}
            </Text>
          </View>

          <View style={styles.metaStatBox}>
            <Flame size={16} color="#FB923C" />
            <Text style={styles.metaStatLabel}>CALORIES</Text>
            <Text style={styles.metaStatValue}>
              {exerciseData.calories || "120 kcal"}
            </Text>
          </View>
        </View>

        {/* Sets & Reps Interactive Telemetry Card */}
        <View style={styles.setsRepsCard}>
          <View style={styles.setsRepsHeaderRow}>
            <View style={styles.setsRepsHeaderLeft}>
              <Sliders size={16} color="#818CF8" />
              <Text style={styles.setsRepsHeaderText}>SETS & REPS</Text>
            </View>
            <View style={styles.targetBadge}>
              <Text style={styles.targetBadgeText}>TARGET</Text>
            </View>
          </View>

          {/* Sets Incrementer Row */}
          <View style={styles.setsCounterRow}>
            <Pressable
              style={styles.counterBtn}
              onPress={() => handleModifySets(-1)}
            >
              <Minus size={16} color="#FFFFFF" />
            </Pressable>
            <View style={styles.setsDisplayNumber}>
              <Text style={styles.setsNumberLarge}>{totalSetsCount}</Text>
              <Text style={styles.setsNumberLabel}>SETS</Text>
            </View>
            <Pressable
              style={styles.counterBtn}
              onPress={() => handleModifySets(1)}
            >
              <Plus size={16} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text style={styles.pyramidProtocolText}>
            TARGET REPS & WEIGHT PER SET:{" "}
            <Text style={styles.pyramidProtocolCyan}>PROGRESSIVE PYRAMID</Text>
          </Text>

          {/* Interactive Columns for Sets (Horizontally scrollable when > 4 sets) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.setColumnsScrollContent,
              sets.length <= 4 && styles.setColumnsScrollContentFit,
            ]}
          >
            {sets.map((item, index) => (
              <View
                key={item.setNumber}
                style={[
                  styles.setColumnItem,
                  sets.length <= 4 && styles.setColumnItemFlexible,
                ]}
              >
                <Text style={styles.setColNumberLabel}>
                  SET {item.setNumber}
                </Text>
                <Text style={styles.setColSubLabel}>REPS</Text>

                {/* Reps Counter */}
                <View style={styles.miniStepperRow}>
                  <Pressable
                    style={styles.miniStepperBtn}
                    onPress={() => handleUpdateSet(index, "reps", -1)}
                  >
                    <Minus size={11} color="#94A3B8" />
                  </Pressable>
                  <Text style={styles.miniStepperValue}>{item.reps}</Text>
                  <Pressable
                    style={styles.miniStepperBtn}
                    onPress={() => handleUpdateSet(index, "reps", 1)}
                  >
                    <Plus size={11} color="#94A3B8" />
                  </Pressable>
                </View>

                <Text style={styles.setColSubLabel}>WEIGHT</Text>

                {/* Weight Counter */}
                <View style={styles.miniStepperRow}>
                  <Pressable
                    style={styles.miniStepperBtn}
                    onPress={() => handleUpdateSet(index, "weightKg", -1)}
                  >
                    <Minus size={11} color="#94A3B8" />
                  </Pressable>
                  <Text style={styles.miniStepperValue}>{item.weightKg}</Text>
                  <Pressable
                    style={styles.miniStepperBtn}
                    onPress={() => handleUpdateSet(index, "weightKg", 1)}
                  >
                    <Plus size={11} color="#94A3B8" />
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Rest Period Customization Card */}
        <View style={styles.restPeriodCard}>
          <View style={styles.restHeaderRow}>
            <Text style={styles.restHeaderTitle}>REST PERIOD</Text>
            <Text style={styles.restTargetLabel}>TARGET</Text>
          </View>

          <View style={styles.restInputRow}>
            <View style={styles.restInputBox}>
              <TextInput
                value={restSeconds}
                onChangeText={setRestSeconds}
                keyboardType="numeric"
                style={styles.restTextInput}
                placeholderTextColor="#64748B"
                placeholder="Custom sec"
              />
              <Text style={styles.restSecLabel}>SEC</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.setRestButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={() => {
                if (Platform.OS !== "web") {
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                  ).catch(() => {});
                }
              }}
            >
              <Check size={14} color="#070A11" strokeWidth={3} />
              <Text style={styles.setRestButtonText}>SET</Text>
            </Pressable>
          </View>
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
    paddingTop: 10,
  },
  titleSection: {
    marginBottom: 20,
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
    height: 74,
    width: "100%",
    marginBottom: 4,
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
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
  },

  // Hero Poster Card
  heroPosterCard: {
    width: "100%",
    height: 330,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "#161821",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    position: "relative",
    marginBottom: 16,
  },
  heroPosterImage: {
    width: "100%",
    height: "100%",
  },
  heroPosterGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroPosterContent: {
    position: "absolute",
    bottom: 22,
    left: 20,
    right: 20,
  },
  heroFocusTag: {
    color: "#38EDD8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  heroExerciseTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 32,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // Action Buttons
  startExerciseButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#3877E3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  startExerciseGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  playIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 2,
  },
  startExerciseText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  secondaryOutlineButton: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.22)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  markDoneButton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(18, 22, 33, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  markDoneButtonActive: {
    borderColor: "#38EDD8",
    backgroundColor: "rgba(56, 237, 216, 0.12)",
  },
  markDoneCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#38EDD8",
    alignItems: "center",
    justifyContent: "center",
  },
  markDoneCheckCircleActive: {
    backgroundColor: "#38EDD8",
  },
  markDoneText: {
    color: "#38EDD8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  markDoneTextActive: {
    color: "#FFFFFF",
  },

  // Video Demo Section
  demoHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  demoTitleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  demoHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  demoTrackingText: {
    color: "#64748B",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  demoThumbnailCard: {
    width: "100%",
    height: 180,
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 20,
  },
  demoThumbnailImage: {
    width: "100%",
    height: "100%",
  },
  demoThumbnailGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  demoPlayCenter: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  demoPlayOuterRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(10, 14, 24, 0.65)",
    borderWidth: 1.5,
    borderColor: "rgba(68, 234, 195, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  demoCardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  demoCardSubtitle: {
    color: "#38EDD8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 2,
  },

  // Execution Steps Card
  stepsCard: {
    backgroundColor: "#11141E",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    marginBottom: 20,
  },
  stepsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  stepsHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepsIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(129, 140, 248, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepsHeaderText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  stepTabsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  stepTabButton: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepTabButtonActive: {
    backgroundColor: "rgba(99, 102, 241, 0.25)",
    borderWidth: 1,
    borderColor: "#818CF8",
  },
  stepTabText: {
    color: "#64748B",
    fontSize: 10.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  stepTabTextActive: {
    color: "#FFFFFF",
  },
  stepDetailContentCard: {
    backgroundColor: "#0B0E17",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  stepTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(129, 140, 248, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    color: "#818CF8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  stepTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  stepDescription: {
    color: "#94A3B8",
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 14,
  },
  coachCueRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
  },
  coachCueBold: {
    color: "#38EDD8",
    fontFamily: "monospace",
    fontWeight: "800",
  },
  coachCueText: {
    flex: 1,
    color: "#CBD5E1",
    fontSize: 11.5,
    lineHeight: 16,
  },

  // Target Areas Card
  targetAreasCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#11141E",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    marginBottom: 16,
  },
  targetBodyThumbBox: {
    width: 68,
    height: 68,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#070A11",
    marginRight: 14,
  },
  targetBodyImage: {
    width: "100%",
    height: "100%",
  },
  targetInfoCol: {
    flex: 1,
  },
  targetAreasHeader: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2,
  },
  targetMusclePrimary: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  muscleTagsRow: {
    flexDirection: "row",
    gap: 6,
  },
  muscleTagPill: {
    backgroundColor: "rgba(68, 234, 195, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(68, 234, 195, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  muscleTagText: {
    color: "#44EAC3",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  // Meta Stats Row (3 Columns)
  metaStatsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  metaStatBox: {
    flex: 1,
    backgroundColor: "#11141E",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  metaStatLabel: {
    color: "#64748B",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    marginTop: 6,
    marginBottom: 3,
  },
  metaStatValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
  },

  // Sets & Reps Card
  setsRepsCard: {
    backgroundColor: "#11141E",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    marginBottom: 20,
  },
  setsRepsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  setsRepsHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  setsRepsHeaderText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  targetBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  targetBadgeText: {
    color: "#94A3B8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  setsCounterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0B0E17",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  counterBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  setsDisplayNumber: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  setsNumberLarge: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  setsNumberLabel: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  pyramidProtocolText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 12,
    textAlign: "center",
  },
  pyramidProtocolCyan: {
    color: "#38EDD8",
  },
  setColumnsScrollContent: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 2,
  },
  setColumnsScrollContentFit: {
    width: "100%",
  },
  setColumnItem: {
    width: 78,
    backgroundColor: "#0B0E17",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  setColumnItemFlexible: {
    flex: 1,
    width: undefined,
  },
  setColNumberLabel: {
    color: "#38EDD8",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  setColSubLabel: {
    color: "#64748B",
    fontSize: 8.5,
    fontFamily: "monospace",
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 2,
  },
  miniStepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  miniStepperBtn: {
    padding: 3,
  },
  miniStepperValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
  },

  // Rest Period Card
  restPeriodCard: {
    backgroundColor: "#11141E",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    marginBottom: 24,
  },
  restHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  restHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  restTargetLabel: {
    color: "#64748B",
    fontSize: 9.5,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  restInputRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  restInputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B0E17",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 14,
    height: 48,
  },
  restTextInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  restSecLabel: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    marginLeft: 6,
  },
  setRestButton: {
    backgroundColor: "#38EDD8",
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  setRestButtonText: {
    color: "#070A11",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
  },
});
