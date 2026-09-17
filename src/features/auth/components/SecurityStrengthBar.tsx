import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SecurityStrengthBarProps {
  strength?: "WEAK" | "MEDIUM" | "STRONG";
}

export const SecurityStrengthBar: React.FC<SecurityStrengthBarProps> = ({
  strength = "STRONG",
}) => {
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.labelText}>SECURITY STRENGTH</Text>
        <Text style={styles.strengthText}>{strength}</Text>
      </View>

      {/* 3-Segment Progress Bar */}
      <View style={styles.barRow}>
        {/* Segment 1 */}
        <View style={styles.segment}>
          <LinearGradient
            colors={["#818CF8", "#22D3EE"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.segmentGradient}
          />
        </View>

        {/* Segment 2 */}
        <View style={styles.segment}>
          <LinearGradient
            colors={["#38BDF8", "#22D3EE"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.segmentGradient}
          />
        </View>

        {/* Segment 3 */}
        <View style={styles.segment}>
          <LinearGradient
            colors={["#818CF8", "#34D399"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.segmentGradient}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 32,
    marginTop: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  labelText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  strengthText: {
    color: "#2DD4BF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  segmentGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 3,
  },
});
