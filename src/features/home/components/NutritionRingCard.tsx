import { StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

export const NutritionRingCard = () => {
  const radius = 56;
  const strokeWidth = 12;

  return (
    <View style={styles.ringCard}>
      <View style={styles.ringContainer}>
        <Svg width={200} height={200} viewBox="0 0 150 150">
          <Defs>
            <SvgGradient id="ringGrad" x1="1" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#38EDD8" />
              <Stop offset="100%" stopColor="#5260FF" />
            </SvgGradient>
          </Defs>
          <Circle
            cx={75}
            cy={75}
            r={radius}
            stroke="url(#ringGrad)"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </Svg>

        <View style={styles.ringCenterText}>
          <Text style={styles.ringSubtext}>CONSUMED</Text>
          <View style={styles.ringValueRow}>
            <Text style={styles.ringValue}>1.8 </Text>
            <Text style={styles.ringUnit}>kcal</Text>
          </View>
          <Text style={styles.ringTarget}>TARGET 2.4k</Text>
        </View>
      </View>

      <View style={styles.dailyGoalPill}>
        <View style={styles.dailyGoalDot} />
        <Text style={styles.dailyGoalText}>75% OF DAILY GOAL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ringCard: {
    backgroundColor: "#161925",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  ringContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  ringCenterText: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ringSubtext: {
    color: "#38EDD8",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  ringValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  ringValue: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
  },
  ringUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: "#38EDD8",
  },
  ringTarget: {
    color: "#C2C6DC",
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "monospace",
    marginTop: 6,
    letterSpacing: 1,
  },
  dailyGoalPill: {
    position: "absolute",
    bottom: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F3B66",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  dailyGoalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  dailyGoalText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "monospace",
  },
});
