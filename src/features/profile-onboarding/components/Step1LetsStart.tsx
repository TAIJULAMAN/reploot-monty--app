import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Image,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Camera, Mail, Phone, User as UserIcon, Zap } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import Svg, { Path } from "react-native-svg";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";
import { AgeSlider } from "./AgeSlider";

export function Step1LetsStart() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - 40 - 12) / 2);
  const { data, updateData, nextStep } = useProfileSetupStore();

  const handlePickAvatar = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please grant camera roll permissions to upload your profile avatar."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        updateData({ avatarUri: result.assets[0].uri });
      }
    } catch (e) {
      console.warn("Avatar pick error:", e);
    }
  };

  const handleSelectGender = (gender: "male" | "female") => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    updateData({ gender });
  };


  return (
    <View style={styles.container}>
      {/* Title: LET'S ⚡ START */}
      <View style={styles.hero}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>LET'S</Text>
          <Zap size={24} color="#38BDF8" fill="#38BDF8" style={styles.titleZap} />
        </View>
        <Text style={styles.title}>START</Text>
      </View>

      {/* Avatar Upload Section: Circular Neon Rim & Sparkles */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Upload profile photo"
            onPress={handlePickAvatar}
            style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}
          >
            {/* Luminous Gradient Ring (Blue to Mint) */}
            <LinearGradient
              colors={["#4F46E5", "#38BDF8", "#2DD4BF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarRingGradient}
            >
              <View style={styles.avatarInner}>
                {data.avatarUri ? (
                  <Image source={{ uri: data.avatarUri }} style={styles.avatarImage} />
                ) : (
                  <UserIcon size={38} color="#64748B" strokeWidth={1.8} />
                )}
              </View>
            </LinearGradient>

            {/* Camera Floating Badge */}
            <View style={styles.cameraBadge}>
              <LinearGradient
                colors={["#7C3AED", "#6366F1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cameraGradient}
              >
                <Camera size={12} color="#FFFFFF" strokeWidth={2.2} />
              </LinearGradient>
            </View>
          </Pressable>

          {/* Floating Sparkle Stars Cluster on Right matching Figma */}
          <View style={styles.sparkleCluster} pointerEvents="none">
            <Svg width={42} height={42} viewBox="0 0 40 40" fill="none">
              {/* Primary 4-point Star */}
              <Path
                d="M14 4 C14 10 17 13 23 13 C17 13 14 16 14 22 C14 16 11 13 5 13 C11 13 14 10 14 4 Z"
                fill="rgba(190, 138, 136, 0.85)"
              />
              {/* Top-Right Secondary 4-point Star */}
              <Path
                d="M30 4 C30 8 32 10 36 10 C32 10 30 12 30 16 C30 12 28 10 24 10 C28 10 30 8 30 4 Z"
                fill="rgba(190, 138, 136, 0.75)"
              />
              {/* Bottom-Right Smallest 4-point Star */}
              <Path
                d="M30 24 C30 27 31.5 28.5 34.5 28.5 C31.5 28.5 30 30 30 33 C30 30 28.5 28.5 25.5 28.5 C28.5 28.5 30 27 30 24 Z"
                fill="rgba(190, 138, 136, 0.65)"
              />
            </Svg>
          </View>
        </View>

        <Text style={styles.uploadPhotoText}>UPLOAD PHOTO</Text>
      </View>

      {/* Form Input Fields (Full Name, Email Address, Contact Number) */}
      <View style={styles.formGroup}>
        {/* Full Name */}
        <View style={styles.inputCard}>
          <UserIcon size={16} color="#8E8B9E" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            value={data.fullName}
            onChangeText={(fullName) => updateData({ fullName })}
            placeholder="Full Name"
            placeholderTextColor="#6E6C7D"
            style={styles.input}
            selectionColor="#38BDF8"
          />
        </View>

        {/* Email Address */}
        <View style={styles.inputCard}>
          <Mail size={16} color="#8E8B9E" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            value={data.email}
            onChangeText={(email) => updateData({ email })}
            placeholder="Email Address"
            placeholderTextColor="#6E6C7D"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            selectionColor="#38BDF8"
          />
        </View>

        {/* Contact Number */}
        <View style={styles.inputCard}>
          <Phone size={16} color="#8E8B9E" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            value={data.phoneNumber}
            onChangeText={(phoneNumber) => updateData({ phoneNumber })}
            placeholder="Contact Number"
            placeholderTextColor="#6E6C7D"
            keyboardType="phone-pad"
            style={styles.input}
            selectionColor="#38BDF8"
          />
        </View>
      </View>

      {/* Gender Selection Cards (Male & Female side by side matching Figma) */}
      <View style={styles.genderRow}>
        {/* Male Card */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select Male"
          onPress={() => handleSelectGender("male")}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <View
            style={[
              styles.genderCard,
              { width: cardWidth },
              styles.maleBorder,
              data.gender === "male" && styles.maleActiveCard,
            ]}
          >
            <Text style={[styles.genderSymbol, styles.maleSymbol]}>♂</Text>
            <Text style={styles.genderLabel}>MALE</Text>
          </View>
        </Pressable>

        {/* Female Card */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select Female"
          onPress={() => handleSelectGender("female")}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <View
            style={[
              styles.genderCard,
              { width: cardWidth },
              styles.femaleBorder,
              data.gender === "female" && styles.femaleActiveCard,
            ]}
          >
            <Text style={[styles.genderSymbol, styles.femaleSymbol]}>♀</Text>
            <Text style={styles.genderLabel}>FEMALE</Text>
          </View>
        </Pressable>
      </View>

      {/* Age Selector Card: SELECT AGE | Slideable Number Carousel */}
      <View style={styles.ageCard}>
        <View style={styles.ageInfo}>
          <Text style={styles.ageTitle}>SELECT</Text>
          <Text style={styles.ageTitle}>AGE</Text>
          <Text style={styles.ageSubtitle}>Years of</Text>
          <Text style={styles.ageSubtitle}>power</Text>
        </View>

        <AgeSlider
          value={data.age}
          onChange={(age) => updateData({ age })}
        />
      </View>

      {/* Continue CTA */}
      <ProfileNavigationButton
        title="CONTINUE"
        onPress={nextStep}
        subtext="BY PROCEEDING YOU AGREE TO OUR TERMS OF FORCE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  hero: {
    marginTop: 0,
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleZap: {
    marginLeft: 6,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(56, 189, 248, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 8,
  },
  avatarWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarButton: {
    position: "relative",
  },
  avatarRingGradient: {
    width: 94,
    height: 94,
    borderRadius: 47,
    padding: 2.5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    borderRadius: 44.5,
    backgroundColor: "#131520",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2.5,
    borderColor: "#0E0F17",
    overflow: "hidden",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cameraGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sparkleCluster: {
    position: "absolute",
    right: -24,
    top: 4,
  },
  uploadPhotoText: {
    color: "#94A3B8",
    fontSize: 9.5,
    lineHeight: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 6,
  },
  formGroup: {
    gap: 7,
    marginBottom: 10,
  },
  inputCard: {
    height: 46,
    borderRadius: 15,
    backgroundColor: "#1D1B24",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    height: "100%",
  },
  genderRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  genderPressable: {
    width: "48%",
  },
  genderCard: {
    width: "100%",
    height: 110,
    borderRadius: 22,
    borderWidth: 1.5,
    backgroundColor: "#12131C",
    alignItems: "center",
    justifyContent: "center",
  },
  maleBorder: {
    borderColor: "#38BDF8",
  },
  maleActiveCard: {
    borderColor: "#38BDF8",
    backgroundColor: "#161D2E",
  },
  femaleBorder: {
    borderColor: "#2DD4BF",
  },
  femaleActiveCard: {
    borderColor: "#EC4899",
    backgroundColor: "#221526",
  },
  genderSymbol: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "700",
    marginBottom: 4,
  },
  maleSymbol: {
    color: "#38BDF8",
  },
  femaleSymbol: {
    color: "#EC4899",
  },
  genderLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#FFFFFF",
  },
  ageCard: {
    width: "100%",
    height: 80,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#2DD4BF",
    backgroundColor: "#12131C",
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  ageInfo: {
    width: 76,
    justifyContent: "center",
  },
  ageTitle: {
    color: "#FFFFFF",
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: "900",
    letterSpacing: 1.6,
  },
  ageSubtitle: {
    color: "#64748B",
    fontSize: 8.5,
    lineHeight: 11,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
