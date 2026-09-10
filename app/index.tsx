import React from "react";
import { Redirect } from "expo-router";
import { useAppStore } from "@/stores/appStore";

export default function RootIndex() {
  const hasSeenOnboarding = useAppStore((s) => s.hasSeenOnboarding);

  if (!hasSeenOnboarding) {
    return <Redirect href="/(onboarding)" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
