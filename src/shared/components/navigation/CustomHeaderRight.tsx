import { Image } from "expo-image";
import { Bell, Search } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface CustomHeaderRightProps {
  rightContent?: React.ReactNode;
  showSearch: boolean;
  handleSearchPress: () => void;
  showNotifications: boolean;
  handleNotificationsPress: () => void;
  hasUnreadNotifications: boolean;
  showAvatar: boolean;
  handleAvatarPress: () => void;
  activeAvatar: any;
}

export const CustomHeaderRight = ({
  rightContent,
  showSearch,
  handleSearchPress,
  showNotifications,
  handleNotificationsPress,
  hasUnreadNotifications,
  showAvatar,
  handleAvatarPress,
  activeAvatar,
}: CustomHeaderRightProps) => {
  if (rightContent) return <>{rightContent}</>;

  return (
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
  );
};

const styles = StyleSheet.create({
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
