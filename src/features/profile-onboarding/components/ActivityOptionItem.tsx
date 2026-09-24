import { ActivityLevel } from "@/shared/types/user";
import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface ActivityOptionItemProps {
  id: ActivityLevel;
  title: string;
  subtitle: string;
  isSelected: boolean;
  onSelect: (id: ActivityLevel) => void;
}

export const ActivityOptionItem = React.memo(
  ({ id, title, subtitle, isSelected, onSelect }: ActivityOptionItemProps) => {
    return (
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        unstable_pressDelay={0}
        hitSlop={6}
        onPress={() => onSelect(id)}
        style={styles.activityPressable}
      >
        <View
          style={[
            styles.activityOptionRow,
            isSelected
              ? styles.activityOptionSelected
              : styles.activityOptionUnselected,
          ]}
        >
          <View style={styles.activityInfo}>
            <Text
              style={[
                styles.activityTitle,
                isSelected && styles.activityTitleActive,
              ]}
            >
              {title}
            </Text>
            <Text style={styles.activitySubtitle}>{subtitle}</Text>
          </View>

          {/* Radio Indicator */}
          <View
            style={[
              styles.radioCircle,
              isSelected
                ? styles.radioCircleSelected
                : styles.radioCircleUnselected,
            ]}
          >
            {isSelected ? (
              <Check size={12} color="#FFFFFF" strokeWidth={4} />
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  activityPressable: {
    width: "100%",
  },
  activityOptionRow: {
    width: "100%",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityOptionUnselected: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    backgroundColor: "#13141C",
  },
  activityOptionSelected: {
    borderWidth: 1,
    borderColor: "#2DD4BF",
    backgroundColor: "#2C2E46",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 3,
    includeFontPadding: false,
  },
  activityTitleActive: {
    color: "#FFFFFF",
  },
  activitySubtitle: {
    color: "#8290A4",
    fontSize: 11,
    fontWeight: "400",
    includeFontPadding: false,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
  },
  radioCircleUnselected: {
    borderWidth: 2,
    borderColor: "#475569",
    backgroundColor: "transparent",
  },
  radioCircleSelected: {
    borderWidth: 0,
    backgroundColor: "#2DD4BF",
  },
});
