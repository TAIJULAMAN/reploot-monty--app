import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProviders } from "@/app/providers/AppProviders";
import { colors } from "@/theme/colors";

export default function RootLayout() {
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
