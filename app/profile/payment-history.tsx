import { LinearGradient } from "expo-linear-gradient";
import { CreditCard, FileText, Smartphone } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAYMENTS = [
  {
    id: "1",
    title: "Premium Monthly",
    price: "$9.99",
    date: "July 20, 2026",
    method: "APPLE PAY",
    isApplePay: true,
  },
  {
    id: "2",
    title: "Premium Monthly",
    price: "$9.99",
    date: "June 20, 2026",
    method: "APPLE PAY",
    isApplePay: true,
  },
  {
    id: "3",
    title: "Premium Yearly",
    price: "$119.99",
    date: "May 15, 2026",
    method: "MASTERCARD ****9281",
    isApplePay: false,
  },
  {
    id: "4",
    title: "Premium Monthly",
    price: "$9.99",
    date: "April 20, 2026",
    method: "APPLE PAY",
    isApplePay: true,
  },
];

export default function PaymentHistoryRoute() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#161722", "#0B0D14"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={{ paddingTop: insets.top }}>
        <CustomHeader
          titleVariant="text"
          title=""
          showBackButton={true}
          showSearch={true}
          showNotifications={true}
          showAvatar={true}
          transparent={true}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>PAYMENT{"\n"}HISTORY</Text>
        <Text style={styles.subtitle}>
          View all your subscription payments.
        </Text>

        <View style={styles.listContainer}>
          {PAYMENTS.map((payment) => (
            <LinearGradient
              key={payment.id}
              colors={["#6366F1", "#2DD4BF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradientWrapper}
            >
              <View style={styles.cardInner}>
                <View style={styles.cardTopRow}>
                  <View>
                    <Text style={styles.cardTitle}>{payment.title}</Text>
                    <Text style={styles.cardDate}>{payment.date}</Text>
                  </View>
                  <Text style={styles.cardPrice}>{payment.price}</Text>
                </View>

                <View style={styles.cardBottomRow}>
                  <View style={styles.paymentMethodWrapper}>
                    {payment.isApplePay ? (
                      <Smartphone size={14} color="#CBD5E1" />
                    ) : (
                      <CreditCard size={14} color="#CBD5E1" />
                    )}
                    <Text style={styles.paymentMethodText}>
                      {payment.method}
                    </Text>
                  </View>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusText}>COMPLETED</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          ))}
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerIconWrapper}>
            <FileText size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.footerText}>
            Need an official invoice? Contact support or check your email for
            automated billing statements.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D14",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 8,
    textShadowColor: "rgba(56, 237, 216, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    lineHeight: 44,
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 30,
  },
  listContainer: {
    gap: 16,
    marginBottom: 40,
  },
  cardGradientWrapper: {
    borderRadius: 20,
    padding: 1,
  },
  cardInner: {
    backgroundColor: "#161722",
    borderRadius: 19,
    padding: 20,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardDate: {
    color: "#94A3B8",
    fontSize: 13,
  },
  cardPrice: {
    color: "#38EDD8",
    fontSize: 16,
    fontWeight: "700",
    textShadowColor: "rgba(56, 237, 216, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentMethodWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginLeft: 8,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
    backgroundColor: "rgba(45, 212, 191, 0.05)",
  },
  statusText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footerContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});
