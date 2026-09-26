import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowRight, FileText, Info } from "lucide-react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export function LinksCard() {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Pressable style={styles.linkRow} onPress={() => router.push("/profile/privacy-policy")}>
        <View style={styles.linkLeft}>
          <FileText size={20} color="#CBD5E1" style={styles.linkIcon} />
          <Text style={styles.linkTitle}>Privacy Policy</Text>
        </View>
        <View style={styles.linkRight}>
          <Text style={styles.linkActionText}>OPEN</Text>
          <ArrowRight size={16} color="#38EDD8" />
        </View>
      </Pressable>

      <View style={styles.divider} />

      <Pressable style={styles.linkRow} onPress={() => router.push("/profile/terms")}>
        <View style={styles.linkLeft}>
          <Image
            source={require("../../../assets/terms.svg")}
            style={[styles.linkIcon, { width: 20, height: 20 }]}
            contentFit="contain"
          />
          <Text style={styles.linkTitle}>Terms & Conditions</Text>
        </View>
        <View style={styles.linkRight}>
          <Text style={styles.linkActionText}>OPEN</Text>
          <ArrowRight size={16} color="#38EDD8" />
        </View>
      </Pressable>

      <View style={styles.divider} />

      <Pressable style={styles.linkRow} onPress={() => router.push("/profile/about")}>
        <View style={styles.linkLeft}>
          <Info size={20} color="#CBD5E1" style={styles.linkIcon} />
          <Text style={styles.linkTitle}>About Us</Text>
        </View>
        <View style={styles.linkRight}>
          <Text style={styles.linkActionText}>OPEN</Text>
          <ArrowRight size={16} color="#38EDD8" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161722",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginVertical: 20,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: 12,
  },
  linkTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  linkRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkActionText: {
    color: "#38EDD8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginRight: 4,
  },
});
