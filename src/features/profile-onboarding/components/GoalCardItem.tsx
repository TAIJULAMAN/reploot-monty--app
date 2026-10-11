import { FitnessGoal } from "@/shared/types/user";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface GoalOption {
  id: FitnessGoal;
  label: string;
  icon: () => React.ReactNode;
}

export interface GoalCardItemProps {
  opt: GoalOption;
  isSelected: boolean;
  cardWidth: number;
  cardHeight: number;
  onSelect: (goal: FitnessGoal) => void;
}

export const GoalCardItem = React.memo(function GoalCardItem({
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
          colors={["#6C5CFF", "#5FFFD7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.cardActiveGradient,
            { width: cardWidth, height: cardHeight },
          ]}
        >
          <View style={styles.cardActiveInner}>
            <View style={styles.iconCircleActive}>{opt.icon()}</View>
            <Text style={styles.cardLabelActive} numberOfLines={2}>
              {opt.label}
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.cardInactive,
            { width: cardWidth, height: cardHeight },
          ]}
        >
          <View style={styles.iconCircleInactive}>{opt.icon()}</View>
          <Text style={styles.cardLabelInactive} numberOfLines={2}>
            {opt.label}
          </Text>
        </View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
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
  },
  cardActiveInner: {
    flex: 1,
    width: "100%",
    backgroundColor: "#161D27",
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
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1.2,
    textAlign: "center",
    textTransform: "uppercase",
  },
  cardLabelActive: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.2,
    textAlign: "center",
    textTransform: "uppercase",
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});
