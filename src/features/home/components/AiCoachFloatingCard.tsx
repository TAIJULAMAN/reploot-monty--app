import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight, Sparkles } from "lucide-react-native";
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
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["rgba(32, 68, 117, 0.25)", "transparent"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0.8 }}
      />

      <View style={styles.content}>
        {/* Header Row: Title & Online Pill + Robot Avatar */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.onlinePill}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>COACH ONLINE</Text>
            </View>

            <Text style={styles.headerTitle}>AI COACH ASSISTANT</Text>
          </View>

          {/* <View style={styles.avatarWrapper}>
            <Image
              source={require("../../../../assets/coachOnline/coachOnline.png")}
              style={styles.coachAvatar}
              contentFit="contain"
            />
          </View> */}
        </View>

        {/* Message / Guidance Box */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            Need guidance? Your{" "}
            <Text style={styles.highlightText}>AI Coach</Text> is ready to{" "}
            <Text style={styles.highlightTextCyan}>optimize</Text> your
            workouts, recovery, and nutrition protocols.
          </Text>
        </View>

        {/* Quick Suggestion Chips */}
        <View style={styles.chipsRow}>
          <Pressable onPress={handleAskCoach} accessibilityRole="button">
            <View style={styles.chipPill}>
              <Sparkles size={13} color="#00f2fe" strokeWidth={2.2} />
              <Text style={styles.chipText}>FORM CHECK</Text>
            </View>
          </Pressable>

          <Pressable onPress={handleAskCoach} accessibilityRole="button">
            <View style={styles.chipPill}>
              <Text style={styles.chipText}>ADJUST MACROS</Text>
            </View>
          </Pressable>

          <Pressable onPress={handleAskCoach} accessibilityRole="button">
            <View style={styles.chipPill}>
              <Text style={styles.chipText}>RECOVERY</Text>
            </View>
          </Pressable>
        </View>

        {/* Start / Ask Button */}
        <Pressable onPress={handleAskCoach} accessibilityRole="button">
          <View style={styles.actionButton}>
            <LinearGradient
              colors={["#00b4d8", "#0077b6"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>ASK AI COACH</Text>
              <ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />
            </LinearGradient>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#11141C",
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    position: "relative",
  },
  content: {
    padding: 22,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  onlinePill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 237, 216, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 6,
    marginBottom: 8,
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
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  avatarWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  coachAvatar: {
    width: 44,
    height: 44,
  },
  messageBox: {
    backgroundColor: "#0D1017",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  messageText: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "monospace",
  },
  highlightText: {
    color: "#38EDD8",
    fontWeight: "800",
  },
  highlightTextCyan: {
    color: "#00f2fe",
    fontWeight: "800",
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  chipPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  chipText: {
    color: "#CBD5E1",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  chipPressed: {
    opacity: 0.75,
  },
  actionButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
});
