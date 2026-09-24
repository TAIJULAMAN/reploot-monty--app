import React from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  ViewStyle,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export interface NeonBorderInputProps extends RNTextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const NeonBorderInput: React.FC<NeonBorderInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Outer Gradient Border */}
      <LinearGradient
        colors={["#8B5CF6", "#38BDF8", "#10B981"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        {/* Inner Dark Surface */}
        <View style={styles.innerContainer}>
          {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}

          <RNTextInput
            style={[styles.input, style]}
            placeholderTextColor="#64748B"
            selectionColor="#38BDF8"
            {...props}
          />

          {rightIcon && <View style={styles.rightIconWrapper}>{rightIcon}</View>}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: 4,
  },
  gradientBorder: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    padding: 1.5,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#0C0F17",
    borderRadius: 28.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  leftIconWrapper: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rightIconWrapper: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
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
});
