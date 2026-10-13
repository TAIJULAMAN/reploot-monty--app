import { MacroNutrients } from "@/shared/types/nutrition";

/**
 * REPLOOTAI Food Scanner Integration Boundaries
 */

export interface DetectedFoodItem {
  id: string;
  name: string;
  confidence: number; // 0 to 1
  estimatedGrams: number;
  macros: MacroNutrients;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface MealAnalysisResult {
  scanId: string;
  imageUrl: string;
  detectedFoods: DetectedFoodItem[];
  totalEstimatedMacros: MacroNutrients;
  confidenceScore: number;
  dietaryTags: string[];
  healthScore?: number;
  processedAt: string;
}

/**
 * Replaceable Food Recognition Provider Interface
 */
export interface FoodRecognitionProvider {
  analyzeImage(imageUri: string): Promise<MealAnalysisResult>;
  refinePortion(
    scanId: string,
    foodItemId: string,
    newGrams: number,
  ): Promise<MealAnalysisResult>;
}
