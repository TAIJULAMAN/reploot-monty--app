import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOnline: boolean;
  hasSeenOnboarding: boolean;
  activeTab: string;
  isInitializing: boolean;
}

const initialState: AppState = {
  isOnline: true,
  hasSeenOnboarding: false,
  activeTab: "home",
  isInitializing: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setHasSeenOnboarding: (state, action: PayloadAction<boolean>) => {
      state.hasSeenOnboarding = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.isInitializing = action.payload;
    },
  },
});

export const { setOnline, setHasSeenOnboarding, setActiveTab, setInitializing } = appSlice.actions;
export default appSlice.reducer;
