import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAppSelector } from "@/store/hooks";

export function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading) return;

    const inDevRoute = segments[0] === "dev";
    if (inDevRoute) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const inProfileSetup = segments[0] === "(profile-setup)";
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && inTabsGroup) {
      router.replace("/(auth)/sign-in");
    } else if (isAuthenticated && inAuthGroup) {
      if (user?.hasCompletedOnboarding) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(profile-setup)");
      }
    }
  }, [isAuthenticated, user, segments, isLoading, router]);
}
