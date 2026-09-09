import { NutritionSummary, HydrationLog } from "@/shared/types/nutrition";

export const mockNutritionSummary: NutritionSummary = {
  consumed: {
    calories: 1800,
    proteinGrams: 145,
    carbsGrams: 210,
    fatGrams: 52,
  },
  target: {
    targetCalories: 2400,
    targetProteinGrams: 180,
    targetCarbsGrams: 250,
    targetFatGrams: 70,
  },
  percentOfDailyGoal: 75,
  date: "2026-03-09",
};

export const mockHydrationLog: HydrationLog = {
  currentLiters: 2.1,
  targetLiters: 3.0,
  percentOfGoal: 70,
  recentAdditionsMl: [250, 500, 750, 600],
  date: "2026-03-09",
};
