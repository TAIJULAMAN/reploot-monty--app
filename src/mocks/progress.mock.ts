import { XPProgress, ProgressReport } from "@/shared/types/progress";

export const mockXPProgress: XPProgress = {
  currentLevel: 42,
  currentXP: 2450,
  nextLevelXP: 3000,
  tier: "Elite",
  dayStreak: 12,
  totalWorkoutsCompleted: 68,
};

export const mockProgressReport: ProgressReport = {
  period: "weekly",
  totalWorkouts: 5,
  totalDurationMinutes: 215,
  totalCaloriesBurned: 1980,
  averageAccuracyPercent: 93,
  aiInsights: [
    "Your squat depth consistency improved by 14% this week.",
    "Optimal recovery detected: Friday rest day preserved high power output.",
  ],
  daysActivity: [
    { dayLabel: "M", activeMinutes: 45, completionPercent: 100 },
    { dayLabel: "T", activeMinutes: 50, completionPercent: 100 },
    { dayLabel: "W", activeMinutes: 60, completionPercent: 100 },
    { dayLabel: "T", activeMinutes: 40, completionPercent: 85 },
    { dayLabel: "F", activeMinutes: 0, completionPercent: 0 },
    { dayLabel: "S", activeMinutes: 45, completionPercent: 90 },
    { dayLabel: "S", activeMinutes: 0, completionPercent: 0 },
  ],
};
