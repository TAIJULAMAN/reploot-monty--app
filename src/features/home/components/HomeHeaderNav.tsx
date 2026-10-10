import { useAppSelector } from "@/store/hooks";
import { Image } from "expo-image";
import { Bell, Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const HomeHeaderNav = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../../../assets/logo.png")}
        style={styles.logoImage}
        contentFit="contain"
      />

      {/* Right Icons */}
      <View style={styles.actions}>
        <Search size={18} color="#94A3B8" strokeWidth={2.5} />
        <Bell size={18} color="#94A3B8" strokeWidth={2.5} />
        {user?.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logoImage: {
    height: 24,
    width: 120, // Adjust this based on actual aspect ratio
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2DD4BF",
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2DD4BF",
    backgroundColor: "#1E293B",
  },
});
