import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/shared/types/user';
import { secureStorage } from '@/services/storage/secureStorage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    id: "1",
    email: "alex@kinetic.ai",
    fullName: "Alex",
    hasCompletedOnboarding: true,
    createdAt: new Date().toISOString(),
  },
  isAuthenticated: true,
  isLoading: false,
};

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    await secureStorage.clearAuthTokens();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    });
  }
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
