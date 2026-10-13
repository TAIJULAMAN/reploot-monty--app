import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const TodaysMissionsCard = () => {
  const handleWorkoutPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push("/workouts");
  };

  const handleCalendarPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push("/workout-calendar");
  };

  const handleSettingsPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/todaysMission/todaysMissionsBg.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(10, 13, 20, 0.4)", "rgba(10, 13, 20, 0.88)"]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.content}>
          <View style={styles.headerWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text
                    style={styles.headerTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    TODAY'S MISSIONS
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </MaskedView>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={handleWorkoutPress}
            style={({ pressed }) => [
              styles.missionRow,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.missionInfo}>
              <Text style={styles.missionTitle}>Pull Day Hyper-Row</Text>
              <Text style={styles.missionSubtitle}>
                Lat Pulldown & Cable Rows
              </Text>
            </View>
            <View style={styles.arrowButton}>
              <Image
                source={require("../../../../assets/todaysMission/RightArrow.png")}
                style={styles.arrowIcon}
                contentFit="contain"
              />
            </View>
          </Pressable>

          <View style={styles.actionButtons}>
            <Pressable
              accessibilityRole="button"
              onPress={handleCalendarPress}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.pressed,
              ]}
            >
              <Image
                source={require("../../../../assets/todaysMission/calendar.svg")}
                style={styles.icon}
                contentFit="contain"
              />
              <Text style={styles.iconLabel}>CALENDAR</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={handleSettingsPress}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.pressed,
              ]}
            >
              <Image
                source={require("../../../../assets/todaysMission/settings.svg")}
                style={styles.icon}
                contentFit="contain"
              />
              <Text style={styles.iconLabel}>SETTINGS</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "#11141C",
  },
  background: {
    width: "100%",
    minHeight: 250,
  },
  backgroundImage: {
    borderRadius: 24,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 22,
    justifyContent: "space-between",
  },
  headerWrapper: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 14,
  },
  maskedTitleView: {
    height: 38,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  gradient: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textAlign: "left",
    textTransform: "uppercase",
  },
  missionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  missionInfo: {
    flex: 1,
    marginRight: 12,
  },
  tagWrap: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  tagText: {
    color: "#38BDF8",
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  missionTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  missionSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "500",
  },
  arrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    width: 32,
    height: 32,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  iconButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.22)",
  },
  icon: {
    width: 22,
    height: 22,
  },
  iconLabel: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1.2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
