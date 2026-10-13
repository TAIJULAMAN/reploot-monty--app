/**
 * Centralized React Query Key Factory
 * Ensures consistent cache keys and invalidation across all REPLOOTfeatures.
 */

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },
  profile: {
    all: ["profile"] as const,
    me: () => [...queryKeys.profile.all, "me"] as const,
    fitnessProfile: () => [...queryKeys.profile.all, "fitness"] as const,
    settings: () => [...queryKeys.profile.all, "settings"] as const,
    subscription: () => [...queryKeys.profile.all, "subscription"] as const,
  },
  workouts: {
    all: ["workouts"] as const,
    today: () => [...queryKeys.workouts.all, "today"] as const,
    path: (type: "gym" | "home") =>
      [...queryKeys.workouts.all, "path", type] as const,
    library: (filters?: Record<string, unknown>) =>
      [...queryKeys.workouts.all, "library", filters] as const,
    detail: (workoutId: string) =>
      [...queryKeys.workouts.all, "detail", workoutId] as const,
    exercises: (category?: string) =>
      [...queryKeys.workouts.all, "exercises", category] as const,
    exerciseDetail: (exerciseId: string) =>
      [...queryKeys.workouts.all, "exercise", exerciseId] as const,
  },
  nutrition: {
    all: ["nutrition"] as const,
    today: () => [...queryKeys.nutrition.all, "today"] as const,
    macros: (date: string) =>
      [...queryKeys.nutrition.all, "macros", date] as const,
    hydration: (date: string) =>
      [...queryKeys.nutrition.all, "hydration", date] as const,
    mealPlan: (date: string) =>
      [...queryKeys.nutrition.all, "meal-plan", date] as const,
  },
  progress: {
    all: ["progress"] as const,
    overview: () => [...queryKeys.progress.all, "overview"] as const,
    streak: () => [...queryKeys.progress.all, "streak"] as const,
    weightHistory: (range?: string) =>
      [...queryKeys.progress.all, "weight", range] as const,
    workoutHistory: () =>
      [...queryKeys.progress.all, "workout-history"] as const,
    achievements: () => [...queryKeys.progress.all, "achievements"] as const,
    weeklyReport: () =>
      [...queryKeys.progress.all, "report", "weekly"] as const,
  },
  leaderboard: {
    all: ["leaderboard"] as const,
    global: (page = 1) =>
      [...queryKeys.leaderboard.all, "global", page] as const,
    friends: () => [...queryKeys.leaderboard.all, "friends"] as const,
  },
  aiCoach: {
    all: ["aiCoach"] as const,
    conversations: () => [...queryKeys.aiCoach.all, "conversations"] as const,
    messages: (conversationId: string) =>
      [...queryKeys.aiCoach.all, "messages", conversationId] as const,
  },
} as const;
