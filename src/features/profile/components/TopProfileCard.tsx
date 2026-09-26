import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export const TopProfileCard = () => {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={styles.topProfileRow}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            style={styles.avatar}
          />
          <View style={styles.lvlBadge}>
            <Text style={styles.lvlBadgeText}>LVL 15</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>ALEX{"\n"}RIVERS</Text>
            <View style={styles.globalBadge}>
              <Image
                source={require("../../../../assets/trophy.svg")}
                style={{ width: 10, height: 10, marginRight: 4 }}
                contentFit="contain"
              />
              <Text style={styles.globalBadgeText}>#42 GLOBAL</Text>
            </View>
          </View>
          <Text style={styles.ageText}>24 YEARS OLD</Text>
          <View style={styles.streakBadge}>
            <Image
              source={require("../../../../assets/flame.svg")}
              style={{ width: 16, height: 16 }}
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
          colors={["#6366F1", "#2DD4BF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { width: "81%" }]}
        />
      </View>

      <Pressable
        onPress={() => router.push("/profile/edit-profile")}
        style={({ pressed }) => [
          styles.buttonWrapper,
          pressed && { opacity: 0.8 },
        ]}
      >
        <LinearGradient
          colors={["#3568A5", "#4B85C4", "#69A6E3"]}
          style={styles.btnGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.btnText}>EDIT PROFILE</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 20,
    marginBottom: 20,
  },
  createAccountWrapper: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 22,
  },
  bottomCtaText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
  },
  loginLink: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "700",
  },
  topProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(45,212,191,0.5)",
  },
  lvlBadge: {
    position: "absolute",
    bottom: -8,
    right: -10,
    backgroundColor: "#2DD4BF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#0D1117",
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  lvlBadgeText: {
    color: "#0D1117",
    fontSize: 14,
    fontWeight: "400",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 36,
  },
  globalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B45F2420",
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 20,
  },
  globalBadgeText: {
    color: "#FFB68C",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  ageText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "400",
    letterSpacing: 1,
    marginTop: 6,
    marginBottom: 8,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(192,132,252,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakText: {
    color: "#FFDBC9",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 4,
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  xpLabel: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
  xpValue: {
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "400",
  },
  progressTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  btnGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
});
