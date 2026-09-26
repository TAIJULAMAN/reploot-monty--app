import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AboutRoute() {
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
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>ABOUT{"\n"}US</Text>
        <Text style={styles.content}>
          Welcome to Kinetic AI. We are dedicated to providing the best AI-driven solutions to enhance your workflow, combining advanced machine learning with an intuitive user experience to help you achieve your goals faster and smarter.
        </Text>
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
    marginBottom: 20,
    textShadowColor: "rgba(56, 237, 216, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    lineHeight: 44,
  },
  content: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 24,
  }
});
