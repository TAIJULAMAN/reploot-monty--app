import { ImageSource } from "expo-image";

export interface CircuitExerciseItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  xp: string;
  category: "strength" | "hypertrophy" | "endurance";
  image: ImageSource | number | string;
}

export interface UpperBodySessionData {
  id: string;
  apexBadge: string;
  xpBadge: string;
  subtitle: string;
  title: string;
  duration: string;
  calories: string;
  exerciseCount: string;
  targetLoad: string;
  heroImage: ImageSource | number | string;
  exercises: CircuitExerciseItem[];
}

export const UPPER_BODY_SESSION_DATA: UpperBodySessionData = {
  id: "upper-body-session",
  apexBadge: "UPPER BODY APEX",
  xpBadge: "+500 XP",
  subtitle: "HYPERTROPHY & POWER",
  title: "UPPER BODY\nSESSION",
  duration: "60 MINS",
  calories: "480 KCAL",
  exerciseCount: "7 EXERCISES",
  targetLoad: "88%",
  heroImage: require("../../../../assets/upperBody/upperBodyStrength.png"),
  exercises: [
    {
      id: "overhead-barbell-press",
      index: "#01",
      title: "Overhead Barbell\nPress",
      subtitle: "4 Sets  ×  8-10 Reps",
      xp: "+50 XP",
      category: "strength",
      image: require("../../../../assets/library/l1.png"),
    },
    {
      id: "incline-db-bench-press",
      index: "#02",
      title: "Incline DB Bench\nPress",
      subtitle: "3 Sets  ×  10-12 Reps",
      xp: "+50 XP",
      category: "hypertrophy",
      image: require("../../../../assets/workoutLibraryDetails/wld4.png"),
    },
    {
      id: "bent-over-barbell-row",
      index: "#03",
      title: "Bent-Over Barbell\nRow",
      subtitle: "4 Sets  ×  10 Reps",
      xp: "+50 XP",
      category: "strength",
      image: require("../../../../assets/pullDay/pld4.png"),
    },
    {
      id: "standing-bicep-curls",
      index: "#04",
      title: "Standing Bicep Curls",
      subtitle: "3 Sets  ×  12 Reps",
      xp: "+45 XP",
      category: "hypertrophy",
      image: require("../../../../assets/workoutLibraryDetails/wld2.png"),
    },
    {
      id: "cable-tricep-pushdown",
      index: "#05",
      title: "Cable Tricep\nPushdown",
      subtitle: "3 Sets  ×  15 Reps",
      xp: "+40 XP",
      category: "hypertrophy",
      image: require("../../../../assets/workoutLibraryDetails/wld3.png"),
    },
    {
      id: "lateral-db-deltoid-raises",
      index: "#06",
      title: "Lateral DB Deltoid\nRaises",
      subtitle: "3 Sets  ×  15 Reps",
      xp: "+40 XP",
      category: "endurance",
      image: require("../../../../assets/pushDay/pd2.png"),
    },
    {
      id: "face-pulls-rear-delts",
      index: "#07",
      title: "Cable Face Pulls",
      subtitle: "3 Sets  ×  15-20 Reps",
      xp: "+35 XP",
      category: "endurance",
      image: require("../../../../assets/pullDay/pld5.png"),
    },
  ],
};
