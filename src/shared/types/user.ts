/**
 * REPLOOTUser & Profile Domain Models
 * Derived from Authentication and Profile Onboarding Figma specifications.
 */

export type Gender = "male" | "female" | "other";

export type ActivityLevel = "beginner" | "moderately_active" | "very_active";

export type FitnessGoal =
  | "lose_weight"
  | "build_muscle"
  | "stay_fit"
  | "gain_strength"
  | "improve_endurance"
  | "improve_flexibility";

export type WorkoutStyle = "gym" | "home";

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt: string;
  hasCompletedOnboarding: boolean;
}

export interface FitnessProfile {
  userId: string;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  primaryGoal: FitnessGoal;
  workoutStyle: WorkoutStyle;
  workoutDaysPerWeek: number; // 2 to 7
  targetWeightKg?: number;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: "free" | "premium";
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}
