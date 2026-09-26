import { ChevronDown, Mail, Phone, User } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export const EditProfileForm = () => {
  const [fullName, setFullName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex.rivera@kinetic-ai.io");
  const [phone, setPhone] = useState("+1 (555) 092-8831");
  const [dob, setDob] = useState("05/12/1998");
  const [gender, setGender] = useState("Male");
  const [showGenderSelect, setShowGenderSelect] = useState(false);

  return (
    <View>
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>FULL NAME</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#94A3B8"
          />
          <User size={18} color="#64748B" />
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
            placeholderTextColor="#94A3B8"
          />
          <Mail size={18} color="#64748B" />
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
            placeholderTextColor="#94A3B8"
          />
          <Phone size={18} color="#64748B" />
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
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>
        <View style={[styles.formGroup, { flex: 1, zIndex: 10 }]}>
          <Text style={styles.inputLabel}>GENDER</Text>
          <Pressable
            style={[styles.inputWrapper, { backgroundColor: "#1C1F2E" }]}
            onPress={() => setShowGenderSelect(!showGenderSelect)}
          >
            <Text style={[styles.input, { color: "#FFFFFF", lineHeight: 20 }]}>
              {gender}
            </Text>
            <ChevronDown size={18} color="#64748B" />
          </Pressable>

          {showGenderSelect && (
            <View style={styles.dropdownMenu}>
              <Pressable
                onPress={() => {
                  setGender("Male");
                  setShowGenderSelect(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>Male</Text>
              </Pressable>
              <View style={styles.dropdownDivider} />
              <Pressable
                onPress={() => {
                  setGender("Female");
                  setShowGenderSelect(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>Female</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 20,
  },
  rowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
    ...(Platform.OS === "android" ? { elevation: 10 } : {}),
  },
  inputLabel: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "600",
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  } as any,
  dropdownMenu: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: "#1C1F2E",
    borderRadius: 16,
    padding: 8,
    zIndex: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  dropdownText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 4,
  },
});
