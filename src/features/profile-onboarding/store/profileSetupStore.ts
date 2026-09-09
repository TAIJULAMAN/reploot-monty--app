import { create } from "zustand";
import { Gender, ActivityLevel, FitnessGoal, WorkoutStyle } from "@/shared/types/user";

export interface ProfileSetupData {
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUri?: string;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  primaryGoal: FitnessGoal;
  workoutStyle: WorkoutStyle;
  workoutDaysPerWeek: number;
}

interface ProfileSetupState {
  currentStep: number; // 1 to 5
  totalSteps: number;
  data: ProfileSetupData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (fields: Partial<ProfileSetupData>) => void;
  reset: () => void;
}

const initialData: ProfileSetupData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  gender: "male",
  age: 24,
  heightCm: 180,
  weightKg: 95,
  activityLevel: "moderately_active",
  primaryGoal: "build_muscle",
  workoutStyle: "gym",
  workoutDaysPerWeek: 3,
};

export const useProfileSetupStore = create<ProfileSetupState>((set, get) => ({
  currentStep: 1,
  totalSteps: 5,
  data: initialData,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps) {
      set({ currentStep: currentStep + 1 });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },
  updateData: (fields) =>
    set((state) => ({
      data: { ...state.data, ...fields },
    })),
  reset: () => set({ currentStep: 1, data: initialData }),
}));
