import { ImageSource } from "expo-image";

export interface PullDayExercise {
  id: string;
  index?: string;
  title: string;
  subtitle: string;
  image: ImageSource | number | string;
}

export interface PullDayWorkoutData {
  title: string;
  subtitle: string;
  heroImage: ImageSource | number | string;
  xpText: string;
  durationText: string;
  caloriesText: string;
  exercises: PullDayExercise[];
}

export const PULL_DAY_DATA: PullDayWorkoutData = {
  title: "PULL DAY",
  subtitle: "Today's AI-Crafted Routine",
  heroImage: require("../../../../assets/pullDay/pld1.png"),
  xpText: "+500 XP",
  durationText: "60 MINS",
  caloriesText: "450 KCAL",
  exercises: [
    {
      id: "deadlifts",
      index: "01",
      title: "DEADLIFTS\n(CONVENTIONAL)",
      subtitle: "4 Sets x 5 Reps",
      image: require("../../../../assets/pullDay/pld2.png"),
    },
    {
      id: "pull-ups",
      index: "02",
      title: "PULL-UPS\n(WEIGHTED)",
      subtitle: "3 Sets x Max Reps",
      image: require("../../../../assets/pullDay/pld3.png"),
    },
    {
      id: "seated-cable-rows",
      index: "03",
      title: "SEATED CABLE\nROWS",
      subtitle: "3 Sets x 10-12 Reps",
      image: require("../../../../assets/pullDay/pld4.png"),
    },
    {
      id: "face-pulls",
      index: "04",
      title: "FACE PULLS",
      subtitle: "4 Sets x 15-20 Reps",
      image: require("../../../../assets/pullDay/pld5.png"),
    },
    {
      id: "hammer-curls",
      index: "05",
      title: "HAMMER CURLS",
      subtitle: "3 Sets x 12 Reps",
      image: require("../../../../assets/pullDay/pld6.png"),
    },
  ],
};
