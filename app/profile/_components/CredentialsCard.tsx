import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CredentialsCardProps {
  onPasswordUpdated?: () => void;
}

export function CredentialsCard({ onPasswordUpdated }: CredentialsCardProps = {}) {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  const openPasswordModal = () => {
    triggerHaptic();
    setPasswordModalVisible(true);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.rowInfo}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <Text style={styles.valueText}>alex.rivers@kinetqx.app</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardRow}>
        <View style={styles.rowInfo}>
          <Text style={styles.label}>PASSWORD ENCRYPTION</Text>
          <View style={styles.passwordDots}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <View key={i} style={styles.dot} />
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.75}
          onPress={openPasswordModal}
        >
          <Text style={styles.actionBtnText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
      {/* Password Modal */}
      <Modal
        visible={passwordModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>UPDATE PASSWORD</Text>
            <Text style={styles.modalSubtitle}>
              Requires current credential authentication.
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Current password"
              placeholderTextColor="#64748B"
              secureTextEntry
            />
            <TextInput
              style={[styles.modalInput, { marginTop: 12 }]}
              placeholder="New password (min. 8 characters)"
              placeholderTextColor="#64748B"
              secureTextEntry
            />
            <TextInput
              style={[styles.modalInput, { marginTop: 12 }]}
              placeholder="Confirm new password"
              placeholderTextColor="#64748B"
              secureTextEntry
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setPasswordModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={() => {
                  triggerHaptic();
                  setPasswordModalVisible(false);
                  if (onPasswordUpdated) {
                    onPasswordUpdated();
                  }
                }}
              >
                <Text style={styles.modalSaveText}>UPDATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowInfo: {
    flex: 1,
  },
  label: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  valueText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  passwordDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#38BDF8",
  },
  actionBtn: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  actionBtnText: {
    color: "#38BDF8",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    marginVertical: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#0D111D",
    width: "100%",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.25)",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 4,
  },
  modalSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    color: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    fontFamily: "monospace",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 22,
    gap: 12,
  },
  modalCancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
  },
  modalCancelText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 1,
  },
  modalSaveBtn: {
    backgroundColor: "#0284C7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  modalSaveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
});
