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
    marginBottom: 50,
  },
  bannerImage: {
    width: "100%",
    height: 140,
    borderRadius: 20,
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -35,
    left: 20,
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: "#161722",
    backgroundColor: "#1C1F2E",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 38,
  },
  editIconBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#38BDF8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#161722",
  },
});
