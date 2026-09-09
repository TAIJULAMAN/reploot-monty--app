import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen, AppText, Button } from "@/shared/components/ui";

export default function SignInRoute() {
  const router = useRouter();

  return (
    <Screen padded>
      <View style={styles.container}>
        <AppText variant="caption" color="accent">
          PHASE 2 DESTINATION
        </AppText>
        <AppText variant="displayLG" color="primary" style={styles.title}>
          WELCOME BACK
        </AppText>
        <AppText variant="bodyMD" color="secondary" style={styles.description}>
          Figma authentication specifications ready: Email, Password, Social Sign-In, and SecureStore token management.
        </AppText>

        <Button
          title="Go to Sign Up"
          variant="outline"
          onPress={() => router.push("/(auth)/sign-up")}
          style={styles.button}
        />
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
    marginBottom: 12,
  },
});
