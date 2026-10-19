import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff } from "lucide-react-native";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthDarkPillInput } from "./AuthDarkPillInput";
import { SecurityStrengthBar } from "./SecurityStrengthBar";

export interface ForgotPasswordNewPasswordStepProps {
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showNewPassword: boolean;
  setShowNewPassword: (val: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (val: boolean) => void;
  onUpdatePassword: () => void;
  onCancel: () => void;
}

export function ForgotPasswordNewPasswordStep({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onUpdatePassword,
  onCancel,
}: ForgotPasswordNewPasswordStepProps) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>NEW</Text>
        <Text style={styles.heroTitle}>PASSWORD</Text>

        <LinearGradient
          colors={["#FED7AA", "#FFEDD5", "rgba(254, 215, 170, 0)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.todayUnderline}
        />
        <Text style={styles.subtitle}>
          Time for a fresh start. Choose a strong one this time!
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={["#462D24", "#2E2644", "#1B1D38"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <AuthDarkPillInput
              label="NEW PASSWORD"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="••••••••••••"
              secureTextEntry={!showNewPassword}
              rightIcon={
                <Pressable
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  hitSlop={10}
                >
                  {showNewPassword ? (
                    <EyeOff size={19} color="#CBD5E1" />
                  ) : (
                    <Eye size={19} color="#CBD5E1" />
                  )}
                </Pressable>
              }
            />

            <AuthDarkPillInput
              label="CONFIRM PASSWORD"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••••••"
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  hitSlop={10}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} color="#CBD5E1" />
                  ) : (
                    <Eye size={19} color="#CBD5E1" />
                  )}
                </Pressable>
              }
            />

            <View style={styles.strengthContainer}>
              <SecurityStrengthBar strength="STRONG" />
            </View>

            <View style={styles.actionButtonWrapper}>
              <TouchableOpacity
                onPress={onUpdatePassword}
                activeOpacity={0.8}
                style={styles.fullWidth}
              >
                <LinearGradient
                  colors={["#3568A5", "#4B85C4", "#69A6E3"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.actionGradient}
                >
                  <Text style={styles.actionButtonText}>UPDATE PASSWORD</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={onCancel}
              activeOpacity={0.7}
              style={styles.cancelButton}
              hitSlop={12}
            >
              <Text style={styles.cancelText}>CANCEL & RETURN</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  heroSection: {
    position: "relative",
    marginBottom: 32,
    paddingLeft: 2,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(34, 211, 238, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  todayUnderline: {
    width: 96,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
    marginLeft: 2,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 320,
  },
  cardContainer: {
    position: "relative",
    width: "100%",
  },
  cardWrapper: {
    borderRadius: 32,
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
  strengthContainer: {
    marginBottom: 24,
  },
  actionButtonWrapper: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%",
    height: "100%",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  actionGradient: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    paddingVertical: 8,
  },
  cancelText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
});
