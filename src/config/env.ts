/**
 * REPLOOTEnvironment Configuration
 * Type-safe access to EXPO_PUBLIC_* configuration variables.
 */

export interface AppEnvConfig {
  apiBaseUrl: string;
  appEnv: "development" | "staging" | "production";
  enableMockApi: boolean;
  enableAiTracking: boolean;
  appVersion: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const appEnv = (process.env.EXPO_PUBLIC_APP_ENV ||
  "development") as AppEnvConfig["appEnv"];

export const env: AppEnvConfig = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL || "https://api.kinetqx.com/v1",
  appEnv,
  enableMockApi:
    process.env.EXPO_PUBLIC_ENABLE_MOCK_API === "true" ||
    appEnv === "development",
  enableAiTracking: process.env.EXPO_PUBLIC_ENABLE_AI_TRACKING === "true",
  appVersion: process.env.EXPO_PUBLIC_APP_VERSION || "1.0.0",
  isDevelopment: appEnv === "development",
  isProduction: appEnv === "production",
};
