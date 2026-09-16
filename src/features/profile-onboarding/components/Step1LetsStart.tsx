import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Camera, Mail, Phone, User as UserIcon, Zap } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { ProfileNavigationButton } from "./ProfileNavigationButton";

export function Step1LetsStart() {
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

  const handleAdjustAge = (delta: number) => {
    try {
      Haptics.selectionAsync();
    } catch {
      // ignore
    }
    const newAge = Math.max(14, Math.min(80, data.age + delta));
    updateData({ age: newAge });
  };

  const handleSetAge = (age: number) => {
    try {
      Haptics.selectionAsync();
    } catch {
      // ignore
    }
    updateData({ age });
  };

  return (
    <View style={styles.container}>
      {/* Headline with double-layer neon cyan bloom */}
      <View style={styles.hero}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>LET'S</Text>
          <Zap size={28} color="#38BDF8" fill="#38BDF8" style={styles.titleZap} />
        </View>
        <Text style={styles.title}>START</Text>
      </View>

      {/* Avatar Upload Frame */}
      <View style={styles.avatarSection}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Upload profile photo"
          onPress={handlePickAvatar}
          style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}
        >
          <LinearGradient
            colors={["#38BDF8", "#6366F1", "#44EAC3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarRing}
          >
            <View style={styles.avatarInner}>
              {data.avatarUri ? (
                <Image source={{ uri: data.avatarUri }} style={styles.avatarImage} />
              ) : (
                <UserIcon size={46} color="#A09EB5" strokeWidth={1.8} />
              )}
            </View>
          </LinearGradient>

          {/* Camera Badge */}
          <View style={styles.cameraBadge}>
            <Camera size={16} color="#FFFFFF" strokeWidth={2.2} />
          </View>
        </Pressable>

        <Text style={styles.uploadPhotoText}>UPLOAD PHOTO</Text>
      </View>

      {/* Inputs Form */}
      <View style={styles.formGroup}>
        {/* Full Name */}
        <View style={styles.inputCard}>
          <UserIcon size={20} color="#918EA1" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            value={data.fullName}
            onChangeText={(fullName) => updateData({ fullName })}
            placeholder="Full Name"
            placeholderTextColor="#918EA1"
            style={styles.input}
            selectionColor="#38BDF8"
          />
        </View>

        {/* Email Address */}
        <View style={styles.inputCard}>
          <Mail size={20} color="#918EA1" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            value={data.email}
            onChangeText={(email) => updateData({ email })}
            placeholder="Email Address"
            placeholderTextColor="#918EA1"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            selectionColor="#38BDF8"
          />
        </View>

        {/* Contact Number */}
        <View style={styles.inputCard}>
          <Phone size={20} color="#918EA1" strokeWidth={2} style={styles.inputIcon} />
          <TextInput
            value={data.phoneNumber}
            onChangeText={(phoneNumber) => updateData({ phoneNumber })}
            placeholder="Contact Number"
            placeholderTextColor="#918EA1"
            keyboardType="phone-pad"
            style={styles.input}
            selectionColor="#38BDF8"
          />
        </View>
      </View>

      {/* Gender Selection Cards */}
      <View style={styles.genderRow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => handleSelectGender("male")}
          style={({ pressed }) => [
            styles.genderCard,
            data.gender === "male" && styles.genderCardActive,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.genderSymbol, data.gender === "male" && styles.genderSymbolActive]}>
            ♂
          </Text>
          <Text style={[styles.genderLabel, data.gender === "male" && styles.genderLabelActive]}>
            MALE
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => handleSelectGender("female")}
          style={({ pressed }) => [
            styles.genderCard,
            data.gender === "female" && styles.genderCardActive,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.genderSymbol, data.gender === "female" && styles.genderSymbolActive]}>
            ♀
          </Text>
          <Text style={[styles.genderLabel, data.gender === "female" && styles.genderLabelActive]}>
            FEMALE
          </Text>
        </Pressable>
      </View>

      {/* Age Selector Card */}
      <View style={styles.ageCard}>
        <View style={styles.ageInfo}>
          <Text style={styles.ageTitle}>SELECT AGE</Text>
          <Text style={styles.ageSubtitle}>Years of power</Text>
        </View>

        <View style={styles.ageWheelRow}>
          <Pressable onPress={() => handleAdjustAge(-2)} style={styles.ageSideWrapper}>
            <Text style={styles.ageSideNum}>{data.age - 2}</Text>
          </Pressable>
          <Pressable onPress={() => handleAdjustAge(-1)} style={styles.ageSideWrapper}>
            <Text style={styles.ageSideNum}>{data.age - 1}</Text>
          </Pressable>

          <View style={styles.ageActiveWrapper}>
            <View style={styles.ageActiveIndicator} />
            <Text style={styles.ageActiveNum}>{data.age}</Text>
          </View>

          <Pressable onPress={() => handleAdjustAge(1)} style={styles.ageSideWrapper}>
            <Text style={styles.ageSideNum}>{data.age + 1}</Text>
          </Pressable>
          <Pressable onPress={() => handleAdjustAge(2)} style={styles.ageSideWrapper}>
            <Text style={styles.ageSideNum}>{data.age + 2}</Text>
          </Pressable>
        </View>
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
    paddingBottom: 24,
  },
  hero: {
    marginTop: 12,
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleZap: {
    marginLeft: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(95, 255, 215, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarButton: {
    position: "relative",
  },
  avatarRing: {
    width: 124,
    height: 124,
    borderRadius: 62,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: "#161928",
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
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0F1015",
  },
  uploadPhotoText: {
    color: "#C8C4D8",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 12,
  },
  formGroup: {
    gap: 12,
    marginBottom: 20,
  },
  inputCard: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    height: "100%",
  },
  genderRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  genderCard: {
    flex: 1,
    height: 120,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  genderCardActive: {
    borderColor: "#38BDF8",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  genderSymbol: {
    fontSize: 34,
    color: "#918EA1",
    fontWeight: "700",
    marginBottom: 6,
  },
  genderSymbolActive: {
    color: "#38BDF8",
  },
  genderLabel: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#918EA1",
  },
  genderLabelActive: {
    color: "#FFFFFF",
  },
  ageCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ageInfo: {
    flex: 1,
  },
  ageTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.8,
    marginBottom: 4,
  },
  ageSubtitle: {
    color: "#918EA1",
    fontSize: 12,
    fontWeight: "500",
  },
  ageWheelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ageSideWrapper: {
    padding: 6,
  },
  ageSideNum: {
    color: "#918EA1",
    fontSize: 17,
    fontWeight: "700",
    opacity: 0.45,
  },
  ageActiveWrapper: {
    alignItems: "center",
    paddingHorizontal: 6,
  },
  ageActiveIndicator: {
    width: 6,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#38BDF8",
    marginBottom: 2,
  },
  ageActiveNum: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
