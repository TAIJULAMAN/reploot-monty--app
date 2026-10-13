/**
 * REPLOOTProgress, Gamification & Analytics Domain Models
 */

export interface XPProgress {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
  tier: "Bronze" | "Silver" | "Gold" | "Elite" | "Master";
  dayStreak: number;
  totalWorkoutsCompleted: number;
}

export interface WeightEntry {
  id: string;
  weightKg: number;
  date: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "streak" | "workout" | "accuracy" | "nutrition" | "level";
  isUnlocked: boolean;
  unlockedAt?: string;
  iconName: string;
  xpReward: number;
  progressPercent: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  tier: string;
  weeklyXP: number;
  isCurrentUser: boolean;
}

export interface ProgressReport {
  period: "daily" | "weekly" | "monthly";
  totalWorkouts: number;
  totalDurationMinutes: number;
  totalCaloriesBurned: number;
  averageAccuracyPercent: number;
  aiInsights: string[];
  daysActivity: {
    dayLabel: "M" | "T" | "W" | "T" | "F" | "S" | "S";
    activeMinutes: number;
    completionPercent: number;
  }[];
}
