import { z } from "zod";

export const profileStep1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.string().min(7, "Valid contact number is required"),
  gender: z.enum(["male", "female", "other"]),
  age: z.number().min(12).max(100),
});

export const profileStep2Schema = z.object({
  heightCm: z.number().min(100).max(250),
  weightKg: z.number().min(30).max(300),
  activityLevel: z.enum(["beginner", "moderately_active", "very_active"]),
});

export const profileStep3Schema = z.object({
  primaryGoal: z.enum([
    "lose_weight",
    "build_muscle",
    "stay_fit",
    "gain_strength",
    "improve_endurance",
    "improve_flexibility",
  ]),
});

export const profileStep4Schema = z.object({
  workoutStyle: z.enum(["gym", "home"]),
  workoutDaysPerWeek: z.number().min(2).max(7),
});
