import { useAuthStore } from "@/stores/authStore";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowLeft, Bell, Search } from "lucide-react-native";
import React from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const defaultAvatarUri = require("../../../../assets/avatar/a2.avif");

export interface CustomHeaderProps {
  title?: string;
  titleVariant?: "logo" | "text";
  showBackButton?: boolean;
  onPressBack?: () => void;
  onPressLogo?: () => void;
  showSearch?: boolean;
  onPressSearch?: () => void;
  showNotifications?: boolean;
  hasUnreadNotifications?: boolean;
  onPressNotifications?: () => void;
  showAvatar?: boolean;
  avatarUri?: string;
  onPressAvatar?: () => void;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  showBorderBottom?: boolean;
  transparent?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = "KINETQX",
  titleVariant,
  showBackButton = false,
  onPressBack,
  onPressLogo,
  showSearch = true,
  onPressSearch,
  showNotifications = true,
  hasUnreadNotifications = true,
  onPressNotifications,
  showAvatar = true,
  avatarUri,
  onPressAvatar,
  leftContent,
  rightContent,
  showBorderBottom = false,
  transparent = false,
  style,
  testID,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const resolvedVariant = titleVariant ?? (showBackButton ? "text" : "logo");

  const handleBackPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onPressBack) {
      onPressBack();
      return;
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleLogoPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onPressLogo) {
      onPressLogo();
      return;
    }
    router.replace("/(tabs)/home");
  };

  const handleSearchPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPressSearch?.();
  };

  const handleNotificationsPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onPressNotifications) {
      onPressNotifications();
    } else {
      router.push("/notifications");
    }
  };

  const handleAvatarPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (onPressAvatar) {
      onPressAvatar();
    } else {
      router.push("/(tabs)/profile");
    }
  };

  const activeAvatar =
    avatarUri || (user as any)?.avatarUrl || defaultAvatarUri;

  return (
    <View
      style={[
        styles.navBar,
        { paddingTop: Math.max(insets.top, 16) },
        transparent && styles.navBarTransparent,
        showBorderBottom && styles.navBarBorderBottom,
        style,
      ]}
      testID={testID}
    >
      <View style={styles.navBarInner}>
        {/* Left Section */}
        {leftContent ? (
          leftContent
        ) : showBackButton ? (
          <View style={styles.leftRow}>
            <Pressable
              onPress={handleBackPress}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressedOpacity,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={20} color="#FFFFFF" />
            </Pressable>
            {title && title !== "KINETQX" && (
              <Text style={styles.pageTitle}>{title}</Text>
            )}
          </View>
        ) : (
          <Pressable
            onPress={handleLogoPress}
            style={({ pressed }) => [
              styles.logoWrapper,
              pressed && styles.pressedOpacity,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Go to home"
          >
            {resolvedVariant === "logo" ? (
              <Image
                source={require("../../../../assets/logo.png")}
                style={styles.logoImage}
                contentFit="contain"
              />
            ) : (
              <Text style={styles.pageTitle}>{title}</Text>
            )}
          </Pressable>
        )}

        {/* Right Section */}
        {rightContent ? (
          rightContent
        ) : (
          <View style={styles.headerRightRow}>
            {showSearch && (
              <Pressable
                onPress={handleSearchPress}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.pressedOpacity,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Search"
              >
                <Search size={21} color="#C4C9D6" />
              </Pressable>
            )}

            {showNotifications && (
              <Pressable
                onPress={handleNotificationsPress}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.pressedOpacity,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Notifications"
              >
                <Bell size={21} color="#C4C9D6" />
                {hasUnreadNotifications && (
                  <View style={styles.notificationDot} />
                )}
              </Pressable>
            )}

            {showAvatar && (
              <Pressable
                onPress={handleAvatarPress}
                style={({ pressed }) => [
                  styles.avatarContainer,
                  pressed && styles.pressedOpacity,
                ]}
                accessibilityRole="button"
                accessibilityLabel="User profile"
              >
                <Image
                  source={
                    typeof activeAvatar === "string"
                      ? { uri: activeAvatar }
                      : activeAvatar
                  }
                  style={styles.avatarImage}
                  contentFit="cover"
                  transition={150}
                />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export const AppHeader = CustomHeader;
export const WorkoutHeader = CustomHeader;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#070A11",
    zIndex: 10,
  },
  navBarTransparent: {
    backgroundColor: "transparent",
  },
  navBarBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  navBarInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#161922",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    height: 24,
    width: 120, // Adjust this based on actual aspect ratio
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  headerRightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#44EAC3",
  },
  avatarContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "#44EAC3",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  pressedOpacity: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
