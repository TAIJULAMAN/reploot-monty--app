/**
 * REPLOOTCamera Service Types & State Machine
 */

export type CameraFacing = "front" | "back";

export type CameraStatus =
  | "idle"
  | "requestingPermission"
  | "permissionDenied"
  | "permissionGranted"
  | "initializing"
  | "ready"
  | "active"
  | "paused"
  | "error";

export interface CameraDeviceState {
  status: CameraStatus;
  facing: CameraFacing;
  isTorchOn: boolean;
  isRecording: boolean;
  errorMessage?: string;
}

export interface CameraCaptureResult {
  uri: string;
  width: number;
  height: number;
  base64?: string;
}

export interface ICameraService {
  requestPermission(): Promise<boolean>;
  hasPermission(): Promise<boolean>;
  switchCamera(): void;
  setTorch(enabled: boolean): void;
  capturePhoto(): Promise<CameraCaptureResult>;
  cleanup(): void;
}
