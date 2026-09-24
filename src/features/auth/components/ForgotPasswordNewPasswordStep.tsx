import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, Lock, RotateCcw, Zap } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NeonBorderInput } from "./NeonBorderInput";
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

        <Text style={styles.subtitle}>
          Time for a fresh start. Choose a strong one this time!
        </Text>
      </View>

      <NeonBorderInput
        label="NEW PASSWORD"
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="••••••••••••"
        secureTextEntry={!showNewPassword}
        leftIcon={<Lock size={20} color="#2DD4BF" />}
        rightIcon={
          <Pressable
            onPress={() => setShowNewPassword(!showNewPassword)}
            hitSlop={10}
          >
            {showNewPassword ? (
              <EyeOff size={20} color="#2DD4BF" />
            ) : (
              <Eye size={20} color="#2DD4BF" />
            )}
          </Pressable>
        }
      />

      <NeonBorderInput
        label="CONFIRM PASSWORD"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="••••••••••••"
        secureTextEntry={!showConfirmPassword}
        leftIcon={<RotateCcw size={20} color="#2DD4BF" />}
        rightIcon={
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            hitSlop={10}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color="#2DD4BF" />
            ) : (
              <Eye size={20} color="#2DD4BF" />
            )}
          </Pressable>
        }
      />

      <SecurityStrengthBar strength="STRONG" />

      <View style={styles.strengthZapPosition}>
        <Zap size={22} color="#10B981" fill="#10B981" opacity={0.45} />
      </View>

      <View style={styles.actionButtonWrapper}>
        <Pressable
          onPress={onUpdatePassword}
          style={({ pressed }) => [
            styles.fullWidth,
            pressed && styles.buttonPressed,
          ]}
        >
          <LinearGradient
            colors={["#3568A5", "#4B85C4", "#69A6E3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.actionGradient}
          >
            <Text style={styles.actionButtonText}>UPDATE PASSWORD</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <Pressable
        onPress={onCancel}
        style={({ pressed }) => [
          styles.cancelButton,
          pressed && styles.buttonPressed,
        ]}
        hitSlop={12}
      >
        <Text style={styles.cancelText}>CANCEL & RETURN</Text>
      </Pressable>
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
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(34, 211, 238, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 320,
  },
  strengthZapPosition: {
    position: "absolute",
    right: 20,
    top: 338,
    opacity: 0.45,
  },
  actionButtonWrapper: {
    width: "100%",
    height: 54,
    borderRadius: 27,
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
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 2,
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
