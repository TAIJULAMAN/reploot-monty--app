import { AppProviders } from "@/providers/AppProviders";
import { colors } from "@/theme/colors";
import {
  JetBrainsMono_700Bold,
  useFonts,
} from "@expo-google-fonts/jetbrains-mono";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";

function AuthGuard() {
  useProtectedRoute();
  return null;
}

export default function RootLayout() {
  useFonts({
    JetBrainsMono_700Bold,
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
