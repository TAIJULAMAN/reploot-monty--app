import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen, AppText, Button } from "@/shared/components/ui";

export default function ForgotPasswordRoute() {
  const router = useRouter();

  return (
    <Screen padded>
      <View style={styles.container}>
        <AppText variant="caption" color="accent">
          PHASE 2 DESTINATION
        </AppText>
        <AppText variant="displayLG" color="primary" style={styles.title}>
          RESET PASSWORD
        </AppText>
        <AppText variant="bodyMD" color="secondary" style={styles.description}>
          Magic link email dispatch and new password strength verification.
        </AppText>

        <Button
          title="Back to Sign In"
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
