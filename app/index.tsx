import React from "react";
import { Redirect } from "expo-router";
import { useAppSelector } from "@/store/hooks";

export default function RootIndex() {
  const hasSeenOnboarding = useAppSelector((state) => state.app.hasSeenOnboarding);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!hasSeenOnboarding) {
    return <Redirect href="/(onboarding)" />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/sign-up" />;
}
