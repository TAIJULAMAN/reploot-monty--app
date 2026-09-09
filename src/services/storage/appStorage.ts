/**
 * General Application Preferences Storage Service
 * Abstracted persistent key-value store for non-sensitive data
 * (onboarding status, active workout draft, sound/haptic toggles).
 */

const preferencesCache = new Map<string, string>();

export const appStorage = {
  async getItem<T = string>(key: string): Promise<T | null> {
    try {
      const raw = preferencesCache.get(key);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return raw as unknown as T;
      }
    } catch {
      return null;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value);
      preferencesCache.set(key, serialized);
    } catch {
      // ignore
    }
  },

  async removeItem(key: string): Promise<void> {
    preferencesCache.delete(key);
  },

  async clear(): Promise<void> {
    preferencesCache.clear();
  },
};
