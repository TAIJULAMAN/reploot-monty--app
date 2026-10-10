import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAppSelector } from "@/store/hooks";

export function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const inProfileSetup = segments[0] === "(profile-setup)";
    const inAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && (inTabsGroup || inProfileSetup)) {
      router.replace("/(auth)/sign-up");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated, segments, isLoading, router]);
}
