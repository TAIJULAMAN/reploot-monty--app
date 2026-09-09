import { Workout, Exercise } from "@/shared/types/workout";

export const mockExercises: Exercise[] = [
  {
    id: "ex_bench_press",
    name: "Barbell Bench Press",
    category: "chest",
    targetMuscles: ["Chest", "Triceps", "Front Deltoids"],
    equipmentRequired: ["Barbell", "Bench"],
    difficulty: "intermediate",
    caloriesBurnedPerMin: 8,
    instructions: [
      "Lie back on a flat bench. Grip the barbell with hands slightly wider than shoulder-width.",
      "Unrack bar with arms locked. Lower the bar slowly to mid-chest.",
      "Press the bar forcefully upward until arms are extended.",
    ],
    supportsAiTracking: true,
  },
  {
    id: "ex_goblet_squat",
    name: "Goblet Squats",
    category: "legs",
    targetMuscles: ["Quadriceps", "Glutes", "Core"],
    equipmentRequired: ["Dumbbell or Kettlebell"],
    difficulty: "beginner",
    caloriesBurnedPerMin: 9,
    instructions: [
      "Hold a dumbbell vertically against your chest with both hands.",
      "Keep chest up, hinge hips back and bend knees into a deep squat.",
      "Drive through heels to stand upright.",
    ],
    supportsAiTracking: true,
  },
];

export const mockTodayWorkout: Workout = {
  id: "wkt_today_upper_body",
  title: "Upper Body Strength",
  subtitle: "Today's AI Workout",
  environment: "gym",
  category: "chest",
  difficulty: "intermediate",
  estimatedDurationMin: 45,
  estimatedCalories: 420,
  xpReward: 100,
  isAiGenerated: true,
  exercises: [
    {
      id: "we_1",
      order: 1,
      exercise: mockExercises[0],
      sets: [
        { setNumber: 1, targetReps: 12, completedReps: 12, weightKg: 70, isCompleted: true, accuracyScore: 94 },
        { setNumber: 2, targetReps: 10, completedReps: 10, weightKg: 80, isCompleted: true, accuracyScore: 96 },
        { setNumber: 3, targetReps: 8, completedReps: 8, weightKg: 85, isCompleted: false },
      ],
    },
  ],
};
