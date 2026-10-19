import React from "react";
import { AppProviders } from "@/providers/AppProviders";
import { colors } from "@/theme/colors";
import {
  JetBrainsMono_700Bold,
  JetBrainsMono_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/jetbrains-mono";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import "../global.css";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";

LogBox.ignoreAllLogs(true);

function AuthGuard() {
  useProtectedRoute();
  return null;
}

export default function RootLayout() {
  useFonts({
    JetBrainsMono_700Bold,
    JetBrainsMono_800ExtraBold,
    JetBrainsMono_900Bold: JetBrainsMono_800ExtraBold,
  });
  
  return (
    <AppProviders>
      <AuthGuard />
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
          animation: "slide_from_right",
          animationDuration: 220,
          freezeOnBlur: true,
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
        <Stack.Screen name="notifications/index" />
        <Stack.Screen name="search/index" />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="weekly-progress" />
        <Stack.Screen name="workout-calendar" />
        <Stack.Screen name="settings" />
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
