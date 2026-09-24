import React, { useState } from "react";
import {
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export interface AuthPillInputProps extends RNTextInputProps {
  label: string;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const AuthPillInput: React.FC<AuthPillInputProps> = ({
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
          placeholderTextColor="#94A3B8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#0284C7"
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
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    height: 52,
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    color: "#0F172A",
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
