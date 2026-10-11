import React, { useCallback } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { FitnessGoal } from "@/shared/types/user";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { OnboardingButton } from "@/features/onboarding/components/OnboardingButton";

import { BicepArmIcon } from "./BicepArmIcon";
import { HeartShapeIcon } from "./HeartShapeIcon";
import { LightningIcon } from "./LightningIcon";
import { MeditationIcon } from "./MeditationIcon";
import { ScaleBoxIcon } from "./ScaleBoxIcon";
import { StopwatchIcon } from "./StopwatchIcon";
import { GoalCardItem, GoalOption } from "./GoalCardItem";

const GOAL_PAIRS: [GoalOption, GoalOption][] = [
  [
    {
      id: "lose_weight",
      label: "LOSE WEIGHT",
      icon: () => <ScaleBoxIcon />,
    },
    {
      id: "build_muscle",
      label: "BUILD MUSCLE",
      icon: () => <BicepArmIcon />,
    },
  ],
  [
    {
      id: "stay_fit",
      label: "STAY FIT",
      icon: () => <HeartShapeIcon />,
    },
    {
      id: "gain_strength",
      label: "GAIN STRENGTH",
      icon: () => <LightningIcon />,
    },
  ],
  [
    {
      id: "improve_endurance",
      label: "IMPROVE\nENDURANCE",
      icon: () => <StopwatchIcon />,
    },
    {
      id: "improve_flexibility",
      label: "IMPROVE\nFLEXIBILITY",
      icon: () => <MeditationIcon />,
    },
  ],
];

export function Step3YourGoal() {
  const { width: screenWidth } = useWindowDimensions();
  const primaryGoal = useProfileSetupStore((s) => s.data.primaryGoal);
  const selectedGoal = primaryGoal || "build_muscle";
  const updateData = useProfileSetupStore((s) => s.updateData);
  const nextStep = useProfileSetupStore((s) => s.nextStep);
  const horizontalPadding = 20;
  const cardGap = 14;
  const cardWidth = Math.floor(
    (screenWidth - horizontalPadding * 2 - cardGap) / 2,
  );
  const cardHeight = Math.round(cardWidth * 0.8);

  const handleSelectGoal = useCallback(
    (goal: FitnessGoal) => {
      updateData({ primaryGoal: goal });
      requestAnimationFrame(() => {
        try {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch {
          // ignore
        }
      });
    },
    [updateData],
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.titleWrapper}>
          <MaskedView
            style={styles.maskedTitleView}
            maskElement={
              <View style={styles.maskWrapper}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  YOUR GOAL
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
          Select your primary target to focus your training
        </Text>
      </View>
      <View style={[styles.gridContainer, { width: cardWidth * 2 + cardGap }]}>
        {GOAL_PAIRS.map((pair, rowIndex) => (
          <View key={rowIndex} style={[styles.row, { gap: cardGap }]}>
            {pair.map((opt) => (
              <GoalCardItem
                key={opt.id}
                opt={opt}
                isSelected={selectedGoal === opt.id}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                onSelect={handleSelectGoal}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={{ width: "100%", paddingHorizontal: horizontalPadding }}>
        <OnboardingButton text="CONTINUE" onPress={nextStep} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "center",
  },
  hero: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  titleWrapper: {
    alignItems: "flex-start",
    width: "100%",
  },
  maskedTitleView: {
    height: 52,
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
  title: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 44,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.5,
    textAlign: "left",
    textTransform: "uppercase",
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "left",
  },
  gridContainer: {
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
});
