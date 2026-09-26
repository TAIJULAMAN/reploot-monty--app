import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from "react-native";

export function CredentialsCard() {
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.rowInfo}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <Text style={styles.valueText}>alex.vortex@kinetic.ai</Text>
        </View>
        <Pressable style={styles.actionBtn} onPress={() => setEmailModalVisible(true)}>
          <Text style={styles.actionBtnText}>CHANGE</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardRow}>
        <View style={styles.rowInfo}>
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordDots}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={styles.dot} />
            ))}
          </View>
        </View>
        <Pressable style={styles.actionBtn} onPress={() => setPasswordModalVisible(true)}>
          <Text style={styles.actionBtnText}>UPDATE</Text>
        </Pressable>
      </View>

      {/* Email Modal */}
      <Modal visible={emailModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Email</Text>
            <TextInput 
              style={styles.modalInput} 
              placeholder="New Email Address" 
              placeholderTextColor="#94A3B8" 
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setEmailModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={() => setEmailModalVisible(false)}>
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Password Modal */}
      <Modal visible={passwordModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Password</Text>
            <TextInput 
              style={styles.modalInput} 
              placeholder="Email Address" 
              placeholderTextColor="#94A3B8" 
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput 
              style={[styles.modalInput, { marginTop: 12 }]} 
              placeholder="Current Password" 
              placeholderTextColor="#94A3B8" 
              secureTextEntry 
            />
            <TextInput 
              style={[styles.modalInput, { marginTop: 12 }]} 
              placeholder="New Password" 
              placeholderTextColor="#94A3B8" 
              secureTextEntry 
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.modalSaveText}>Save</Text>
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
    backgroundColor: "#161722",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  valueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  passwordDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#38EDD8",
  },
  actionBtn: {
    backgroundColor: "rgba(45, 212, 191, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnText: {
    color: "#2DD4BF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#161722",
    width: "100%",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: "#0B0D14",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    color: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
    gap: 12,
  },
  modalCancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalCancelText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  modalSaveBtn: {
    backgroundColor: "#38EDD8",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalSaveText: {
    color: "#0B0D14",
    fontSize: 14,
    fontWeight: "700",
  },
});
