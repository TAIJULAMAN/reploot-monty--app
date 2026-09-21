import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  Heart,
  Award,
  Zap,
  Activity,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useAuthStore } from "@/stores/authStore";

export default function ProfileTabRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuthStore();

  const fullName = user?.fullName || "Kinetic Runner";
  const email = user?.email || "runner@kinetic.ai";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // ignore
    }

    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of Kinetqx?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/(auth)/sign-in");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Cyber Ambient Background Glows */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "#080A10" }]} />
        <LinearGradient
          colors={["rgba(99, 102, 241, 0.12)", "rgba(56, 189, 248, 0.05)", "transparent"]}
          start={{ x: 0.8, y: 0 }}
          end={{ x: 0.1, y: 0.5 }}
          style={styles.ambientTopGlow}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingTop: Math.max(insets.top + 16, 28),
            paddingBottom: 110, // Safe clearance above floating TabBar
          },
        ]}
      >
        {/* Header Title */}
        <Text style={styles.screenTitle}>KINETIC PROFILE</Text>

        {/* User Card */}
        <View style={styles.userCard}>
          <LinearGradient
            colors={["#161B2E", "#0F1320"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.userCardGradient}
          >
            <View style={styles.avatarRow}>
              {/* Avatar Circle with Neon Ring */}
              <View style={styles.avatarBorder}>
                <LinearGradient
                  colors={["#6366F1", "#38BDF8", "#2DD4BF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatarGradient}
                >
                  <Text style={styles.avatarText}>{initials}</Text>
                </LinearGradient>
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{fullName}</Text>
                <Text style={styles.userEmail}>{email}</Text>
                <View style={styles.tierBadge}>
                  <Zap size={11} color="#2DD4BF" fill="#2DD4BF" />
                  <Text style={styles.tierBadgeText}>ELITE ATHLETE • LVL 42</Text>
                </View>
              </View>
            </View>

            {/* Quick Stats Grid */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>48</Text>
                <Text style={styles.statLabel}>WORKOUTS</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>36.5</Text>
                <Text style={styles.statLabel}>HOURS</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>18.4K</Text>
                <Text style={styles.statLabel}>CALORIES</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionHeading}>PREFERENCES</Text>
        <View style={styles.settingsGroup}>
          <SettingsItem
            icon={<User size={18} color="#38BDF8" />}
            title="Personal Metrics"
            subtitle="Height, weight, target goals"
          />
          <SettingsItem
            icon={<Activity size={18} color="#2DD4BF" />}
            title="Fitness Routine"
            subtitle="Custom AI workout calibration"
          />
          <SettingsItem
            icon={<Heart size={18} color="#F43F5E" />}
            title="Health Integrations"
            subtitle="Apple Health, Google Fit, Garmin"
          />
          <SettingsItem
            icon={<Bell size={18} color="#F59E0B" />}
            title="Notifications"
            subtitle="Reminders & workout schedules"
          />
          <SettingsItem
            icon={<Shield size={18} color="#818CF8" />}
            title="Security & Privacy"
            subtitle="Password, biometrics, credentials"
            isLast
          />
        </View>

        {/* Sign Out CTA Button */}
        <Text style={styles.sectionHeading}>ACCOUNT ACTIONS</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sign Out"
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.signOutButtonPressed,
          ]}
        >
          <View style={styles.signOutContent}>
            <View style={styles.signOutIconWrapper}>
              <LogOut size={18} color="#EF4444" />
            </View>
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
          <ChevronRight size={18} color="#EF4444" />
        </Pressable>

        {/* App Version Info */}
        <View style={styles.versionFooter}>
          <Text style={styles.versionText}>KINETQX CYBER-FITNESS v1.0.0</Text>
          <Text style={styles.versionSub}>Engineered with Expo SDK 57 & NativeWind</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function SettingsItem({
  icon,
  title,
  subtitle,
  isLast = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isLast?: boolean;
}) {
  return (
    <Pressable style={[styles.settingsItem, isLast && styles.settingsItemLast]}>
      <View style={styles.settingsIconBox}>{icon}</View>
      <View style={styles.settingsTextBox}>
        <Text style={styles.settingsTitle}>{title}</Text>
        <Text style={styles.settingsSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={18} color="#64748B" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080A10",
  },
  ambientTopGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 320,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  screenTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  userCard: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.09)",
    marginBottom: 26,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  userCardGradient: {
    padding: 20,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarBorder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2.5,
    backgroundColor: "#0B0E14",
    marginRight: 16,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  avatarGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 3,
  },
  userEmail: {
    color: "#94A3B8",
    fontSize: 13,
    marginBottom: 8,
  },
  tierBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
  },
  tierBadgeText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 2,
  },
  statLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  sectionHeading: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: "#0F1320",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    overflow: "hidden",
    marginBottom: 26,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  settingsItemLast: {
    borderBottomWidth: 0,
  },
  settingsIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  settingsTextBox: {
    flex: 1,
  },
  settingsTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  settingsSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    padding: 16,
    marginBottom: 32,
  },
  signOutButtonPressed: {
    backgroundColor: "rgba(239, 68, 68, 0.16)",
    transform: [{ scale: 0.99 }],
  },
  signOutContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  signOutIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  signOutText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  versionFooter: {
    alignItems: "center",
    paddingBottom: 20,
  },
  versionText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  versionSub: {
    color: "#475569",
    fontSize: 11,
  },
});
