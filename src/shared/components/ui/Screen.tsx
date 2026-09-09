import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { colors } from "@/theme/colors";

export interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  keyboardAvoid?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  statusBarColor?: "dark" | "light";
  statusBarStyle?: "light" | "dark";
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = false,
  padded = true,
  keyboardAvoid = true,
  style,
  contentContainerStyle,
  statusBarStyle = "light",
}) => {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  };

  const innerStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: padded ? 20 : 0,
  };

  const content = scrollable ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        innerStyle,
        { flexGrow: 1, paddingBottom: 24 },
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[innerStyle, contentContainerStyle]}>{children}</View>
  );

  return (
    <View style={[containerStyle, style]}>
      <ExpoStatusBar style={statusBarStyle} />
      {keyboardAvoid && Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );
};
