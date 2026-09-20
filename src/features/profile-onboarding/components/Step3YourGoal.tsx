import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { FitnessGoal } from "@/shared/types/user";

// Custom SVG Icons matched 100% to Figma page 4
function ScaleBoxIcon({ isSelected }: { isSelected: boolean }) {
  const strokeColor = isSelected ? "#FFFFFF" : "#E2E8F0";
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="3.5"
        stroke={strokeColor}
        strokeWidth="1.9"
      />
      <Circle cx="12" cy="8.8" r="2.7" stroke={strokeColor} strokeWidth="1.5" />
      <Circle cx="10.8" cy="8.8" r="0.6" fill={strokeColor} />
      <Circle cx="12" cy="8.8" r="0.6" fill={strokeColor} />
      <Circle cx="13.2" cy="8.8" r="0.6" fill={strokeColor} />
    </Svg>
  );
}

function BicepArmIcon({ isSelected }: { isSelected: boolean }) {
  const fillColor = isSelected ? "#FFFFFF" : "#E2E8F0";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill={fillColor}>
      <Path
        fillRule="evenodd"
        d="M 5.81 4.14 L 2.0 15.57 L 2.48 17.95 L 9.14 21.29 L 14.38 21.29 L 19.62 18.9 L 20.57 19.86 L 21.52 18.43 L 20.1 17.0 L 14.38 19.86 L 9.14 19.86 L 4.38 17.48 L 3.43 16.05 L 5.81 7.48 L 8.19 4.62 L 10.57 3.67 L 12.0 5.57 L 7.71 6.52 L 7.71 13.67 L 8.67 14.62 L 10.57 13.19 L 14.38 13.19 L 16.29 14.62 L 17.24 13.67 L 16.29 12.71 L 18.19 10.81 L 21.52 9.86 L 21.52 8.43 L 18.67 8.9 L 14.86 11.76 L 10.1 12.24 L 10.1 7.95 L 12.48 7.48 L 13.43 4.62 L 11.52 2.24 Z"
      />
    </Svg>
  );
}

function HeartShapeIcon({ isSelected }: { isSelected: boolean }) {
  const strokeColor = isSelected ? "#FFFFFF" : "#E2E8F0";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.5 13.572L12 21l-7.5-7.428A5 5 0 1 1 12 6.786a5 5 0 1 1 7.5 6.786z"
        stroke={strokeColor}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function LightningIcon({ isSelected }: { isSelected: boolean }) {
  const fillColor = isSelected ? "#FFFFFF" : "#E2E8F0";
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fillColor}>
      <Path
        d="M13 2L3.5 13.5h7l-1.5 8.5L20.5 10.5h-7.5L13 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function StopwatchIcon({ isSelected }: { isSelected: boolean }) {
  const strokeColor = isSelected ? "#FFFFFF" : "#E2E8F0";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="13.5" r="7.5" stroke={strokeColor} strokeWidth="2" />
      <Path d="M12 9.5v4" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
      <Path d="M10 2.5h4" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <Path d="M12 2.5v3" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <Path d="M17.5 7.5l1.5-1.5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function MeditationIcon({ isSelected }: { isSelected: boolean }) {
  const fillColor = isSelected ? "#FFFFFF" : "#E2E8F0";
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill={fillColor}>
      <Path
        fillRule="evenodd"
        d="M 2.0 13.91 L 2.0 16.04 L 4.13 16.04 L 9.23 13.06 L 9.66 14.77 L 4.13 18.17 L 4.13 19.45 L 5.83 20.72 L 8.38 20.72 L 8.81 18.6 L 10.51 17.32 L 14.77 18.6 L 10.51 18.6 L 9.66 20.72 L 18.17 20.72 L 19.45 19.45 L 19.45 17.74 L 13.91 14.77 L 14.34 13.06 L 18.17 15.62 L 21.57 16.04 L 21.57 13.91 L 17.74 13.06 L 12.64 8.38 L 10.09 8.81 L 5.83 13.06 Z M 10.51 3.28 L 10.09 3.7 L 9.66 4.55 L 9.66 5.83 L 10.94 7.11 L 13.06 7.11 L 13.91 6.26 L 13.91 4.13 L 13.06 3.28 L 12.21 2.85 L 11.36 2.85 Z"
      />
    </Svg>
  );
}

// Bottom Sparkle Cluster (Figma 4-point stars)
function SparkleCluster() {
  return (
    <Svg width={38} height={38} viewBox="0 0 38 38" fill="none">
      {/* Primary large 4-point star */}
      <Path
        d="M16 4C16 9.523 20.477 14 26 14C20.477 14 16 18.477 16 24C16 18.477 11.523 14 6 14C11.523 14 16 9.523 16 4Z"
        fill="#38EDD8"
        opacity="0.9"
      />
      {/* Top right smaller star */}
      <Path
        d="M29 4C29 6.761 31.239 9 34 9C31.239 9 29 11.239 29 14C29 11.239 26.761 9 24 9C26.761 9 29 6.761 29 4Z"
        fill="#38EDD8"
        opacity="0.65"
      />
      {/* Bottom right smaller star */}
      <Path
        d="M30 20C30 22.209 31.791 24 34 24C31.791 24 30 25.791 30 28C30 25.791 28.209 24 26 24C28.209 24 30 22.209 30 20Z"
        fill="#38EDD8"
        opacity="0.75"
      />
    </Svg>
  );
}

interface GoalOption {
  id: FitnessGoal;
  label: string;
  icon: (isSelected: boolean) => React.ReactNode;
}

const GOAL_PAIRS: [GoalOption, GoalOption][] = [
  [
    {
      id: "lose_weight",
      label: "LOSE WEIGHT",
      icon: (isSelected) => <ScaleBoxIcon isSelected={isSelected} />,
    },
    {
      id: "build_muscle",
      label: "BUILD MUSCLE",
      icon: (isSelected) => <BicepArmIcon isSelected={isSelected} />,
    },
  ],
  [
    {
      id: "stay_fit",
      label: "STAY FIT",
      icon: (isSelected) => <HeartShapeIcon isSelected={isSelected} />,
    },
    {
      id: "gain_strength",
      label: "GAIN STRENGTH",
      icon: (isSelected) => <LightningIcon isSelected={isSelected} />,
    },
  ],
  [
    {
      id: "improve_endurance",
      label: "IMPROVE\nENDURANCE",
      icon: (isSelected) => <StopwatchIcon isSelected={isSelected} />,
    },
    {
      id: "improve_flexibility",
      label: "IMPROVE\nFLEXIBILITY",
      icon: (isSelected) => <MeditationIcon isSelected={isSelected} />,
    },
  ],
];

interface GoalCardItemProps {
  opt: GoalOption;
  isSelected: boolean;
  cardWidth: number;
  cardHeight: number;
  onSelect: (goal: FitnessGoal) => void;
}

const GoalCardItem = React.memo(function GoalCardItem({
  opt,
  isSelected,
  cardWidth,
  cardHeight,
  onSelect,
}: GoalCardItemProps) {
  const handlePress = useCallback(() => {
    onSelect(opt.id);
  }, [onSelect, opt.id]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={handlePress}
      unstable_pressDelay={0}
      hitSlop={6}
      style={({ pressed }) => [
        { width: cardWidth, height: cardHeight },
        pressed && styles.cardPressed,
      ]}
    >
      {isSelected ? (
        <LinearGradient
          colors={["#818CF8", "#22D3EE", "#38EDD8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cardActiveGradient, { width: cardWidth, height: cardHeight }]}
        >
          <View style={styles.cardActiveInner}>
            {/* Circular Icon Badge */}
            <View style={styles.iconCircleActive}>{opt.icon(true)}</View>

            {/* Goal Title */}
            <Text style={styles.cardLabelActive} numberOfLines={2}>
              {opt.label}
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.cardInactive, { width: cardWidth, height: cardHeight }]}>
          {/* Circular Icon Badge */}
          <View style={styles.iconCircleInactive}>{opt.icon(false)}</View>

          {/* Goal Title */}
          <Text style={styles.cardLabelInactive} numberOfLines={2}>
            {opt.label}
          </Text>
        </View>
      )}
    </Pressable>
  );
});

export function Step3YourGoal() {
  const { width: screenWidth } = useWindowDimensions();
  const primaryGoal = useProfileSetupStore((s) => s.data.primaryGoal);
  const selectedGoal = primaryGoal || "build_muscle";
  const updateData = useProfileSetupStore((s) => s.updateData);
  const nextStep = useProfileSetupStore((s) => s.nextStep);

  // Exact deterministic card calculations:
  // 24dp padding on left & right = 48dp total
  // 14dp gap between cards
  const horizontalPadding = 24;
  const cardGap = 14;
  const cardWidth = Math.floor((screenWidth - horizontalPadding * 2 - cardGap) / 2);
  const cardHeight = Math.round(cardWidth * 0.80);

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
    [updateData]
  );

  return (
    <View style={styles.container}>
      {/* Title Hero with radiant cyan neon glow */}
      <View style={styles.hero}>
        <Text style={styles.title}>YOUR</Text>
        <Text style={styles.title}>GOAL</Text>
      </View>

      {/* 2x3 Grid of Goal Cards: Deterministic Symmetrical Flex */}
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

      {/* Decorative Sparkle bottom right */}
      <View style={[styles.sparkleRow, { width: cardWidth * 2 + cardGap }]}>
        <SparkleCluster />
      </View>

      {/* Continue CTA Button */}
      <View style={{ width: "100%", paddingHorizontal: horizontalPadding }}>
        <ProfileNavigationButton title="CONTINUE" onPress={nextStep} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "center",
  },
  hero: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 40,
    fontWeight: "900",
    letterSpacing: 1.2,
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(56, 237, 216, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  gridContainer: {
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  cardInactive: {
    borderRadius: 22,
    backgroundColor: "#11141C",
    borderWidth: 1.4,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  cardActiveGradient: {
    borderRadius: 22,
    padding: 2,
    shadowColor: "#22D3EE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.65,
    shadowRadius: 18,
    elevation: 8,
  },
  cardActiveInner: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0B1522",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  iconCircleInactive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  iconCircleActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(34, 211, 238, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardLabelInactive: {
    color: "#CBD5E1",
    fontSize: 12.5,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 1.4,
    textAlign: "center",
    textTransform: "uppercase",
  },
  cardLabelActive: {
    color: "#FFFFFF",
    fontSize: 12.5,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 1.4,
    textAlign: "center",
    textTransform: "uppercase",
  },
  sparkleRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 6,
    marginTop: 1,
    marginBottom: 2,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});

