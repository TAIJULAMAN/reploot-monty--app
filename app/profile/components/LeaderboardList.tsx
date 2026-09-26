import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export function LeaderboardList() {
  return (
    <View style={styles.leaderboard}>
      {/* Top 1 */}
      <View style={[styles.rankItem, styles.rankItemGold]}>
        <Text style={[styles.rankPosition, { color: "#FFB68C" }]}>1</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=33" }}
          style={styles.avatar}
        />
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>Marcus Thuram</Text>
          <Text style={styles.athleteStatus}>🏅 Dominating</Text>
        </View>
        <View style={styles.athleteScore}>
          <Text style={[styles.xpValue, { color: "#FFB68C" }]}>54,200</Text>
          <Text style={[styles.xpUnit, { color: "#FFB68C" }]}>XP</Text>
        </View>
      </View>

      {/* Top 2 */}
      <View style={[styles.rankItem, styles.rankItemSilver]}>
        <Text style={styles.rankPosition}>2</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=12" }}
          style={styles.avatar}
        />
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>Sarah_Strong</Text>
        </View>
        <View style={styles.athleteScore}>
          <Text style={styles.xpValue}>48,150</Text>
          <Text style={styles.xpUnit}>XP</Text>
        </View>
      </View>

      {/* Top 3 */}
      <View style={[styles.rankItem, styles.rankItemBronze]}>
        <Text style={[styles.rankPosition, { color: "#38EDD8" }]}>3</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=60" }}
          style={styles.avatar}
        />
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>J-Train</Text>
        </View>
        <View style={styles.athleteScore}>
          <Text style={[styles.xpValue, { color: "#38EDD8" }]}>42,900</Text>
          <Text style={[styles.xpUnit, { color: "#38EDD8" }]}>XP</Text>
        </View>
      </View>

      {/* Top 4 */}
      <View style={[styles.rankItem, styles.rankItemStandard]}>
        <Text style={styles.rankPositionSub}>4</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=11" }}
          style={[styles.avatar, styles.avatarSmall]}
        />
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteNameSub}>Iron_Mike</Text>
        </View>
        <View style={styles.athleteScore}>
          <Text style={styles.xpValueSub}>40,100</Text>
          <Text style={styles.xpUnitSub}>XP</Text>
        </View>
      </View>

      {/* Top 5 */}
      <View style={[styles.rankItem, styles.rankItemStandard]}>
        <Text style={styles.rankPositionSub}>5</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=44" }}
          style={[styles.avatar, styles.avatarSmall]}
        />
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteNameSub}>Lift_Queen</Text>
        </View>
        <View style={styles.athleteScore}>
          <Text style={styles.xpValueSub}>39,500</Text>
          <Text style={styles.xpUnitSub}>XP</Text>
        </View>
      </View>

      <Text style={styles.dots}>•••</Text>

      {/* Current User */}
      <View style={[styles.rankItem, styles.rankItemUser]}>
        <Text style={[styles.rankPosition, { color: "#CBD5E1" }]}>42</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=50" }}
          style={[styles.avatar, { borderColor: "#6366F1", borderWidth: 1 }]}
        />
        <View style={styles.athleteInfo}>
          <Text style={[styles.athleteName, { color: "#E0E7FF" }]}>
            Alex Rivers
          </Text>
          <Text style={styles.youText}>(You)</Text>
        </View>
        <View style={styles.athleteScore}>
          <Text style={[styles.xpValue, { color: "#E0E7FF" }]}>14,250</Text>
          <Text style={[styles.xpUnit, { color: "#94A3B8" }]}>XP</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboard: {
    gap: 12,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  rankItemGold: {
    borderColor: "rgba(255, 182, 140, 0.4)",
    borderLeftWidth: 3,
    borderLeftColor: "#FFB68C",
    shadowColor: "#FFB68C",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  rankItemSilver: {
    borderColor: "rgba(226, 232, 240, 0.4)",
    borderLeftWidth: 3,
    borderLeftColor: "#E2E8F0",
  },
  rankItemBronze: {
    borderColor: "rgba(56, 237, 216, 0.4)",
    borderLeftWidth: 3,
    borderLeftColor: "#38EDD8",
  },
  rankItemUser: {
    borderColor: "rgba(99, 102, 241, 0.6)",
    borderLeftWidth: 3,
    borderLeftColor: "#6366F1",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  rankItemStandard: {
    backgroundColor: "transparent",
    paddingVertical: 12,
  },
  rankPosition: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "600",
    width: 32,
    textAlign: "center",
    marginRight: 10,
  },
  rankPositionSub: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
    width: 32,
    textAlign: "center",
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
  },
  athleteNameSub: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "500",
  },
  athleteStatus: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 2,
  },
  youText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  athleteScore: {
    alignItems: "flex-end",
  },
  xpValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  xpUnit: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
  },
  xpValueSub: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  xpUnitSub: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
  },
  dots: {
    color: "#64748B",
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 4,
    marginVertical: 8,
  },
});
