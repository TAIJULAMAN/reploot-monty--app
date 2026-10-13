import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const EditProfileSecurityBox = () => {
  return (
    <View style={styles.securityBox}>
      <View style={styles.iconContainer}>
        <Image
          source={require("../../../../assets/dataSecurity.png")}
          style={{ width: 48, height: 48 }}
          contentFit="contain"
        />
      </View>
      <View style={styles.securityTextContent}>
        <Text style={styles.securityTitle}>DATA ENCRYPTION</Text>
        <Text style={styles.securityDesc}>
          Your telemetry & biometrics are encrypted via Kinetic AI Core
          protocols.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  securityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.22)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    marginTop: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  securityTextContent: {
    flex: 1,
  },
  securityTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  securityDesc: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "monospace",
  },
});
