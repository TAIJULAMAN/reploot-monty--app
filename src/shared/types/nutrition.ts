/**
 * KINETQX Nutrition & Macro Domain Models
 * Derived from Precision Nutrition and AI Food Scanner Figma designs.
 */

export interface MacroNutrients {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface MacroTarget {
  targetCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  targetFatGrams: number;
}

export interface NutritionSummary {
  consumed: MacroNutrients;
  target: MacroTarget;
  percentOfDailyGoal: number;
  date: string;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface MealItem {
  id: string;
  name: string;
  servingSize: string;
  quantity: number;
  macros: MacroNutrients;
}

export interface Meal {
  id: string;
  name: string;
  mealType: MealType;
  items: MealItem[];
  totalMacros: MacroNutrients;
  loggedAt: string;
  imageUrl?: string;
  isAiScanned?: boolean;
}

export interface HydrationLog {
  currentLiters: number;
  targetLiters: number;
  percentOfGoal: number;
  recentAdditionsMl: number[];
  date: string;
}

export interface MealPlanMeal {
  id: string;
  title: string;
  mealType: MealType;
  suggestedCalories: number;
  description: string;
  ingredients: string[];
}

export interface MealPlan {
  id: string;
  date: string;
  meals: MealPlanMeal[];
  targetCalories: number;
  aiRecommendationNotes?: string;
}
