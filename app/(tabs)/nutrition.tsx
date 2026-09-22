import { AppText, Button, Screen } from "@/shared/components/ui";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NutritionTabRoute() {
  const router = useRouter();

  return (
    <Screen padded>
      <View style={styles.container}>
        <AppText variant="caption" color="accent">
          NUTRITION DESTINATION
        </AppText>
        <AppText variant="displayLG" color="primary" style={styles.title}>
          PRECISION NUTRITION
        </AppText>
        <AppText variant="bodyMD" color="secondary" style={styles.description}>
          AI Food Scanner, Daily Macro Budgets, Hydration Quick Log, and Meal
          Planning.
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
    paddingBottom: 90,
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
