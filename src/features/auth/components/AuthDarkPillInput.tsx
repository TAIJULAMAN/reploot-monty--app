import React, { useState } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  ViewStyle,
  Platform,
} from "react-native";

export interface AuthDarkPillInputProps extends RNTextInputProps {
  label: string;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const AuthDarkPillInput: React.FC<AuthDarkPillInputProps> = ({
  label,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor="#64748B"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#38BDF8"
          {...props}
        />

        {rightIcon && <View style={styles.rightIconWrapper}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#131522",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    height: 52,
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    borderColor: "rgba(56, 189, 248, 0.5)",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "500",
    height: "100%",
    paddingVertical: 0,
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
      android: {
        textAlignVertical: "center",
        includeFontPadding: false,
      },
    }),
  },
  rightIconWrapper: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
