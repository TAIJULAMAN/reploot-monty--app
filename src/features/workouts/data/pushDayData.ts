import { ImageSource } from "expo-image";

export interface PushDayExercise {
  id: string;
  index?: string;
  title: string;
  subtitle: string;
  image: ImageSource | number | string;
}

export interface PushDayWorkoutData {
  title: string;
  subtitle: string;
  heroImage: ImageSource | number | string;
  xpText: string;
  durationText: string;
  caloriesText: string;
  exercises: PushDayExercise[];
}

export const PUSH_DAY_DATA: PushDayWorkoutData = {
  title: "PUSH DAY",
  subtitle: "Today's AI-Crafted Routine.",
  heroImage: require("../../../../assets/pushDay/pd1.png"),
  xpText: "+500 XP",
  durationText: "60 MINS",
  caloriesText: "450 KCAL",
  exercises: [
    {
      id: "bench-press",
      title: "BENCH PRESS\n(BARBELL)",
      subtitle: "4 Sets × 8-10 Reps",
      image: require("../../../../assets/pushDay/pd4.png"),
    },
    {
      id: "overhead-press",
      title: "OVERHEAD PRESS\n(DUMBBELL)",
      subtitle: "3 Sets × 10-12 Reps",
      image: require("../../../../assets/pushDay/pd3.png"),
    },
    {
      id: "incline-fly",
      title: "INCLINE CHEST\nFLY",
      subtitle: "3 Sets × 12 Reps",
      image: require("../../../../assets/pushDay/pd2.png"),
    },
  ],
};
