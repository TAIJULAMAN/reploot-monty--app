import { create } from "zustand";

interface AppState {
  isOnline: boolean;
  hasSeenOnboarding: boolean;
  activeTab: string;
  isInitializing: boolean;
  setOnline: (isOnline: boolean) => void;
  setHasSeenOnboarding: (seen: boolean) => void;
  setActiveTab: (tab: string) => void;
  setInitializing: (initializing: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnline: true,
  hasSeenOnboarding: false,
  activeTab: "home",
  isInitializing: true,
  setOnline: (isOnline) => set({ isOnline }),
  setHasSeenOnboarding: (hasSeenOnboarding) => set({ hasSeenOnboarding }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setInitializing: (isInitializing) => set({ isInitializing }),
}));
