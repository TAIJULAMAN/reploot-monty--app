import { ImageSource } from "expo-image";

export interface ExecutionStepItem {
  id: string;
  tabLabel: string;
  stepNumber: string;
  title: string;
  description: string;
  coachCue: string;
}

export interface SetDetailItem {
  setNumber: number;
  reps: number;
  weightKg: number;
}

export interface ExerciseDetailConfig {
  id: string;
  title: string;
  focusBadge: string;
  heroImage: ImageSource | number | string;
  demoVideoThumbnail?: ImageSource | number | string;
  demoTag: string;
  demoTitle: string;
  demoSubtitle: string;
  targetAreasTitle: string;
  targetPrimary: string;
  targetTags: string[];
  equipment: string;
  difficulty: string;
  calories: string;
  defaultSetsCount: number;
  sets: SetDetailItem[];
  defaultRestSec: number;
  executionSteps: ExecutionStepItem[];
}

export const EXERCISE_DETAILS_DATABASE: Record<string, ExerciseDetailConfig> = {
  "bench-press": {
    id: "bench-press",
    title: "BENCH PRESS",
    focusBadge: "POWER FOCUS",
    heroImage: require("../../../../assets/pushDay/pd4.png"),
    demoVideoThumbnail: require("../../../../assets/workoutLibraryDetails/wld_hero.png"),
    demoTag: "WATCH DEMO",
    demoTitle: "POWER UP",
    demoSubtitle: "GEN-Z FIT APP DEMO",
    targetAreasTitle: "Chest & Triceps",
    targetPrimary: "PECTORALS",
    targetTags: ["PECTORALS", "DELTOIDS"],
    equipment: "Barbell",
    difficulty: "Intm.",
    calories: "120 kcal",
    defaultSetsCount: 4,
    defaultRestSec: 75,
    sets: [
      { setNumber: 1, reps: 4, weightKg: 60 },
      { setNumber: 2, reps: 5, weightKg: 62 },
      { setNumber: 3, reps: 3, weightKg: 56 },
      { setNumber: 4, reps: 7, weightKg: 40 },
    ],
    executionSteps: [
      {
        id: "step-1",
        tabLabel: "01 SETUP",
        stepNumber: "01",
        title: "Setup & Grip",
        description:
          "Lie flat on your back on a bench with feet firmly planted. Retract your shoulder blades and grip the barbell with hands slightly wider than shoulder-width apart, ensuring wrists remain stacked directly above elbows.",
        coachCue: "Drive feet into the floor & pack upper back firmly into bench",
      },
      {
        id: "step-2",
        tabLabel: "02 DESCENT",
        stepNumber: "02",
        title: "Controlled Descent",
        description:
          "Unrack the bar directly over your chest. Lower the barbell with steady control to your sternum while keeping elbows tucked at a 45-60 degree angle relative to your torso.",
        coachCue: "Inhale deep into diaphragm and control downward tempo (2-3s)",
      },
      {
        id: "step-3",
        tabLabel: "03 PRESS",
        stepNumber: "03",
        title: "Explosive Press",
        description:
          "Drive upward through your chest and triceps while maintaining leg drive. Lock out elbows smoothly at the top without shrugging shoulders forward.",
        coachCue: "Exhale through the sticking point and push the floor away",
      },
    ],
  },
  "overhead-press": {
    id: "overhead-press",
    title: "OVERHEAD PRESS",
    focusBadge: "SHOULDER POWER",
    heroImage: require("../../../../assets/pushDay/pd3.png"),
    demoVideoThumbnail: require("../../../../assets/pushDay/pd1.png"),
    demoTag: "WATCH DEMO",
    demoTitle: "OVERHEAD STRENGTH",
    demoSubtitle: "DELTA KINETIC SYSTEM",
    targetAreasTitle: "Anterior & Lateral Delts",
    targetPrimary: "DELTOIDS",
    targetTags: ["DELTOIDS", "TRICEPS"],
    equipment: "Dumbbell",
    difficulty: "Intm.",
    calories: "95 kcal",
    defaultSetsCount: 3,
    defaultRestSec: 90,
    sets: [
      { setNumber: 1, reps: 10, weightKg: 22 },
      { setNumber: 2, reps: 10, weightKg: 24 },
      { setNumber: 3, reps: 8, weightKg: 26 },
    ],
    executionSteps: [
      {
        id: "step-1",
        tabLabel: "01 SETUP",
        stepNumber: "01",
        title: "Base & Stance",
        description:
          "Stand tall with feet hip-width apart or sit upright on a high-back bench. Bring dumbbells to shoulder height with palms facing forward.",
        coachCue: "Squeeze glutes and brace your core tight before pressing",
      },
      {
        id: "step-2",
        tabLabel: "02 DRIVE",
        stepNumber: "02",
        title: "Vertical Lockout",
        description:
          "Press dumbbells straight overhead in a smooth arc until your arms are fully extended overhead aligned with ears.",
        coachCue: "Keep ribs down to avoid excessive lumbar extension",
      },
      {
        id: "step-3",
        tabLabel: "03 RETURN",
        stepNumber: "03",
        title: "Eccentric Lower",
        description:
          "Lower weights under control back to ear level with elbows flaring gently forward in the scapular plane.",
        coachCue: "Maintain tension through deltoids all the way down",
      },
    ],
  },
  deadlifts: {
    id: "deadlifts",
    title: "DEADLIFTS",
    focusBadge: "POSTERIOR POWER",
    heroImage: require("../../../../assets/pullDay/pld2.png"),
    demoVideoThumbnail: require("../../../../assets/pullDay/pld1.png"),
    demoTag: "WATCH DEMO",
    demoTitle: "RAW PULL DEMO",
    demoSubtitle: "HINGE KINETICS",
    targetAreasTitle: "Hamstrings, Glutes & Lats",
    targetPrimary: "POSTERIOR CHAIN",
    targetTags: ["GLUTES", "LATS", "CORE"],
    equipment: "Barbell",
    difficulty: "Adv.",
    calories: "160 kcal",
    defaultSetsCount: 4,
    defaultRestSec: 120,
    sets: [
      { setNumber: 1, reps: 5, weightKg: 100 },
      { setNumber: 2, reps: 5, weightKg: 110 },
      { setNumber: 3, reps: 4, weightKg: 120 },
      { setNumber: 4, reps: 3, weightKg: 130 },
    ],
    executionSteps: [
      {
        id: "step-1",
        tabLabel: "01 SETUP",
        stepNumber: "01",
        title: "Foot Placement & Grip",
        description:
          "Position midfoot under the barbell. Hinge at hips to grip bar just outside knees with double-overhand or hook grip.",
        coachCue: "Pull slack out of the barbell until you hear the click",
      },
      {
        id: "step-2",
        tabLabel: "02 DRIVE",
        stepNumber: "02",
        title: "Floor Push & Lockout",
        description:
          "Push the floor away through midfoot, extending knees and hips simultaneously until standing upright.",
        coachCue: "Chest up, engage lats like bending the bar around shins",
      },
      {
        id: "step-3",
        tabLabel: "03 RESET",
        stepNumber: "03",
        title: "Controlled Hinge",
        description:
          "Hinge hips back and slide bar down thighs before bending knees to return plates to floor.",
        coachCue: "Keep barbell closely glued to thighs and shins",
      },
    ],
  },
};

export const getExerciseDetailById = (
  exerciseId: string,
  fallbackTitle?: string,
  fallbackImage?: any
): ExerciseDetailConfig => {
  const existing = EXERCISE_DETAILS_DATABASE[exerciseId];
  if (existing) return existing;

  const cleanTitle = (fallbackTitle || exerciseId)
    .replace(/\n/g, " ")
    .toUpperCase();

  return {
    id: exerciseId,
    title: cleanTitle,
    focusBadge: "TARGET FOCUS",
    heroImage: fallbackImage || require("../../../../assets/pushDay/pd4.png"),
    demoVideoThumbnail: require("../../../../assets/workoutLibraryDetails/wld_hero.png"),
    demoTag: "WATCH DEMO",
    demoTitle: cleanTitle,
    demoSubtitle: "GEN-Z ATHLETIC DEMO",
    targetAreasTitle: "Primary Muscle Targets",
    targetPrimary: "TARGET MUSCLES",
    targetTags: ["AGONIST", "STABILIZER"],
    equipment: "Gym Gear",
    difficulty: "Intm.",
    calories: "110 kcal",
    defaultSetsCount: 4,
    defaultRestSec: 75,
    sets: [
      { setNumber: 1, reps: 8, weightKg: 40 },
      { setNumber: 2, reps: 8, weightKg: 45 },
      { setNumber: 3, reps: 6, weightKg: 50 },
      { setNumber: 4, reps: 6, weightKg: 50 },
    ],
    executionSteps: [
      {
        id: "step-1",
        tabLabel: "01 SETUP",
        stepNumber: "01",
        title: "Setup & Alignment",
        description:
          "Establish proper foundational posture. Set stable core intra-abdominal pressure and align your joints before applying initial load.",
        coachCue: "Anchor your stance and align breath with kinetic posture",
      },
      {
        id: "step-2",
        tabLabel: "02 MOVEMENT",
        stepNumber: "02",
        title: "Concentric Drive",
        description:
          "Perform the movement with full range of motion. Contract primary muscle groups without losing joint stability.",
        coachCue: "Maintain constant tempo and controlled force distribution",
      },
      {
        id: "step-3",
        tabLabel: "03 ECCENTRIC",
        stepNumber: "03",
        title: "Controlled Recovery",
        description:
          "Control the negative portion under full muscular tension. Avoid bouncing or relying on momentum.",
        coachCue: "Resist the load steadily during the entire descent",
      },
    ],
  };
};
