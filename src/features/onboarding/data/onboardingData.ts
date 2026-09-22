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
        text: "AI-powered",
        color: "#5FFFD7",
        isBold: true,
      },
      {
        text: " plans that adapt to your\nprogress in real-time.",
      },
    ],
    image: require("../../../../assets/onboardingImages/Onboarding1.png"),
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
    image: require("../../../../assets/onboardingImages/Onboarding2.png"),
    buttonText: "NEXT",
    showSkip: true,
    showIndicator: true,
    indicatorIndex: 1,
  },
  {
    id: "smart_trainer",
    titleLines: ["AI SMART", "TRAINER"],
    // badgeIcon: "lightning",
    subtitleParts: [
      {
        text: "Real-time pose tracking and\n",
      },
      {
        text: "intelligent form coaching.",
        color: "#22D3EE",
        isBold: true,
      },
    ],
    image: require("../../../../assets/onboardingImages/Onboarding3.png"),
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
    image: require("../../../../assets/onboardingImages/Onboarding4.png"),
    buttonText: "GET STARTED",
    showSkip: false,
    showIndicator: false,
  },
];
