import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen, AppText, Button } from "@/shared/components/ui";

export default function OnboardingScreenPlaceholder() {
  const router = useRouter();

  return (
    <Screen padded>
      <View style={styles.container}>
        <AppText variant="caption" color="accent">
          PHASE 1 DESTINATION
        </AppText>
        <AppText variant="displayLG" color="primary" style={styles.title}>
          ONBOARDING
        </AppText>
        <AppText variant="bodyMD" color="secondary" style={styles.description}>
          Ready for full Figma implementation: 4 tutorial slides, background fitness imagery, HUD indicators, and kinetic CTAs.
        </AppText>

        <Button
          title="Back to System Verification"
          variant="secondary"
          onPress={() => router.back()}
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
