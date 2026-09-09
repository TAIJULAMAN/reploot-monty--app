import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen, AppText, Button } from "@/shared/components/ui";

export default function HomeTabRoute() {
  const router = useRouter();

  return (
    <Screen padded>
      <View style={styles.container}>
        <AppText variant="caption" color="accent">
          PHASE 4 DESTINATION
        </AppText>
        <AppText variant="displayLG" color="primary" style={styles.title}>
          HOME DASHBOARD
        </AppText>
        <AppText variant="bodyMD" color="secondary" style={styles.description}>
          Level 42, Elite Tier, 12 Day Streak, Gym & Home workout cards, Today's AI Workout, and Nutrition macro rings.
        </AppText>

        <Button
          title="Back to Verification"
          variant="secondary"
          onPress={() => router.replace("/")}
          style={styles.button}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 8,
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    marginBottom: 32,
    maxWidth: 300,
  },
  button: {
    width: "100%",
  },
});
