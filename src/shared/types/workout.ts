/**
 * KINETQX Workout Domain Models
 * Unified architecture for Gym, Home, and AI-Tracked Workouts.
 */

export type WorkoutEnvironment = "gym" | "home" | "hybrid";

export type ExerciseCategory =
  | "chest"
  | "back"
  | "shoulders"
  | "legs"
  | "arms"
  | "core"
  | "cardio"
  | "full_body"
  | "mobility";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "elite";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  targetMuscles: string[];
  equipmentRequired: string[];
  difficulty: DifficultyLevel;
  caloriesBurnedPerMin: number;
  instructions: string[];
  demoVideoUrl?: string;
  thumbnailUrl?: string;
  supportsAiTracking: boolean;
}

export interface WorkoutSet {
  setNumber: number;
  targetReps: number;
  completedReps?: number;
  weightKg?: number;
  isCompleted: boolean;
  accuracyScore?: number; // 0 to 100%
  restSecondsAfter?: number;
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  order: number;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  title: string;
  subtitle?: string;
  environment: WorkoutEnvironment;
  category: ExerciseCategory;
  difficulty: DifficultyLevel;
  estimatedDurationMin: number;
  estimatedCalories: number;
  xpReward: number;
  exercises: WorkoutExercise[];
  isAiGenerated?: boolean;
  imageUrl?: string;
}

export type WorkoutSessionState =
  | "idle"
  | "permissions"
  | "positioning"
  | "bodyDetected"
  | "ready"
  | "countdown"
  | "active"
  | "paused"
  | "resting"
  | "exerciseTransition"
  | "completed"
  | "error";

export interface WorkoutSession {
  id: string;
  workoutId: string;
  workoutTitle: string;
  state: WorkoutSessionState;
  currentExerciseIndex: number;
  currentSetIndex: number;
  elapsedSeconds: number;
  restRemainingSeconds: number;
  totalCaloriesBurned: number;
  totalRepsCompleted: number;
  currentAccuracyScore: number;
  startedAt: string;
}

export interface WorkoutSummary {
  id: string;
  sessionId: string;
  workoutTitle: string;
  durationSeconds: number;
  caloriesBurned: number;
  xpEarned: number;
  averageAccuracyScore: number;
  totalReps: number;
  completedExercisesCount: number;
  aiCoachFeedback: string;
  personalBestsAchieved: string[];
  completedAt: string;
}
