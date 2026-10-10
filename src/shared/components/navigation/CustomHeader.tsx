import { useAppSelector } from "@/store/hooks";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomHeaderLeft } from "./CustomHeaderLeft";
import { CustomHeaderRight } from "./CustomHeaderRight";

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
  const user = useAppSelector((state) => state.auth.user);

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
        <CustomHeaderLeft
          leftContent={leftContent}
          showBackButton={showBackButton}
          handleBackPress={handleBackPress}
          title={title}
          resolvedVariant={resolvedVariant}
          handleLogoPress={handleLogoPress}
        />
        <CustomHeaderRight
          rightContent={rightContent}
          showSearch={showSearch}
          handleSearchPress={handleSearchPress}
          showNotifications={showNotifications}
          handleNotificationsPress={handleNotificationsPress}
          hasUnreadNotifications={hasUnreadNotifications}
          showAvatar={showAvatar}
          handleAvatarPress={handleAvatarPress}
          activeAvatar={activeAvatar}
        />
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
});
