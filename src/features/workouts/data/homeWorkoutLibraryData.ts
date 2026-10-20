import { ImageSource } from "expo-image";

export interface HomeChallengeItem {
  id: string;
  dayBadge: string;
  title: string;
  xp: string;
  image: ImageSource | number | string;
}

export interface HomeWorkoutSessionItem {
  id: string;
  title: string;
  titleSecondary?: string;
  subtitle?: string;
  tag?: string;
  tagColor?: string;
  tagBg?: string;
  arrowColor?: string;
  iconBg?: string;
  iconBorder?: string;
  glowAura?: string;
  targetRoute?: string;
  image: ImageSource | number | string;
}

export interface HomeWorkoutLibraryData {
  currentXp: string;
  targetXp: string;
  rankUpText: string;
  progressPercent: number; // e.g. 50%
  todayMainQuest: {
    id: string;
    title: string;
    duration: string;
    rest: string;
    calories: string;
    xpBadge: string;
    image: ImageSource | number | string;
  };
  upcomingChallenges: HomeChallengeItem[];
  sessions: HomeWorkoutSessionItem[];
}

export const HOME_WORKOUT_LIBRARY_DATA: HomeWorkoutLibraryData = {
  currentXp: "1,250",
  targetXp: "2,500",
  rankUpText: "RANK UP IN\n1,250",
  progressPercent: 50,
  todayMainQuest: {
    id: "neon-bodyweight-blitz",
    title: "NEON\nBODYWEIGHT\nBLITZ",
    duration: "45 MIN",
    rest: "60s REST",
    calories: "350 KCAL",
    xpBadge: "+500 XP",
    image: require("../../../../assets/workout/HomeWorkout.png"),
  },
  upcomingChallenges: [
    {
      id: "cyber-circuit",
      dayBadge: "TOMORROW",
      title: "CYBER CIRCUIT",
      xp: "+300 XP",
      image: require("../../../../assets/workoutLibraryDetails/wld4.png"),
    },
    {
      id: "quantum-core",
      dayBadge: "NEXT DAY",
      title: "QUANTUM CORE",
      xp: "+300 XP",
      image: require("../../../../assets/pullDay/pld2.png"),
    },
  ],
  sessions: [
    {
      id: "upper-body",
      title: "UPPER BODY",
      titleSecondary: "SESSION",
      subtitle: "Chest, Back, Arms & Delts focus",
      tag: "+60 XP",
      tagColor: "#C5C0FF",
      tagBg: "rgba(129, 140, 248, 0.15)",
      arrowColor: "#818CF8",
      iconBg: "rgba(108, 92, 255, 0.18)",
      iconBorder: "rgba(129, 140, 248, 0.35)",
      glowAura: "rgba(129, 140, 248, 0.12)",
      targetRoute: "/workouts/upper",
      image: require("../../../../assets/library/l3.png"),
    },
    {
      id: "lower-body",
      title: "LOWER BODY",
      titleSecondary: "SESSION",
      subtitle: "Quads, Glutes, Calves & Hamstrings",
      tag: "+60 XP",
      tagColor: "#38EDD8",
      tagBg: "rgba(56, 237, 216, 0.12)",
      arrowColor: "#38EDD8",
      iconBg: "rgba(56, 237, 216, 0.16)",
      iconBorder: "rgba(56, 237, 216, 0.35)",
      glowAura: "rgba(56, 237, 216, 0.12)",
      image: require("../../../../assets/library/l2.png"),
    },
    {
      id: "full-body",
      title: "FULL BODY",
      titleSecondary: "SESSION",
      subtitle: "Total compound power & bodyweight flow",
      tag: "+75 XP",
      tagColor: "#C5C0FF",
      tagBg: "rgba(129, 140, 248, 0.15)",
      arrowColor: "#818CF8",
      iconBg: "rgba(108, 92, 255, 0.18)",
      iconBorder: "rgba(129, 140, 248, 0.35)",
      glowAura: "rgba(129, 140, 248, 0.12)",
      image: require("../../../../assets/library/l8.png"),
    },
    {
      id: "mobility",
      title: "MOBILITY",
      titleSecondary: "SESSION",
      subtitle: "Joint longevity, hips & spinal rotation",
      tag: "+45 XP",
      tagColor: "#38EDD8",
      tagBg: "rgba(56, 237, 216, 0.12)",
      arrowColor: "#38EDD8",
      iconBg: "rgba(56, 237, 216, 0.16)",
      iconBorder: "rgba(56, 237, 216, 0.35)",
      glowAura: "rgba(56, 237, 216, 0.12)",
      image: require("../../../../assets/library/l4.png"),
    },
    {
      id: "hiit",
      title: "HIIT",
      titleSecondary: "SESSION",
      subtitle: "High-intensity intervals & metabolic burn",
      tag: "+70 XP",
      tagColor: "#C5C0FF",
      tagBg: "rgba(129, 140, 248, 0.15)",
      arrowColor: "#818CF8",
      iconBg: "rgba(108, 92, 255, 0.18)",
      iconBorder: "rgba(129, 140, 248, 0.35)",
      glowAura: "rgba(129, 140, 248, 0.12)",
      image: require("../../../../assets/library/l5.png"),
    },
    {
      id: "strength",
      title: "STRENGTH",
      titleSecondary: "SESSION",
      subtitle: "Raw isometric resistance & calisthenics",
      tag: "+65 XP",
      tagColor: "#38EDD8",
      tagBg: "rgba(56, 237, 216, 0.12)",
      arrowColor: "#38EDD8",
      iconBg: "rgba(56, 237, 216, 0.16)",
      iconBorder: "rgba(56, 237, 216, 0.35)",
      glowAura: "rgba(56, 237, 216, 0.12)",
      image: require("../../../../assets/pullDay/pld2.png"),
    },
  ],
};
