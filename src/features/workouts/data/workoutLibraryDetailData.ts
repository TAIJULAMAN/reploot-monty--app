import { ImageSource } from "expo-image";

export type ExerciseDifficulty = "BEG" | "INTM" | "ADV";

export interface WorkoutDetailExercise {
  id: string;
  title: string;
  setsReps: string;
  difficulty: ExerciseDifficulty;
  xp: string;
  image: ImageSource | number | string;
}

export interface WorkoutLibraryDetailData {
  id: string;
  category: string;
  protocolBadge: string;
  title: string;
  titleSecondary?: string;
  duration: string;
  calories: string;
  exerciseCount: string;
  heroImage: ImageSource | number | string;
  exercises: WorkoutDetailExercise[];
  exploreMore: {
    title: string;
    subtitle: string;
    bannerImage: ImageSource | number | string;
    icon?: ImageSource | number | string;
    targetRoute?: string;
  };
}

export const CHEST_WORKOUT_DETAIL_DATA: WorkoutLibraryDetailData = {
  id: "chest-hypertrophy",
  category: "CHEST",
  protocolBadge: "AI PROTOCOL",
  title: "CHEST",
  titleSecondary: "HYPERTROPHY",
  duration: "60 MIN",
  calories: "450 KCAL",
  exerciseCount: "8 EXERCISES",
  heroImage: require("../../../../assets/workoutLibraryDetails/wld_hero.png"),
  exercises: [
    {
      id: "barbell-bench-press",
      title: "Barbell Bench Press",
      setsReps: "4 SETS  ×  8-10 REPS",
      difficulty: "INTM",
      xp: "+50 XP",
      image: require("../../../../assets/workoutLibraryDetails/wld4.png"),
    },
    {
      id: "incline-db-flyes",
      title: "Incline DB Flyes",
      setsReps: "3 SETS  ×  12 REPS",
      difficulty: "ADV",
      xp: "+30 XP",
      image: require("../../../../assets/workoutLibraryDetails/wld3.png"),
    },
    {
      id: "weighted-dips",
      title: "Weighted Dips",
      setsReps: "4 SETS  ×  TO FAILURE",
      difficulty: "INTM",
      xp: "+45 XP",
      image: require("../../../../assets/workoutLibraryDetails/wld2.png"),
    },
    {
      id: "diamond-push-ups",
      title: "Diamond Push-ups",
      setsReps: "3 SETS  ×  15 REPS",
      difficulty: "BEG",
      xp: "+20 XP",
      image: require("../../../../assets/workoutLibraryDetails/wld1.png"),
    },
  ],
  exploreMore: {
    title: "CHEST\nLIBRARY",
    subtitle: "Explore 24+ specialized protocols",
    bannerImage: require("../../../../assets/workoutLibraryDetails/womenWorkout.png"),
    icon: require("../../../../assets/workoutLibraryDetails/workoutIcon.png"),
    targetRoute: "/workouts/library",
  },
};
