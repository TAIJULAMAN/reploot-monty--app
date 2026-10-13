/**
 * REPLOOTAI Workout Pose Tracking Boundaries
 * Decoupled provider-agnostic interfaces for real-time skeletal analysis.
 */

export interface PoseLandmark {
  index: number;
  name: string;
  x: number; // Normalized 0-1
  y: number; // Normalized 0-1
  z?: number;
  visibility: number; // Confidence 0-1
}

export interface PoseFrameResult {
  frameId: number;
  timestampMs: number;
  landmarks: PoseLandmark[];
  isBodyFullyVisible: boolean;
  distanceEstimatedMeters?: number;
}

export type FormFeedbackType = "optimal" | "warning" | "corrective";

export interface FormFeedback {
  type: FormFeedbackType;
  message: string;
  targetedJoint?: string;
  correctionAngle?: number;
}

export interface RepCountingResult {
  currentRepCount: number;
  targetReps: number;
  currentAccuracyScore: number;
  isRepValid: boolean;
  activePhase: "concentric" | "eccentric" | "isometric" | "resting";
  feedback?: FormFeedback;
}

/**
 * Replaceable Pose Tracking Provider Interface
 * Future implementations can be:
 * - MediaPipe
 * - TensorFlow Lite
 * - ONNX Runtime
 * - Native C++ Module
 * - WebSocket Server Stream
 */
export interface PoseTrackingProvider {
  initialize(exerciseId: string): Promise<void>;
  processFrame(frameData: unknown): Promise<PoseFrameResult>;
  analyzeRep(landmarks: PoseLandmark[]): Promise<RepCountingResult>;
  reset(): void;
  destroy(): void;
}
