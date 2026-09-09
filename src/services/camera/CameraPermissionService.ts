import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { CameraPermissionError } from "@/shared/utils/errors";

/**
 * Camera & Media Permission Service
 * Single point of truth for hardware permissions across Workout Tracking and Food Scanning.
 */
export const cameraPermissionService = {
  async getCameraPermission(): Promise<boolean> {
    try {
      const { status } = await Camera.getCameraPermissionsAsync();
      return status === "granted";
    } catch {
      return false;
    }
  },

  async requestCameraPermission(): Promise<boolean> {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        throw new CameraPermissionError();
      }
      return true;
    } catch (error) {
      if (error instanceof CameraPermissionError) throw error;
      throw new CameraPermissionError((error as Error).message);
    }
  },

  async requestMediaLibraryPermission(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    } catch {
      return false;
    }
  },

  async pickImageFromGallery(): Promise<string | null> {
    const hasPerm = await this.requestMediaLibraryPermission();
    if (!hasPerm) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    return result.assets[0].uri;
  },
};
