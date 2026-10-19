import { CommunityRankCard } from "@/features/profile/components/CommunityRankCard";
import { FitnessSummaryCard } from "@/features/profile/components/FitnessSummaryCard";
import { PlanCard } from "@/features/profile/components/PlanCard";
import { QRCodeCard } from "@/features/profile/components/QRCodeCard";
import { TopProfileCard } from "@/features/profile/components/TopProfileCard";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

export default function ProfileTabRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNavigate = (
    path: "/profile/payment-history" | "/profile/account-settings",
  ) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push(path);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <CustomHeader
        titleVariant="logo"
        showBackButton={false}
        showSearch={true}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 110, 130) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section with Masked Gradient Title & Description */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    MY PROFILE
                  </Text>
                </View>
              }
            >
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </MaskedView>
          </View>
          <Text style={styles.subtitle}>
            Athlete telemetry, biometric credentials & account protocols
          </Text>
        </View>
        <TopProfileCard />
        <QRCodeCard />
        <CommunityRankCard />
        <FitnessSummaryCard />
        <PlanCard />

        {/* Account Protocols Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACCOUNT PROTOCOLS</Text>
          <View style={styles.sectionLine} />
        </View>

        {/* List Buttons */}
        <TouchableOpacity
          style={styles.listItem}
          activeOpacity={0.75}
          onPress={() => handleNavigate("/profile/payment-history")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/paymentHistory.png")}
              style={styles.itemIcon}
              contentFit="contain"
            />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.listItemText}>PAYMENT HISTORY</Text>
            <Text style={styles.listItemSubtext}>
              Billing cycles, invoices & subscription tier
            </Text>
          </View>
          <View style={styles.chevronWrapper}>
            <ChevronRight size={18} color="#38BDF8" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.listItem}
          activeOpacity={0.75}
          onPress={() => handleNavigate("/profile/account-settings")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/accountSetting.png")}
              style={styles.itemIcon}
              contentFit="contain"
            />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.listItemText}>ACCOUNT SETTINGS</Text>
            <Text style={styles.listItemSubtext}>
              Credentials, security & notification parameters
            </Text>
          </View>
          <View style={styles.chevronWrapper}>
            <ChevronRight size={18} color="#38BDF8" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleSection: {
    marginTop: 4,
    marginBottom: 20,
  },
  maskedTitleWrapper: {
    height: 48,
    width: "100%",
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    marginRight: 14,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  listItemPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
    borderColor: "rgba(56, 189, 248, 0.35)",
    backgroundColor: "rgba(56, 189, 248, 0.05)",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(56, 189, 248, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  itemIcon: {
    width: 28,
    height: 28,
  },
  itemContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  listItemText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  listItemSubtext: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 15,
    fontFamily: "monospace",
    marginTop: 2,
  },
  chevronWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
});
