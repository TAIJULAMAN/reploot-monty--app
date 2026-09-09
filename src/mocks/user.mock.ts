import { User, FitnessProfile } from "@/shared/types/user";

export const mockUser: User = {
  id: "usr_kinetqx_001",
  email: "alex@kinetqx.ai",
  fullName: "Alex Sterling",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  phoneNumber: "+1 555-0199",
  createdAt: "2026-01-01T08:00:00.000Z",
  hasCompletedOnboarding: true,
};

export const mockFitnessProfile: FitnessProfile = {
  userId: "usr_kinetqx_001",
  gender: "male",
  age: 24,
  heightCm: 180,
  weightKg: 95,
  activityLevel: "moderately_active",
  primaryGoal: "build_muscle",
  workoutStyle: "gym",
  workoutDaysPerWeek: 4,
  targetWeightKg: 90,
  updatedAt: "2026-03-01T12:00:00.000Z",
};
