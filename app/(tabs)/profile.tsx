import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen, AppText, Button } from "@/shared/components/ui";

export default function ProfileTabRoute() {
  const router = useRouter();

  return (
    <Screen padded>
      <View style={styles.container}>
        <AppText variant="caption" color="accent">
          PROFILE & SETTINGS
        </AppText>
        <AppText variant="displayLG" color="primary" style={styles.title}>
          KINETIC PROFILE
        </AppText>
        <AppText variant="bodyMD" color="secondary" style={styles.description}>
          Global Rank, Fitness Summary, Leaderboard, Premium Subscription, and Settings.
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
