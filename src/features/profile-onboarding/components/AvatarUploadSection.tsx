import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Camera, User as UserIcon } from "lucide-react-native";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useProfileSetupStore } from "../store/profileSetupStore";

export function AvatarUploadSection() {
  const { data, updateData } = useProfileSetupStore();

  const handlePickAvatar = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please grant camera roll permissions to upload your profile avatar.",
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

  return (
    <View style={styles.avatarSection}>
      <View style={styles.avatarWrapper}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Upload profile photo"
          onPress={handlePickAvatar}
          style={({ pressed }) => [
            styles.avatarButton,
            pressed && styles.pressed,
          ]}
        >
          <LinearGradient
            colors={["#4F46E5", "#38BDF8", "#2DD4BF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarRingGradient}
          >
            <View style={styles.avatarInner}>
              {data.avatarUri ? (
                <Image
                  source={{ uri: data.avatarUri }}
                  style={styles.avatarImage}
                />
              ) : (
                <UserIcon size={38} color="#64748B" strokeWidth={1.8} />
              )}
            </View>
          </LinearGradient>

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

        <View style={styles.sparkleCluster} pointerEvents="none">
          <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <Path
              d="M36 16L33.5 10.5L28 8L33.5 5.5L36 0L38.5 5.5L44 8L38.5 10.5L36 16ZM36 44L33.5 38.5L28 36L33.5 33.5L36 28L38.5 33.5L44 36L38.5 38.5L36 44ZM16 38L11 27L0 22L11 17L16 6L21 17L32 22L21 27L16 38ZM16 28.3L18 24L22.3 22L18 20L16 15.7L14 20L9.7 22L14 24L16 28.3Z"
              fill="#FF9A5A"
            />
          </Svg>
        </View>
      </View>

      <Text style={styles.uploadPhotoText}>UPLOAD PHOTO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
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
    right: -100,
    top: 50,
  },
  uploadPhotoText: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 12,
    fontWeight: "400",
    letterSpacing: 2,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
