import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Check, CreditCard, Download, Smartphone } from "lucide-react-native";
import React, { useState } from "react";
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

interface Transaction {
  id: string;
  title: string;
  invoiceId: string;
  price: string;
  date: string;
  method: string;
  isApplePay: boolean;
  status: "COMPLETED" | "PENDING";
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    title: "REPLOOT PREMIUM MONTHLY",
    invoiceId: "INV-2026-0792",
    price: "$9.99",
    date: "July 20, 2026",
    method: "APPLE PAY",
    isApplePay: true,
    status: "COMPLETED",
  },
  {
    id: "tx-2",
    title: "REPLOOT PREMIUM MONTHLY",
    invoiceId: "INV-2026-0641",
    price: "$9.99",
    date: "June 20, 2026",
    method: "APPLE PAY",
    isApplePay: true,
    status: "COMPLETED",
  },
  {
    id: "tx-3",
    title: "BIOMETRIC PRO UPGRADE",
    invoiceId: "INV-2026-0518",
    price: "$29.00",
    date: "May 15, 2026",
    method: "MASTERCARD ****9281",
    isApplePay: false,
    status: "COMPLETED",
  },
  {
    id: "tx-4",
    title: "REPLOOT PREMIUM MONTHLY",
    invoiceId: "INV-2026-0390",
    price: "$9.99",
    date: "April 20, 2026",
    method: "APPLE PAY",
    isApplePay: true,
    status: "COMPLETED",
  },
];

export default function PaymentHistoryRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/profile");
    }
  };

  const handleActionHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  const handleDownloadInvoice = (id: string) => {
    handleActionHaptic();
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setToastMessage(`INVOICE ${id.toUpperCase()} SAVED TO ARCHIVE`);
      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Cyber Kinetic Ambient Gradient & Accent Lines */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          <SvgLine
            x1="420"
            y1="-20"
            x2="-40"
            y2="440"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
          />
          <SvgLine
            x1="460"
            y1="260"
            x2="-40"
            y2="760"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeWidth="1"
          />
          <SvgLine
            x1="480"
            y1="560"
            x2="-40"
            y2="1080"
            stroke="rgba(56, 237, 216, 0.04)"
            strokeWidth="1"
          />
        </Svg>
      </View>

      <CustomHeader
        titleVariant="text"
        title=""
        showBackButton={true}
        onPressBack={handleBack}
        showSearch={true}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 40, 60) },
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
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    PAYMENT HISTORY
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
            Invoice records & subscription payment receipts
          </Text>
        </View>

        {/* Section Header */}
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>INVOICE & BILLING HISTORY</Text>
          <View style={styles.sectionLine} />
        </View> */}

        {/* Transaction History List */}
        <View style={styles.transactionList}>
          {TRANSACTIONS.map((tx) => (
            <View key={tx.id} style={styles.transactionCard}>
              <View style={styles.txTopRow}>
                <View style={styles.txInfo}>
                  <Text style={styles.txTitle}>{tx.title}</Text>
                  <Text style={styles.txMeta}>
                    {tx.date} • {tx.invoiceId}
                  </Text>
                </View>
                <Text style={styles.txPrice}>{tx.price}</Text>
              </View>

              <View style={styles.txBottomRow}>
                <View style={styles.txMethodBadge}>
                  {tx.isApplePay ? (
                    <Smartphone size={12} color="#94A3B8" />
                  ) : (
                    <CreditCard size={12} color="#94A3B8" />
                  )}
                  <Text style={styles.txMethodText}>{tx.method}</Text>
                </View>

                <View style={styles.txActionsRight}>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusText}>{tx.status}</Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.invoiceBtn}
                    onPress={() => handleDownloadInvoice(tx.id)}
                  >
                    <Download
                      size={13}
                      color={downloadingId === tx.id ? "#2DD4BF" : "#38BDF8"}
                    />
                    <Text
                      style={[
                        styles.invoiceBtnText,
                        downloadingId === tx.id && { color: "#2DD4BF" },
                      ]}
                    >
                      {downloadingId === tx.id ? "SAVED" : "PDF"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Cyber HUD Toast */}
      {toastMessage && (
        <View style={styles.savedToast}>
          <Check size={16} color="#00f2fe" style={{ marginRight: 8 }} />
          <Text style={styles.savedToastText}>{toastMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A10",
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
    marginTop: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginLeft: 12,
  },
  transactionList: {
    gap: 12,
    marginBottom: 24,
  },
  transactionCard: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
  },
  txTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  txInfo: {
    flex: 1,
    marginRight: 12,
  },
  txTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  txMeta: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
  },
  txPrice: {
    color: "#38BDF8",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  txBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txMethodBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  txMethodText: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  txActionsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusPill: {
    backgroundColor: "rgba(45, 212, 191, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.25)",
  },
  statusText: {
    color: "#2DD4BF",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  invoiceBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
    gap: 4,
  },
  invoiceBtnText: {
    color: "#38BDF8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  savedToast: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7, 10, 17, 0.95)",
    borderWidth: 1.5,
    borderColor: "#00f2fe",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    zIndex: 9999,
    elevation: 12,
    shadowColor: "#00f2fe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  savedToastText: {
    color: "#00f2fe",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
  },
});
