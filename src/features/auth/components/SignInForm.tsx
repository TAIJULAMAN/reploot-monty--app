import { LinearGradient } from "expo-linear-gradient";
import { AtSign, Lock } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppleIcon } from "./AppleIcon";
import { AuthPillInput } from "./AuthPillInput";
import { GoogleIcon } from "./GoogleIcon";

export interface SignInFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
}

export function SignInForm({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onForgotPassword,
  onGoogleLogin,
  onAppleLogin,
}: SignInFormProps) {
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={["#322B60", "#22374E", "#134648"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <AuthPillInput
          label="EMAIL ADDRESS"
          value={email}
          onChangeText={setEmail}
          placeholder="runner@kinetic.ai"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          rightIcon={<AtSign size={19} color="#94A3B8" />}
        />

        <AuthPillInput
          label="PASSWORD"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          rightIcon={<Lock size={19} color="#94A3B8" />}
          containerStyle={styles.passwordField}
        />

        <View style={styles.forgotPasswordContainer}>
          <Pressable
            onPress={onForgotPassword}
            style={({ pressed }) => [pressed && styles.buttonPressed]}
            hitSlop={10}
          >
            <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
          </Pressable>
        </View>

        <View style={styles.continueWrapper}>
          <Pressable
            onPress={onLogin}
            unstable_pressDelay={0}
            hitSlop={6}
            style={({ pressed }) => [
              styles.fullWidth,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={["#00f2fe", "#4facfe"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtonWrapper}>
          <Pressable
            onPress={onGoogleLogin}
            style={({ pressed }) => [
              styles.fullWidth,
              pressed && styles.buttonPressed,
            ]}
          >
            <View style={styles.socialButtonContainer}>
              <View style={styles.socialIconBox}>
                <GoogleIcon size={18} />
              </View>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.appleButtonWrapper}>
          <Pressable
            onPress={onAppleLogin}
            style={({ pressed }) => [
              styles.fullWidth,
              pressed && styles.buttonPressed,
            ]}
          >
            <View style={styles.socialButtonContainer}>
              <View style={styles.socialIconBox}>
                <AppleIcon size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 32,
    marginTop: 12,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 8,
  },
  cardGradient: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 28,
  },
  passwordField: {
    marginTop: 2,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 22,
  },
  forgotPasswordText: {
    color: "#FF7700",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  continueWrapper: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 22,
    shadowColor: "#00f2fe",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  continueGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#11131E",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  dividerText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginHorizontal: 16,
  },
  socialButtonWrapper: {
    width: "100%",
    height: 52,
    marginBottom: 14,
  },
  appleButtonWrapper: {
    width: "100%",
    height: 52,
    marginBottom: 0,
  },
  socialButtonContainer: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.22)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIconBox: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  fullWidth: {
    width: "100%",
    height: "100%",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
