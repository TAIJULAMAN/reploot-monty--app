import { Image } from "expo-image";
import { Pencil } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

export const EditProfileBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={require("../../../../assets/editProfileBg.png")}
        style={styles.bannerImage}
        contentFit="cover"
      />
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=11" }}
          style={styles.avatarImage}
        />
        <View style={styles.editIconBadge}>
          <Pencil size={12} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: "relative",
    marginBottom: 44,
  },
  bannerImage: {
    width: "100%",
    height: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -30,
    left: 20,
    width: 76,
    height: 76,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: "rgba(45, 212, 191, 0.6)",
    backgroundColor: "#161B26",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 11,
  },
  editIconBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0284C7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#090A10",
  },
});
