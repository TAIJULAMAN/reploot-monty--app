import {
  OnboardingButton,
  OnboardingButtonProps,
} from "@/features/onboarding/components/OnboardingButton";
import React from "react";

export interface ProfileNavigationButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  showArrow?: boolean;
  subtext?: string;
  isFinalSlide?: boolean;
}

export function ProfileNavigationButton({
  title = "CONTINUE",
  onPress,
  disabled = false,
  subtext,
  isFinalSlide = false,
}: ProfileNavigationButtonProps) {
  return (
    <OnboardingButton
      text={title}
      onPress={onPress}
      disabled={disabled}
      subtext={subtext}
      isFinalSlide={isFinalSlide}
    />
  );
}
