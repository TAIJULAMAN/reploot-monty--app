import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Secure Storage Service
 * Encapsulates Keychain (iOS) and Keystore (Android) access via expo-secure-store.
 * Fallback to memory on web/unsupported environments.
 */

const memoryStore = new Map<string, string>();

export const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return memoryStore.get(key) || null;
      }
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        memoryStore.set(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
      });
    } catch {
      memoryStore.set(key, value);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        memoryStore.delete(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch {
      memoryStore.delete(key);
    }
  },

  // Sensitive Auth Tokens convenience helpers
  async getAuthToken(): Promise<string | null> {
    return this.getItem("kinetqx_auth_token");
  },

  async setAuthToken(token: string): Promise<void> {
    return this.setItem("kinetqx_auth_token", token);
  },

  async getRefreshToken(): Promise<string | null> {
    return this.getItem("kinetqx_refresh_token");
  },

  async setRefreshToken(token: string): Promise<void> {
    return this.setItem("kinetqx_refresh_token", token);
  },

  async clearAuthTokens(): Promise<void> {
    await Promise.all([
      this.removeItem("kinetqx_auth_token"),
      this.removeItem("kinetqx_refresh_token"),
    ]);
  },
};
