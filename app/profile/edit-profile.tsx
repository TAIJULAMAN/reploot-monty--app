import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EditProfileBanner } from "@/features/profile/components/EditProfileBanner";
import { EditProfileForm } from "@/features/profile/components/EditProfileForm";
import { EditProfileSecurityBox } from "@/features/profile/components/EditProfileSecurityBox";
import { EditProfileActions } from "@/features/profile/components/EditProfileActions";

export default function EditProfileRoute() {
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainTitle}>EDIT{"\n"}PROFILE</Text>
          <EditProfileBanner />
          <EditProfileForm />
          <EditProfileSecurityBox />
          <EditProfileActions />
        </ScrollView>
      </KeyboardAvoidingView>
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
});
