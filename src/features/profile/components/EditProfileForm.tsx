import * as Haptics from "expo-haptics";
import { ChevronDown, Mail, Phone, User } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const EditProfileForm = () => {
  const [fullName, setFullName] = useState("Alex Rivers");
  const [email, setEmail] = useState("alex.rivers@kinetic-ai.io");
  const [phone, setPhone] = useState("+1 (555) 092-8831");
  const [dob, setDob] = useState("05/12/1998");
  const [gender, setGender] = useState("Male");
  const [showGenderSelect, setShowGenderSelect] = useState(false);

  return (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>FULL NAME</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#64748B"
          />
          <User size={18} color="#38BDF8" />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#64748B"
          />
          <Mail size={18} color="#38BDF8" />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>PHONE NUMBER</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#64748B"
          />
          <Phone size={18} color="#38BDF8" />
        </View>
      </View>

      <View style={styles.rowGroup}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
          <Text style={styles.inputLabel}>DOB</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={dob}
              onChangeText={setDob}
              placeholderTextColor="#64748B"
            />
          </View>
        </View>
        <View style={[styles.formGroup, { flex: 1, zIndex: 10 }]}>
          <Text style={styles.inputLabel}>GENDER</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            activeOpacity={0.7}
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              }
              setShowGenderSelect(!showGenderSelect);
            }}
          >
            <Text style={[styles.input, { color: "#FFFFFF", lineHeight: 20 }]}>
              {gender}
            </Text>
            <ChevronDown size={18} color="#38BDF8" />
          </TouchableOpacity>

          {showGenderSelect && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS !== "web") {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  }
                  setGender("Male");
                  setShowGenderSelect(false);
                }}
                activeOpacity={0.7}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>Male</Text>
              </TouchableOpacity>
              <View style={styles.dropdownDivider} />
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS !== "web") {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  }
                  setGender("Female");
                  setShowGenderSelect(false);
                }}
                activeOpacity={0.7}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>Female</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 4,
  },
  formGroup: {
    marginBottom: 16,
  },
  rowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
    ...(Platform.OS === "android" ? { elevation: 10 } : {}),
  },
  inputLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1.2,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.2)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "monospace",
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  } as any,
  dropdownMenu: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: "#11141C",
    borderRadius: 16,
    padding: 8,
    zIndex: 20,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  dropdownText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 4,
  },
});
