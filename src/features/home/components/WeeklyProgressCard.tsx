import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Star, Zap } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export const WeeklyProgressCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        {/* LVL 42 Box */}
        <View style={{ alignItems: "center" }}>
          <View style={styles.streakTopRow}>
            <Star size={28} color="#38EDD8" strokeWidth={2.5} />
            <Text style={[styles.streakNumber, { color: "#38EDD8" }]}>42</Text>
          </View>
          <View style={styles.streakBottomRow}>
            <Text style={styles.streakLabel}>ELITE</Text>
            <Text style={styles.streakLabel}>TIER</Text>
          </View>
        </View>

        {/* 12 DAY STREAK */}
        <View style={styles.streakContainer}>
          <View style={styles.streakTopRow}>
            <Zap size={28} color="#38EDD8" strokeWidth={2.5} />
            <Text style={styles.streakNumber}>12</Text>
          </View>
          <View style={styles.streakBottomRow}>
            <Text style={styles.streakLabel}>DAY</Text>
            <Text style={styles.streakLabel}>STREAK</Text>
          </View>
        </View>
      </View>

      {/* XP Progress Section */}
      <View style={styles.xpRow}>
        <Text style={styles.xpText}>2,450 XP</Text>
        <Text style={styles.xpText}>3,000 XP</Text>
      </View>
      <View style={styles.progressBarTrack}>
        <LinearGradient
          colors={["#707BFF", "#5260FF"]}
          style={[styles.progressBarFill, { width: "80%" }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      {/* Weekly Bar Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.chartBars}>
          {/* M */}
          <View style={styles.barWrap}>
            <View style={[styles.bar, styles.barBlue, { height: 32 }]} />
            <Text style={styles.dayLabel}>M</Text>
          </View>
          {/* T */}
          <View style={styles.barWrap}>
            <View style={[styles.bar, styles.barBlue, { height: 48 }]} />
            <Text style={styles.dayLabel}>T</Text>
          </View>
          {/* W */}
          <View style={styles.barWrap}>
            <View style={[styles.bar, styles.barPurpleGray, { height: 68 }]} />
            <Text style={styles.dayLabel}>W</Text>
          </View>
          {/* T (Current Day) */}
          <View style={styles.barWrap}>
            <View style={styles.barActiveGlow}>
              <LinearGradient
                colors={["#38EDD8", "#38EDD8"]}
                style={[styles.bar, styles.barActive, { height: 80 }]}
              />
            </View>
            <Text style={[styles.dayLabel, styles.dayLabelActive]}>T</Text>
          </View>
          {/* F */}
          <View style={styles.barWrap}>
            <View style={[styles.bar, styles.barBlue, { height: 24 }]} />
            <Text style={styles.dayLabel}>F</Text>
          </View>
          {/* S */}
          <View style={styles.barWrap}>
            <View style={[styles.bar, styles.barBlue, { height: 44 }]} />
            <Text style={styles.dayLabel}>S</Text>
          </View>
          {/* S */}
          <View style={styles.barWrap}>
            <View style={[styles.bar, styles.barBlue, { height: 16 }]} />
            <Text style={styles.dayLabel}>S</Text>
          </View>
        </View>
      </View>

      <View style={styles.linkRow}>
        <Text style={styles.viewProgressLink}>View Weekly Progress</Text>
        <ArrowRight size={14} color="#38EDD8" strokeWidth={2.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#222333", // Darker purplish background
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  levelBox: {
    width: 100,
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  levelTextSmall: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 32,
    letterSpacing: 1,
    marginBottom: 1,
  },
  levelTextBig: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900",
    lineHeight: 48,
    letterSpacing: -1,
  },
  tierStreakCol: {
    marginLeft: 16,
    justifyContent: "center",
    gap: 4,
  },
  eliteTierText: {
    color: "#C2C6DC",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.5,
    fontFamily: "monospace",
  },
  streakContainer: {
    marginLeft: "auto",
    alignItems: "center",
  },
  streakTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  streakNumber: {
    color: "#38EDD8",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 40,
    letterSpacing: -1,
  },
  streakBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  streakLabel: {
    color: "#C2C6DC",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "monospace",
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  xpText: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: "monospace",
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: "#2B2D42", // Dark track
    borderRadius: 5,
    marginBottom: 40,
  },
  progressBarFill: {
    height: 10,
    borderRadius: 5,
  },
  chartContainer: {
    height: 100,
    justifyContent: "flex-end",
    marginBottom: 24,
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 8,
  },
  barWrap: {
    alignItems: "center",
    gap: 12,
  },
  bar: {
    width: 24,
    borderRadius: 6,
  },
  barBlue: {
    backgroundColor: "#6FA5F6", // Light blue
  },
  barPurpleGray: {
    backgroundColor: "#6E7196", // Purplish gray
  },
  barActiveGlow: {
    shadowColor: "#38EDD8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  barActive: {
    // Gradient used inside view
  },
  dayLabel: {
    color: "#C2C6DC",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  dayLabelActive: {
    color: "#38EDD8",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  viewProgressLink: {
    color: "#38EDD8",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "monospace",
  },
});
