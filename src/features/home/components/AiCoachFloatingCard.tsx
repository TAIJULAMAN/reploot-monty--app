import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export const AiCoachFloatingCard = () => {
  const router = useRouter();

  const handleAskCoach = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push("/coach");
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#121826", "#18243D", "#0F1626"]}
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
            style={styles.coachAvatar}
            contentFit="cover"
          />
        </View>

        <Text style={styles.messageText}>
          Need guidance? Your <Text style={styles.highlightText}>AI Coach</Text>{" "}
          is ready to <Text style={styles.highlightTextBlue}>optimize</Text>{" "}
          your session.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.askButton,
            pressed && styles.pressed,
          ]}
          onPress={handleAskCoach}
          accessibilityRole="button"
        >
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.askButtonGradient}
          >
            <Text style={styles.askButtonText}>ASK AI COACH</Text>
            <ArrowRight size={14} color="#0B0E14" strokeWidth={2.8} />
          </LinearGradient>
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
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.22)",
    overflow: "hidden",
    backgroundColor: "#11141C",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  onlinePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 237, 216, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.3)",
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38EDD8",
  },
  onlineText: {
    color: "#38EDD8",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  coachAvatar: {
    width: 56,
    height: 56,
  },
  messageText: {
    color: "#F1F5F9",
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    marginBottom: 20,
    paddingRight: 24,
  },
  highlightText: {
    color: "#38EDD8",
    fontWeight: "900",
  },
  highlightTextBlue: {
    color: "#00f2fe",
    fontWeight: "900",
  },
  askButton: {
    alignSelf: "flex-start",
    borderRadius: 14,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  askButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  askButtonText: {
    color: "#0B0E14",
    fontSize: 12,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
  },
});
