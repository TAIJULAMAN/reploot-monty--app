import { CommunityRankCard } from "@/features/profile/components/CommunityRankCard";
import { FitnessSummaryCard } from "@/features/profile/components/FitnessSummaryCard";
import { PlanCard } from "@/features/profile/components/PlanCard";
import { QRCodeCard } from "@/features/profile/components/QRCodeCard";
import { TopProfileCard } from "@/features/profile/components/TopProfileCard";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function ProfileTabRoute() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#181623", "#0F1115", "#0B1516"]}
      style={styles.screen}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <CustomHeader
        titleVariant="logo"
        showBackButton={false}
        showSearch={true}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
      />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>MY PROFILE</Text>

        <TopProfileCard />
        <QRCodeCard />
        <CommunityRankCard />
        <FitnessSummaryCard />
        <PlanCard />

        {/* List Buttons */}
        <Pressable 
          style={styles.listItem}
          onPress={() => router.push("/profile/payment-history")}
        >
          <Image
            source={require("../../assets/paymentHistory.png")}
            style={{ width: 40, height: 40 }}
            contentFit="contain"
          />
          <Text style={styles.listItemText}>PAYMENT HISTORY</Text>
          <ChevronRight size={18} color="#64748B" />
        </Pressable>

        <Pressable 
          style={[styles.listItem, { marginBottom: 40 }]}
          onPress={() => router.push("/profile/account-settings")}
        >
          <Image
            source={require("../../assets/accountSetting.png")}
            style={{ width: 40, height: 40 }}
            contentFit="contain"
          />
          <Text style={styles.listItemText}>ACCOUNT SETTINGS</Text>
          <ChevronRight size={18} color="#64748B" />
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "900",
    marginBottom: 20,
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  listItemText: {
    flex: 1,
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 12,
    letterSpacing: 0.5,
  },
});
