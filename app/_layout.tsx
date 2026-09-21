import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { AppProviders } from "@/app/providers/AppProviders";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  useFonts({
    JetBrainsMono_700Bold,
  });
  return (
    <AppProviders>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="dev" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(profile-setup)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="coach/index" />
        <Stack.Screen name="workouts/index" />
        <Stack.Screen
          name="modals/index"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </AppProviders>
  );
}
