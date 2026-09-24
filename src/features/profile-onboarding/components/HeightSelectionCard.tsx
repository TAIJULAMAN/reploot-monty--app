import { LinearGradient } from "expo-linear-gradient";
import { Ruler } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { VerticalWheelPicker } from "./VerticalWheelPicker";

interface HeightSelectionCardProps {
  heightUnit: "cm" | "inch";
  displayedHeight: number;
  onHeightUnitToggle: (unit: "cm" | "inch") => void;
  onHeightChange: (val: number) => void;
}

export function HeightSelectionCard({
  heightUnit,
  displayedHeight,
  onHeightUnitToggle,
  onHeightChange,
}: HeightSelectionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleGroup}>
          <Ruler size={16} color="#2DD4BF" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>HEIGHT</Text>
        </View>
        <View style={styles.togglePill}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch to Centimeters"
            unstable_pressDelay={0}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => onHeightUnitToggle("cm")}
          >
            {heightUnit === "cm" ? (
              <LinearGradient
                colors={["#6C5CFF", "#44EAC3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toggleOption}
              >
                <Text style={[styles.toggleText, styles.toggleTextActive]}>
                  CM
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.toggleOption}>
                <Text style={styles.toggleText}>CM</Text>
              </View>
            )}
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch to Inches"
            unstable_pressDelay={0}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => onHeightUnitToggle("inch")}
          >
            {heightUnit === "inch" ? (
              <LinearGradient
                colors={["#6C5CFF", "#44EAC3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toggleOption}
              >
                <Text style={[styles.toggleText, styles.toggleTextActive]}>
                  INCH
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.toggleOption}>
                <Text style={styles.toggleText}>INCH</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <VerticalWheelPicker
        value={displayedHeight}
        onChange={onHeightChange}
        min={heightUnit === "cm" ? 120 : 48}
        max={heightUnit === "cm" ? 230 : 90}
        unit={heightUnit.toUpperCase()}
        itemHeight={44}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    backgroundColor: "#1A1C23",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 9,
  },
  headerTitle: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  togglePill: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    padding: 3,
  },
  toggleOption: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  toggleText: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
    includeFontPadding: false,
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },
});
