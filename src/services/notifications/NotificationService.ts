import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Push & Local Notifications Architecture
 */
export const notificationPermissionService = {
  async getPermission(): Promise<boolean> {
    if (Platform.OS === "web") return false;
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === "granted";
    } catch {
      return false;
    }
  },

  async requestPermission(): Promise<boolean> {
    if (Platform.OS === "web") return false;
    try {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
      return status === "granted";
    } catch {
      return false;
    }
  },
};

export const notificationService = {
  async configureHandler(): Promise<void> {
    if (Platform.OS === "web") return;
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  },

  async scheduleReminder(title: string, body: string, triggerSeconds: number): Promise<string | null> {
    if (Platform.OS === "web") return null;
    const hasPerm = await notificationPermissionService.getPermission();
    if (!hasPerm) return null;

    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: triggerSeconds,
        repeats: false,
      },
    });
  },

  async cancelScheduled(notificationId: string): Promise<void> {
    if (Platform.OS === "web") return;
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },
};
