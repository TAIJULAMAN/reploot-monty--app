import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen, AppText, Button } from "@/shared/components/ui";

export default function ModalRoute() {
  const router = useRouter();

  return (
    <Screen padded>
      <View style={styles.container}>
        <AppText variant="caption" color="accent">
          MODAL CONTAINER
        </AppText>
        <AppText variant="displayLG" color="primary" style={styles.title}>
          ACTION MODAL
        </AppText>
        <AppText variant="bodyMD" color="secondary" style={styles.description}>
          Standardized modal container for quick actions, hydration logs, and filters.
        </AppText>

        <Button
          title="Dismiss Modal"
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
