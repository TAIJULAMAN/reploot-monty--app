import { ImageSource } from "expo-image";

export interface WorkoutExerciseItem {
  id: string;
  index?: string;
  title: string;
  subtitle: string;
  image: ImageSource | number | string;
}

export interface DynamicWorkoutPathDetail {
  id: string;
  title: string;
  subtitle: string;
  heroImage: ImageSource | number | string;
  xpText: string;
  durationText: string;
  caloriesText: string;
  exercises: WorkoutExerciseItem[];
}

export const WORKOUT_PATH_DETAILS_MAP: Record<string, DynamicWorkoutPathDetail> = {
  push: {
    id: "push",
    title: "PUSH DAY",
    subtitle: "Today's AI-Crafted Routine.",
    heroImage: require("../../../../assets/pushDay/pd1.png"),
    xpText: "+500 XP",
    durationText: "60 MINS",
    caloriesText: "450 KCAL",
    exercises: [
      {
        id: "bench-press",
        index: "01",
        title: "BENCH PRESS\n(BARBELL)",
        subtitle: "4 Sets × 8-10 Reps",
        image: require("../../../../assets/pushDay/pd4.png"),
      },
      {
        id: "overhead-press",
        index: "02",
        title: "OVERHEAD PRESS\n(DUMBBELL)",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/pushDay/pd3.png"),
      },
      {
        id: "incline-fly",
        index: "03",
        title: "INCLINE CHEST\nFLY",
        subtitle: "3 Sets × 12 Reps",
        image: require("../../../../assets/pushDay/pd2.png"),
      },
      {
        id: "incline-barbell-press",
        index: "04",
        title: "INCLINE BENCH\nPRESS",
        subtitle: "4 Sets × 8-10 Reps",
        image: require("../../../../assets/pushDay/pd4.png"),
      },
      {
        id: "dips-chest-triceps",
        index: "05",
        title: "PARALLEL BAR\nDIPS",
        subtitle: "3 Sets × 10-15 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld1.png"),
      },
      {
        id: "cable-lateral-raise",
        index: "06",
        title: "CABLE LATERAL\nRAISES",
        subtitle: "4 Sets × 12-15 Reps",
        image: require("../../../../assets/pushDay/pd3.png"),
      },
      {
        id: "tricep-rope-pushdown",
        index: "07",
        title: "TRICEP ROPE\nPUSHDOWN",
        subtitle: "3 Sets × 12-15 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld2.png"),
      },
      {
        id: "skull-crushers",
        index: "08",
        title: "LYING SKULL\nCRUSHERS",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld3.png"),
      },
    ],
  },
  pull: {
    id: "pull",
    title: "PULL DAY",
    subtitle: "Today's AI-Crafted Routine.",
    heroImage: require("../../../../assets/pullDay/pld1.png"),
    xpText: "+500 XP",
    durationText: "60 MINS",
    caloriesText: "450 KCAL",
    exercises: [
      {
        id: "deadlifts",
        index: "01",
        title: "DEADLIFTS\n(CONVENTIONAL)",
        subtitle: "4 Sets × 5 Reps",
        image: require("../../../../assets/pullDay/pld2.png"),
      },
      {
        id: "pull-ups",
        index: "02",
        title: "PULL-UPS\n(WEIGHTED)",
        subtitle: "3 Sets × Max Reps",
        image: require("../../../../assets/pullDay/pld3.png"),
      },
      {
        id: "seated-cable-rows",
        index: "03",
        title: "SEATED CABLE\nROWS",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/pullDay/pld4.png"),
      },
      {
        id: "face-pulls",
        index: "04",
        title: "FACE PULLS\n(CABLE)",
        subtitle: "4 Sets × 15-20 Reps",
        image: require("../../../../assets/pullDay/pld5.png"),
      },
      {
        id: "lat-pulldowns",
        index: "05",
        title: "WIDE GRIP LAT\nPULLDOWN",
        subtitle: "4 Sets × 10-12 Reps",
        image: require("../../../../assets/pullDay/pld6.png"),
      },
      {
        id: "barbell-bicep-curl",
        index: "06",
        title: "BARBELL BICEP\nCURLS",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld4.png"),
      },
      {
        id: "hammer-curls",
        index: "07",
        title: "DUMBBELL HAMMER\nCURLS",
        subtitle: "3 Sets × 12 Reps",
        image: require("../../../../assets/pullDay/pld3.png"),
      },
      {
        id: "single-arm-dumbbell-row",
        index: "08",
        title: "SINGLE-ARM\nDUMBBELL ROW",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/pullDay/pld4.png"),
      },
    ],
  },
  upper: {
    id: "upper",
    title: "UPPER BODY",
    subtitle: "Chest, Back, Arms & Delts Focus.",
    heroImage: require("../../../../assets/upperBody/upperBodyStrength.png"),
    xpText: "+600 XP",
    durationText: "65 MINS",
    caloriesText: "480 KCAL",
    exercises: [
      {
        id: "incline-dumbbell-press",
        index: "01",
        title: "INCLINE DUMBBELL\nPRESS",
        subtitle: "4 Sets × 8-10 Reps",
        image: require("../../../../assets/pushDay/pd4.png"),
      },
      {
        id: "barbell-rows",
        index: "02",
        title: "BENT OVER\nBARBELL ROWS",
        subtitle: "4 Sets × 8-10 Reps",
        image: require("../../../../assets/pullDay/pld4.png"),
      },
      {
        id: "overhead-dumbbell-press",
        index: "03",
        title: "OVERHEAD DUMBBELL\nPRESS",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/pushDay/pd3.png"),
      },
      {
        id: "chest-supported-row",
        index: "04",
        title: "CHEST SUPPORTED\nROW",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/pullDay/pld6.png"),
      },
      {
        id: "lateral-raises",
        index: "05",
        title: "LATERAL DELTOID\nRAISES",
        subtitle: "4 Sets × 12-15 Reps",
        image: require("../../../../assets/pushDay/pd2.png"),
      },
      {
        id: "close-grip-bench-press",
        index: "06",
        title: "CLOSE-GRIP BENCH\nPRESS",
        subtitle: "3 Sets × 8-10 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld1.png"),
      },
      {
        id: "incline-dumbbell-curl",
        index: "07",
        title: "INCLINE DUMBBELL\nCURL",
        subtitle: "3 Sets × 10-12 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld4.png"),
      },
      {
        id: "cable-crossover-fly",
        index: "08",
        title: "CABLE CROSSOVER\nFLIES",
        subtitle: "3 Sets × 12-15 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld2.png"),
      },
    ],
  },
  lower: {
    id: "lower",
    title: "LOWER BODY",
    subtitle: "Quads, Glutes, Calves & Hams Focus.",
    heroImage: require("../../../../assets/pullDay/pld1.png"),
    xpText: "+600 XP",
    durationText: "65 MINS",
    caloriesText: "520 KCAL",
    exercises: [
      {
        id: "barbell-back-squat",
        index: "01",
        title: "BARBELL BACK\nSQUAT",
        subtitle: "4 Sets × 6-8 Reps",
        image: require("../../../../assets/pullDay/pld2.png"),
      },
      {
        id: "romanian-deadlift",
        index: "02",
        title: "ROMANIAN\nDEADLIFT",
        subtitle: "4 Sets × 8-10 Reps",
        image: require("../../../../assets/pullDay/pld2.png"),
      },
      {
        id: "bulgarian-split-squats",
        index: "03",
        title: "BULGARIAN SPLIT\nSQUATS",
        subtitle: "3 Sets × 10-12 Reps / Leg",
        image: require("../../../../assets/pushDay/pd3.png"),
      },
      {
        id: "leg-press-45",
        index: "04",
        title: "45-DEGREE LEG\nPRESS",
        subtitle: "4 Sets × 10-12 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld1.png"),
      },
      {
        id: "walking-lunges",
        index: "05",
        title: "DUMBBELL WALKING\nLUNGES",
        subtitle: "3 Sets × 12 Reps / Leg",
        image: require("../../../../assets/pushDay/pd3.png"),
      },
      {
        id: "lying-leg-curls",
        index: "06",
        title: "LYING HAMSTRING\nLEG CURLS",
        subtitle: "3 Sets × 12-15 Reps",
        image: require("../../../../assets/pullDay/pld4.png"),
      },
      {
        id: "standing-calf-raise",
        index: "07",
        title: "STANDING CALF\nRAISES",
        subtitle: "4 Sets × 15-20 Reps",
        image: require("../../../../assets/pushDay/pd2.png"),
      },
      {
        id: "hanging-leg-raises",
        index: "08",
        title: "HANGING LEG\nRAISES (CORE)",
        subtitle: "3 Sets × 15 Reps",
        image: require("../../../../assets/pullDay/pld3.png"),
      },
    ],
  },
  fullbody: {
    id: "fullbody",
    title: "FULL BODY",
    subtitle: "Total Compound Power & Endurance.",
    heroImage: require("../../../../assets/pushDay/pd1.png"),
    xpText: "+750 XP",
    durationText: "70 MINS",
    caloriesText: "560 KCAL",
    exercises: [
      {
        id: "power-clean",
        index: "01",
        title: "BARBELL POWER\nCLEANS",
        subtitle: "4 Sets × 5 Reps",
        image: require("../../../../assets/pullDay/pld2.png"),
      },
      {
        id: "front-squat",
        index: "02",
        title: "FRONT SQUAT\n(OLYMPIC)",
        subtitle: "4 Sets × 6-8 Reps",
        image: require("../../../../assets/pushDay/pd4.png"),
      },
      {
        id: "pull-up-weighted",
        index: "03",
        title: "WEIGHTED\nPULL-UPS",
        subtitle: "3 Sets × 8-10 Reps",
        image: require("../../../../assets/pullDay/pld3.png"),
      },
      {
        id: "push-press",
        index: "04",
        title: "OVERHEAD PUSH\nPRESS",
        subtitle: "4 Sets × 6-8 Reps",
        image: require("../../../../assets/pushDay/pd3.png"),
      },
      {
        id: "romanian-deadlift-full",
        index: "05",
        title: "BARBELL ROMANIAN\nDEADLIFT",
        subtitle: "3 Sets × 8-10 Reps",
        image: require("../../../../assets/pullDay/pld2.png"),
      },
      {
        id: "barbell-bench-press-full",
        index: "06",
        title: "FLAT BENCH\nPRESS",
        subtitle: "4 Sets × 8-10 Reps",
        image: require("../../../../assets/workoutLibraryDetails/wld1.png"),
      },
      {
        id: "dumbbell-renegade-rows",
        index: "07",
        title: "RENEGADE ROWS\n(DUMBBELL)",
        subtitle: "3 Sets × 10 Reps / Arm",
        image: require("../../../../assets/pullDay/pld6.png"),
      },
      {
        id: "cable-woodchopper",
        index: "08",
        title: "STANDING CABLE\nWOODCHOPPERS",
        subtitle: "3 Sets × 15 Reps / Side",
        image: require("../../../../assets/workoutLibraryDetails/wld2.png"),
      },
    ],
  },
};
