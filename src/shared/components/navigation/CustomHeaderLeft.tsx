import { Image } from "expo-image";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderLeftProps {
  leftContent?: React.ReactNode;
  showBackButton: boolean;
  handleBackPress: () => void;
  title?: string;
  subtitle?: string;
  resolvedVariant: string;
  handleLogoPress: () => void;
}

export const CustomHeaderLeft = ({
  leftContent,
  showBackButton,
  handleBackPress,
  title,
  subtitle,
  resolvedVariant,
  handleLogoPress,
}: CustomHeaderLeftProps) => {
  if (leftContent) return <>{leftContent}</>;

  if (showBackButton) {
    return (
      <View style={styles.leftRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          onPress={handleBackPress}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>
        {Boolean(title) && title !== "REPLOOT" && (
          <View style={styles.titleColumn}>
            <Text style={styles.pageTitle}>{title}</Text>
            {Boolean(subtitle) && (
              <Text style={styles.pageSubtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      onPress={handleLogoPress}
      style={styles.logoWrapper}
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
    </TouchableOpacity>
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
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as any)
      : {}),
  },
  logoImage: {
    height: 24,
    width: 120, // Adjust this based on actual aspect ratio
  },
  titleColumn: {
    justifyContent: "center",
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
    fontFamily: "monospace",
  },
  pageSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "monospace",
    marginTop: 2,
    letterSpacing: 0.2,
  },
  pressedOpacity: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
