import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const EditProfileSecurityBox = () => {
  return (
    <View style={styles.securityBox}>
      <Image
        source={require("../../../../assets/dataSecurity.png")}
        style={{ width: 40, height: 40, marginRight: 12 }}
        contentFit="contain"
      />
      <View style={styles.securityTextContent}>
        <Text style={styles.securityTitle}>Data Security</Text>
        <Text style={styles.securityDesc}>
          Your information is encrypted with Kinetic AI Core.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  securityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    marginTop: 10,
  },
  securityTextContent: {
    flex: 1,
  },
  securityTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  securityDesc: {
    color: "#94A3B8",
    fontSize: 18,
    lineHeight: 22,
  },
});
