import { LinearGradient } from "expo-linear-gradient";
import { Mail, Phone, User as UserIcon } from "lucide-react-native";
import { StyleSheet, TextInput, View } from "react-native";
import { useProfileSetupStore } from "../store/profileSetupStore";

export function ProfileFormInputs() {
  const { data, updateData } = useProfileSetupStore();

  return (
    <View style={styles.formGroup}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.06)", "rgba(255, 255, 255, 0.02)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.inputCard}
      >
        <UserIcon
          size={18}
          color="#A79AF0"
          strokeWidth={2}
          style={styles.inputIcon}
        />
        <TextInput
          value={data.fullName}
          onChangeText={(fullName) => updateData({ fullName })}
          placeholder="Full Name"
          placeholderTextColor="#7A7585"
          style={[styles.input, { outlineStyle: "none" } as any]}
          selectionColor="#38BDF8"
        />
      </LinearGradient>

      {/* Email Address */}
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.06)", "rgba(255, 255, 255, 0.02)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.inputCard}
      >
        <Mail
          size={18}
          color="#A79AF0"
          strokeWidth={2}
          style={styles.inputIcon}
        />
        <TextInput
          value={data.email}
          onChangeText={(email) => updateData({ email })}
          placeholder="Email Address"
          placeholderTextColor="#7A7585"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, { outlineStyle: "none" } as any]}
          selectionColor="#38BDF8"
        />
      </LinearGradient>

      {/* Contact Number */}
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.06)", "rgba(255, 255, 255, 0.02)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.inputCard}
      >
        <Phone
          size={18}
          color="#A79AF0"
          strokeWidth={2}
          style={styles.inputIcon}
        />
        <TextInput
          value={data.phoneNumber}
          onChangeText={(phoneNumber) => updateData({ phoneNumber })}
          placeholder="Contact Number"
          placeholderTextColor="#7A7585"
          keyboardType="phone-pad"
          style={[styles.input, { outlineStyle: "none" } as any]}
          selectionColor="#38BDF8"
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    gap: 10,
    marginTop: 6,
    marginBottom: 16,
  },
  inputCard: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    height: "100%",
  },
});
