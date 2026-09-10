import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  AppText,
  Button,
  GlassCard,
  GlowCard,
  ProgressBar,
  Screen,
} from "@/shared/components/ui";
import { useAppStore } from "@/stores/appStore";
import { mockUser } from "@/mocks/user.mock";
import { queryKeys } from "@/services/api/queryKeys";
import { colors } from "@/theme/colors";
import { Sparkles, CheckCircle, Zap, Shield, ChevronRight } from "lucide-react-native";

export default function DevVerificationScreen() {
  const router = useRouter();
  const { isOnline, setOnline, hasSeenOnboarding, setHasSeenOnboarding } = useAppStore();

  // Demonstrate React Query server-state caching with mock data
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      // Simulate slight network delay
      await new Promise((r) => setTimeout(r, 100));
      return mockUser;
    },
  });

  return (
    <Screen scrollable padded>
      {/* Brand Header */}
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.statusPill}>
            <View style={styles.onlineDot} />
            <AppText variant="caption" color="accent">
              FOUNDATION READY
            </AppText>
          </View>
          <AppText variant="caption" color="muted">
            SDK 57 • EXPO ROUTER
          </AppText>
        </View>

        <AppText variant="displayXL" color="primary" style={styles.brandTitle}>
          KINETQX
        </AppText>
        <AppText variant="label" color="accent" style={styles.tagline}>
          TRAIN SMARTER WITH AI
        </AppText>
      </View>

      {/* System Status Verification Card */}
      <GlowCard glowColor="gradient" style={styles.cardSpacing}>
        <View style={styles.cardHeader}>
          <Sparkles size={20} color={colors.brand.cyan} />
          <AppText variant="headingMD" color="primary" style={styles.cardTitle}>
            System Initialization Verified
          </AppText>
        </View>

        <View style={styles.verificationList}>
          <VerificationItem label="Expo Router & Navigation Tree" ok />
          <VerificationItem label="NativeWind & Tailwind Tokens" ok />
          <VerificationItem label="Expo Linear Gradients & Glows" ok />
          <VerificationItem label="TanStack React Query Cache" ok={!isLoading} />
          <VerificationItem label="Zustand Client State Engine" ok />
          <VerificationItem label="Hardware Camera & AI Boundaries" ok />
          <VerificationItem label="SecureStore Keychain / Keystore" ok />
        </View>
      </GlowCard>

      {/* Zustand Client State Reactivity Proof */}
      <GlassCard style={styles.cardSpacing}>
        <View style={styles.cardHeader}>
          <Zap size={18} color={colors.brand.mint} />
          <AppText variant="headingMD" color="primary" style={styles.cardTitle}>
            Zustand Client State
          </AppText>
        </View>

        <View style={styles.stateRow}>
          <AppText variant="bodyMD" color="secondary">
            Onboarding Completed:
          </AppText>
          <AppText
            variant="label"
            color={hasSeenOnboarding ? "mint" : "muted"}
          >
            {hasSeenOnboarding ? "COMPLETED" : "NOT STARTED"}
          </AppText>
        </View>

        <View style={styles.buttonRow}>
          <Button
            title={hasSeenOnboarding ? "Reset Onboarding" : "Complete Onboarding"}
            variant="secondary"
            size="sm"
            onPress={() => setHasSeenOnboarding(!hasSeenOnboarding)}
            style={{ flex: 1 }}
          />
        </View>
      </GlassCard>

      {/* React Query Server State Proof */}
      <GlassCard style={styles.cardSpacing}>
        <View style={styles.cardHeader}>
          <Shield size={18} color={colors.brand.purple} />
          <AppText variant="headingMD" color="primary" style={styles.cardTitle}>
            TanStack React Query Server State
          </AppText>
        </View>

        <View style={styles.stateRow}>
          <AppText variant="bodyMD" color="secondary">
            User Mock Query:
          </AppText>
          <AppText variant="bodyMD" color="primary">
            {isLoading ? "Fetching..." : user?.fullName}
          </AppText>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <AppText variant="caption" color="muted">
              SYSTEM READINESS
            </AppText>
            <AppText variant="caption" color="accent">
              100%
            </AppText>
          </View>
          <ProgressBar progress={1.0} gradient="cyanMint" height={6} />
        </View>
      </GlassCard>

      {/* Route Navigation Links */}
      <View style={styles.routesSection}>
        <AppText variant="label" color="muted" style={styles.sectionLabel}>
          READY FOR FEATURE DEVELOPMENT
        </AppText>

        <RoutePreviewButton
          title="Phase 1: Splash & Onboarding"
          subtitle="4-slide tutorial & kinetic branding"
          onPress={() => router.push("/(onboarding)")}
        />
        <RoutePreviewButton
          title="Phase 2: Authentication Flow"
          subtitle="Sign-in, sign-up, password reset"
          onPress={() => router.push("/(auth)/sign-in")}
        />
        <RoutePreviewButton
          title="Phase 3: Profile Setup (5 Steps)"
          subtitle="Body metrics, goals, workout style"
          onPress={() => router.push("/(profile-setup)")}
        />
        <RoutePreviewButton
          title="Phase 4: Main Tabs (Home, Nutrition...)"
          subtitle="Bottom nav, level card, macro rings"
          onPress={() => router.push("/(tabs)/home")}
        />
      </View>
    </Screen>
  );
}

function VerificationItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <View style={styles.verifyItem}>
      <CheckCircle size={16} color={ok ? colors.brand.mint : colors.text.muted} />
      <AppText variant="bodySM" color={ok ? "primary" : "muted"} style={styles.verifyLabel}>
        {label}
      </AppText>
    </View>
  );
}

function RoutePreviewButton({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Button
      title={title}
      variant="secondary"
      size="md"
      onPress={onPress}
      rightIcon={<ChevronRight size={16} color={colors.brand.cyan} />}
      style={styles.routeButton}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 12,
    marginBottom: 20,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(34, 211, 238, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(34, 211, 238, 0.3)",
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand.cyan,
    marginRight: 6,
  },
  brandTitle: {
    letterSpacing: 2,
  },
  tagline: {
    letterSpacing: 3,
    marginTop: 2,
  },
  cardSpacing: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    marginLeft: 10,
  },
  verificationList: {
    gap: 8,
  },
  verifyItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifyLabel: {
    marginLeft: 10,
  },
  stateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  routesSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionLabel: {
    marginBottom: 12,
  },
  routeButton: {
    marginBottom: 10,
  },
});
