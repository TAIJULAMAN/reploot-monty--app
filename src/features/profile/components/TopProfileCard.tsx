import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const TopProfileCard = () => {
  const router = useRouter();

  const handleEditPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push("/profile/edit-profile");
  };

  return (
    <View style={styles.card}>
      <View style={styles.topProfileRow}>
        {/* Avatar with Centered Level Badge */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            style={styles.avatar}
          />
          <View style={styles.lvlBadge}>
            <Text style={styles.lvlBadgeText}>LVL 15</Text>
          </View>
        </View>

        {/* Info Column */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <View style={styles.nameTextCol}>
              <Text style={styles.nameText} numberOfLines={1}>
                ALEX RIVERS
              </Text>
              <Text style={styles.ageText}>24 YEARS OLD • ATHLETE</Text>
            </View>

            {/* Global Badge on the right opposite of picture and names */}
            <View style={styles.globalBadge}>
              <Image
                source={require("../../../../assets/trophy.svg")}
                style={{ width: 12, height: 12, marginRight: 4 }}
                contentFit="contain"
              />
              <Text style={styles.globalBadgeText}>#42 GLOBAL</Text>
            </View>
          </View>

          {/* Streak Badge */}
          <View style={styles.streakBadge}>
            <Image
              source={require("../../../../assets/flame.svg")}
              style={{ width: 10, height: 10, marginRight: 4 }}
              contentFit="contain"
            />
            <Text style={styles.streakText}>12 DAY STREAK</Text>
          </View>
        </View>
      </View>

      {/* XP Progress */}
      <View style={styles.xpRow}>
        <Text style={styles.xpLabel}>XP PROGRESS</Text>
        <Text style={styles.xpValue}>2,450 / 3,000 XP</Text>
      </View>
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={["#00f2fe", "#4facfe"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { width: "81%" }]}
        />
      </View>

      <TouchableOpacity
        onPress={handleEditPress}
        activeOpacity={0.8}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={["#0284C7", "#0EA5E9", "#38BDF8"]}
          style={styles.btnGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.btnText}>EDIT PROFILE</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    marginBottom: 20,
  },
  topProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(45, 212, 191, 0.6)",
    backgroundColor: "#161B26",
  },
  lvlBadge: {
    position: "absolute",
    bottom: -6,
    alignSelf: "center",
    backgroundColor: "#0B0F19",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#2DD4BF",
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  lvlBadgeText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  nameTextCol: {
    flex: 1,
    marginRight: 8,
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.3,
  },
  ageText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    marginTop: 2,
    marginBottom: 6,
  },
  globalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.28)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  globalBadgeText: {
    color: "#FFB68C",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    color: "#FB923C",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  xpLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  xpValue: {
    color: "#2DD4BF",
    fontSize: 12,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  progressTrack: {
    height: 7,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 18,
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  btnGradient: {
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1.2,
  },
});
