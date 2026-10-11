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
    backgroundColor: "#0D1017",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    paddingVertical: 26,
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
    fontSize: 11,
    fontWeight: "700",
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
    fontFamily: "monospace",
  },
  ringUnit: {
    fontSize: 14,
    fontWeight: "700",
    color: "#38EDD8",
    fontFamily: "monospace",
    marginLeft: 2,
  },
  ringTarget: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    marginTop: 6,
    letterSpacing: 1,
  },
  dailyGoalPill: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.28)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 8,
  },
  dailyGoalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38EDD8",
  },
  dailyGoalText: {
    color: "#38EDD8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "monospace",
  },
});
