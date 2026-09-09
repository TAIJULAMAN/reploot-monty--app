import { create } from "zustand";
import { User } from "@/shared/types/user";
import { secureStorage } from "@/services/storage/secureStorage";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  signOut: async () => {
    await secureStorage.clearAuthTokens();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));
