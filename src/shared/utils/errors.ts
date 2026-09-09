/**
 * KINETQX Standard Error Hierarchy
 * Provides normalized, user-friendly mobile error structures.
 */

export class AppError extends Error {
  readonly code: string;
  readonly userMessage: string;
  readonly isOperational: boolean;

  constructor(message: string, code = "APP_ERROR", userMessage?: string, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.userMessage = userMessage || message;
    this.isOperational = isOperational;
  }
}

export class ApiError extends AppError {
  readonly statusCode: number;
  readonly data?: unknown;

  constructor(message: string, statusCode = 500, data?: unknown, userMessage?: string) {
    super(
      message,
      `API_ERROR_${statusCode}`,
      userMessage || "Something went wrong communicating with the server. Please try again.",
      true
    );
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class NetworkError extends AppError {
  constructor(message = "Network request failed") {
    super(
      message,
      "NETWORK_ERROR",
      "No internet connection detected. Please check your network and try again.",
      true
    );
  }
}

export class ValidationError extends AppError {
  readonly fieldErrors?: Record<string, string[]>;

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    super(message, "VALIDATION_ERROR", "Please review the form fields and correct any mistakes.", true);
    this.fieldErrors = fieldErrors;
  }
}

export class CameraPermissionError extends AppError {
  constructor(message = "Camera permission not granted") {
    super(
      message,
      "CAMERA_PERMISSION_DENIED",
      "Camera access is required for AI pose tracking and food scanning. Please enable camera access in settings.",
      true
    );
  }
}

export class CameraUnavailableError extends AppError {
  constructor(message = "Camera device unavailable") {
    super(
      message,
      "CAMERA_UNAVAILABLE",
      "Camera hardware is currently unavailable or in use by another app.",
      true
    );
  }
}

export class AIProcessingError extends AppError {
  constructor(message: string, userMessage?: string) {
    super(
      message,
      "AI_PROCESSING_ERROR",
      userMessage || "AI processing could not complete. Please retry in better lighting or reposition.",
      true
    );
  }
}
