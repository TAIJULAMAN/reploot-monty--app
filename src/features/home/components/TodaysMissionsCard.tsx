import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

export const TodaysMissionsCard = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/todaysMission/todaysMissionsBg.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.headerTitle}>TODAY'S MISSIONS</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.missionInfo}>
              <Text style={styles.missionTitle}>Pull Day Hyper-Row</Text>
              <Text style={styles.missionSubtitle}>
                Lat Pulldown & Cable Rows
              </Text>
            </View>
            <Pressable>
              <Image
                source={require("../../../../assets/todaysMission/RightArrow.png")}
                style={{ width: 50, height: 50 }}
                contentFit="contain"
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Pressable onPress={() => router.push("/workout-calendar")}>
              <Image
                source={require("../../../../assets/todaysMission/calendar.svg")}
                style={{ width: 48, height: 48 }}
                contentFit="contain"
              />
            </Pressable>
            <Pressable onPress={() => router.push("/settings")}>
              <Image
                source={require("../../../../assets/todaysMission/settings.svg")}
                style={{ width: 48, height: 48 }}
                contentFit="contain"
              />
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
    marginTop: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  background: {
    width: "100%",
    minHeight: 240,
  },
  backgroundImage: {
    resizeMode: "stretch",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 1,
    textAlign: "center",
  },
  missionInfo: {
    marginTop: 24,
    marginBottom: 24,
  },
  missionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  missionSubtitle: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "400",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(34, 211, 238, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
