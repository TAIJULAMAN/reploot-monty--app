import { ImageSourcePropType } from "react-native";

export interface SubtitlePart {
  text: string;
  color?: string;
  isBold?: boolean;
}

export interface OnboardingSlideItem {
  id: string;
  titleLines: string[];
  subtitleParts: SubtitlePart[];
  image: ImageSourcePropType;
  badgeIcon?: "lightning" | "sparkles" | null;
  buttonText: string;
  showSkip: boolean;
  showIndicator: boolean;
  indicatorIndex?: number;
}

export const ONBOARDING_SLIDES: OnboardingSlideItem[] = [
  {
    id: "trainer",
    titleLines: ["YOUR", "VISUAL", "PERSONAL", "TRAINER"],
    subtitleParts: [
      {
        text: "AI-powered plans that adapt to your progress in real-time.",
      },
    ],
    image: require("../../../../assets/onboarding/slide1_gym.jpg"),
    buttonText: "NEXT",
    showSkip: true,
    showIndicator: true,
    indicatorIndex: 0,
  },
  {
    id: "nutrition",
    titleLines: ["PRECISION", "NUTRITION"],
    subtitleParts: [
      {
        text: "Scan meals and track macros with\n",
      },
      {
        text: "instant AI recognition.",
        color: "#22D3EE",
        isBold: true,
      },
    ],
    image: require("../../../../assets/onboarding/slide2_nutrition.jpg"),
    buttonText: "NEXT",
    showSkip: true,
    showIndicator: true,
    indicatorIndex: 1,
  },
  {
    id: "smart_trainer",
    titleLines: ["AI SMART", "TRAINER"],
    badgeIcon: "lightning",
    subtitleParts: [
      {
        text: "Scan meals and track macros with\n",
      },
      {
        text: "instant AI recognition.",
        color: "#22D3EE",
        isBold: true,
      },
    ],
    image: require("../../../../assets/onboarding/slide3_smart_trainer.jpg"),
    buttonText: "NEXT",
    showSkip: true,
    showIndicator: true,
    indicatorIndex: 2,
  },
  {
    id: "train_smarter",
    titleLines: ["TRAIN", "SMARTER"],
    subtitleParts: [
      {
        text: "Your ",
      },
      {
        text: "AI Personal Trainer",
        color: "#22D3EE",
        isBold: true,
      },
      {
        text: ", ",
      },
      {
        text: "Nutrition Coach",
        color: "#34D399",
        isBold: true,
      },
      {
        text: " and ",
      },
      {
        text: "Workout Partner",
        color: "#22D3EE",
        isBold: true,
      },
      {
        text: ".",
      },
    ],
    image: require("../../../../assets/onboarding/slide4_train_smarter.jpg"),
    buttonText: "GET STARTED",
    showSkip: false,
    showIndicator: false,
  },
];
