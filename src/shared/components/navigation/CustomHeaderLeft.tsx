import { Image } from "expo-image";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CustomHeaderLeftProps {
  leftContent?: React.ReactNode;
  showBackButton: boolean;
  handleBackPress: () => void;
  title?: string;
  resolvedVariant: string;
  handleLogoPress: () => void;
}

export const CustomHeaderLeft = ({
  leftContent,
  showBackButton,
  handleBackPress,
  title,
  resolvedVariant,
  handleLogoPress,
}: CustomHeaderLeftProps) => {
  if (leftContent) return <>{leftContent}</>;

  if (showBackButton) {
    return (
      <View style={styles.leftRow}>
        <Pressable
          onPress={handleBackPress}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressedOpacity,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>
        {Boolean(title) && title !== "REPLOOT" && (
          <Text style={styles.pageTitle}>{title}</Text>
        )}
      </View>
    );
  }

  return (
    <Pressable
      onPress={handleLogoPress}
      style={({ pressed }) => [
        styles.logoWrapper,
        pressed && styles.pressedOpacity,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Go to home"
    >
      {resolvedVariant === "logo" ? (
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logoImage}
          contentFit="contain"
        />
      ) : (
        <Text style={styles.pageTitle}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#161922",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    height: 24,
    width: 120, // Adjust this based on actual aspect ratio
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  pressedOpacity: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
