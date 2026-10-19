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
        <Text style={[styles.rankPosition, { color: "#E2E8F0" }]}>2</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=12" }}
          style={styles.avatar}
        />
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>Sarah_Strong</Text>
          <Text style={styles.athleteStatus}>🔥 Master</Text>
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
          <Text style={styles.athleteStatus}>⚡ Elite</Text>
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
        <Text style={[styles.rankPosition, { color: "#38BDF8" }]}>42</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=50" }}
          style={[styles.avatar, { borderColor: "#38BDF8", borderWidth: 1.5 }]}
        />
        <View style={styles.athleteInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={[styles.athleteName, { color: "#FFFFFF" }]}>
              Alex Rivers
            </Text>
            <View style={styles.youBadge}>
              <Text style={styles.youText}>YOU</Text>
            </View>
          </View>
          <Text style={styles.athleteStatus}>Top 5% Global</Text>
        </View>
        <View style={styles.athleteScore}>
          <Text style={[styles.xpValue, { color: "#38EDD8" }]}>14,250</Text>
          <Text style={[styles.xpUnit, { color: "#38EDD8" }]}>XP</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboard: {
    gap: 10,
    marginBottom: 20,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  rankItemGold: {
    borderColor: "rgba(245, 158, 11, 0.3)",
    borderLeftWidth: 3,
    borderLeftColor: "#FFB68C",
    backgroundColor: "rgba(245, 158, 11, 0.05)",
  },
  rankItemSilver: {
    borderColor: "rgba(226, 232, 240, 0.3)",
    borderLeftWidth: 3,
    borderLeftColor: "#E2E8F0",
    backgroundColor: "rgba(226, 232, 240, 0.03)",
  },
  rankItemBronze: {
    borderColor: "rgba(56, 237, 216, 0.3)",
    borderLeftWidth: 3,
    borderLeftColor: "#38EDD8",
    backgroundColor: "rgba(56, 237, 216, 0.03)",
  },
  rankItemUser: {
    borderColor: "rgba(56, 189, 248, 0.35)",
    borderLeftWidth: 3,
    borderLeftColor: "#38BDF8",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
  },
  rankItemStandard: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    paddingVertical: 12,
  },
  rankPosition: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "monospace",
    width: 28,
    textAlign: "center",
    marginRight: 10,
  },
  rankPositionSub: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "monospace",
    width: 28,
    textAlign: "center",
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: "#161B26",
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  athleteNameSub: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  athleteStatus: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    marginTop: 2,
  },
  youBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  youText: {
    color: "#38BDF8",
    fontSize: 9,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  athleteScore: {
    alignItems: "flex-end",
  },
  xpValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "monospace",
  },
  xpUnit: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  xpValueSub: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  xpUnitSub: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "monospace",
  },
  dots: {
    color: "#64748B",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 4,
    marginVertical: 4,
  },
});
