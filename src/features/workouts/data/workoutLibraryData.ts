import { ImageSource } from "expo-image";

export interface WorkoutCategoryItem {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  image: ImageSource | number | string;
  targetRoute?: string;
}

export const WORKOUT_LIBRARY_CATEGORIES: WorkoutCategoryItem[] = [
  {
    id: "chest",
    title: "Chest",
    badge: "24 EXERCISES",
    subtitle: "Sculpt and strengthen your upper body power",
    image: require("../../../../assets/library/l1.png"),
    targetRoute: "/workouts/details",
  },
  {
    id: "back",
    title: "Back",
    badge: "18 EXERCISES",
    subtitle: "Build a powerful, stable posterior chain and V-taper.",
    image: require("../../../../assets/library/l2.png"),
    targetRoute: "/workouts/pull",
  },
  {
    id: "shoulders",
    title: "Shoulders",
    badge: "15 EXERCISES",
    subtitle: "Define and broaden your upper frame with targeted deltoid movements.",
    image: require("../../../../assets/library/l3.png"),
  },
  {
    id: "legs",
    title: "Legs",
    badge: "32 EXERCISES",
    subtitle: "Power, stability, and explosive lower body strength.",
    image: require("../../../../assets/library/l4.png"),
  },
  {
    id: "arms",
    title: "Arms",
    badge: "22 EXERCISES",
    subtitle: "Targeted bicep and tricep hypertrophy protocols.",
    image: require("../../../../assets/library/l5.png"),
  },
  {
    id: "core",
    title: "Core",
    badge: "12 EXERCISES",
    subtitle: "Solidify your midsection for total body stability.",
    image: require("../../../../assets/library/l6.png"),
  },
  {
    id: "cardio",
    title: "Cardio",
    badge: "8 PROTOCOLS",
    subtitle: "High-intensity endurance and heart rate conditioning.",
    image: require("../../../../assets/library/l7.png"),
  },
  {
    id: "full-body",
    title: "Full Body",
    badge: "14 PLANS",
    subtitle: "Comprehensive total-body metabolic resistance training.",
    image: require("../../../../assets/library/l8.png"),
  },
];
