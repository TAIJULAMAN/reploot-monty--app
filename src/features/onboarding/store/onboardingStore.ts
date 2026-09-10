import { create } from "zustand";

interface OnboardingState {
  currentSlideIndex: number;
  totalSlides: number;
  isSplashVisible: boolean;
  setSplashVisible: (visible: boolean) => void;
  setSlideIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  skipToFinal: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentSlideIndex: 0,
  totalSlides: 4,
  isSplashVisible: true,
  setSplashVisible: (isSplashVisible) => set({ isSplashVisible }),
  setSlideIndex: (index) => set({ currentSlideIndex: index }),
  nextSlide: () => {
    const { currentSlideIndex, totalSlides } = get();
    if (currentSlideIndex < totalSlides - 1) {
      set({ currentSlideIndex: currentSlideIndex + 1 });
    }
  },
  prevSlide: () => {
    const { currentSlideIndex } = get();
    if (currentSlideIndex > 0) {
      set({ currentSlideIndex: currentSlideIndex - 1 });
    }
  },
  skipToFinal: () => {
    set({ currentSlideIndex: 3 });
  },
  reset: () => set({ currentSlideIndex: 0, isSplashVisible: true }),
}));
