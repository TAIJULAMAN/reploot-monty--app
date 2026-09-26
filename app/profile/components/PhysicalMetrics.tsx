import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

export function PhysicalMetrics() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Image
          source={require("../../../assets/physicalMatric.svg")}
          style={{ width: 16, height: 16, marginRight: 8 }}
          contentFit="contain"
        />
        <Text style={styles.sectionTitle}>PHYSICAL METRICS</Text>
      </View>
      <View style={styles.metricsRow}>
        <LinearGradient
          colors={["#6C5CFF", "#5FFFD7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.metricCardWrapper}
        >
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>HEIGHT</Text>
            <Text style={styles.metricValue}>180 cm</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#6C5CFF", "#5FFFD7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.metricCardWrapper}
        >
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>WEIGHT</Text>
            <Text style={styles.metricValue}>
              78.2 <Text style={styles.metricUnit}>kg</Text>
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#6C5CFF", "#5FFFD7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.metricCardWrapper}
        >
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>BMI</Text>
            <Text style={styles.metricValue}>24.1</Text>
            <Text style={styles.metricSub}>NORMAL</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 2,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  metricCardWrapper: {
    flex: 1,
    borderRadius: 16,
    padding: 1,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#0B0D14",
    borderRadius: 15,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  metricLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  metricValue: {
    color: "#C5C0FF",
    fontSize: 24,
    fontWeight: "600",
  },
  metricUnit: {
    fontSize: 12,
    fontWeight: "600",
  },
  metricSub: {
    color: "#C5C0FF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 4,
  },
});
