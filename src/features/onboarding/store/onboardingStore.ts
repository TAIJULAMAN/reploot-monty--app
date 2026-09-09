import { create } from "zustand";

interface OnboardingState {
  currentSlideIndex: number;
  totalSlides: number;
  setSlideIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentSlideIndex: 0,
  totalSlides: 4,
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
  reset: () => set({ currentSlideIndex: 0 }),
}));
