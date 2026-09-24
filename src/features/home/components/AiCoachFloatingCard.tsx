import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export const AiCoachFloatingCard = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#1B2335", "#2773D0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerContainer}
      >
        <View style={styles.topRow}>
          <View style={styles.onlinePill}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>COACH ONLINE</Text>
          </View>
          <Image
            source={require("../../../../assets/coachOnline/coachOnline.png")}
            style={{ width: 60, height: 60 }}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.messageText}>
          Need guidance? Your <Text style={styles.highlightText}>AI Coach</Text>{" "}
          is ready to <Text style={styles.highlightTextBlue}>optimize</Text>{" "}
          your session.
        </Text>
        <Pressable style={styles.askButton}>
          <Text style={styles.askButtonText}>ASK AI COACH</Text>
          <ArrowRight size={14} color="#0F172A" strokeWidth={3} />
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
    position: "relative",
  },
  bannerContainer: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  onlinePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 212, 191, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
    gap: 6,
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2DD4BF",
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  onlineText: {
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
    textShadowColor: "rgba(45, 212, 191, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  miniBotIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 24,
    paddingRight: 30,
  },
  highlightText: {
    color: "#2DD4BF",
    fontWeight: "800",
    textShadowColor: "rgba(45, 212, 191, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  highlightTextBlue: {
    color: "#A78BFA",
    fontWeight: "800",
    textShadowColor: "rgba(167, 139, 250, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  askButton: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  askButtonText: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textShadowColor: "rgba(15, 23, 42, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
