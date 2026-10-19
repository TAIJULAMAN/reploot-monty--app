import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkoutState {
  completedExerciseIds: string[];
  activeWorkoutPathId: string | null;
  currentExerciseIndex: number;
}

const initialState: WorkoutState = {
  completedExerciseIds: [],
  activeWorkoutPathId: null,
  currentExerciseIndex: 0,
};

export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    markExerciseComplete: (state, action: PayloadAction<string>) => {
      if (!state.completedExerciseIds.includes(action.payload)) {
        state.completedExerciseIds.push(action.payload);
      }
    },
    unmarkExerciseComplete: (state, action: PayloadAction<string>) => {
      state.completedExerciseIds = state.completedExerciseIds.filter(
        (id) => id !== action.payload
      );
    },
    resetCompletedExercises: (state) => {
      state.completedExerciseIds = [];
      state.currentExerciseIndex = 0;
    },
    setCurrentExerciseIndex: (state, action: PayloadAction<number>) => {
      state.currentExerciseIndex = action.payload;
    },
    setActiveWorkoutPathId: (state, action: PayloadAction<string | null>) => {
      state.activeWorkoutPathId = action.payload;
    },
  },
});

export const {
  markExerciseComplete,
  unmarkExerciseComplete,
  resetCompletedExercises,
  setCurrentExerciseIndex,
  setActiveWorkoutPathId,
} = workoutSlice.actions;

export default workoutSlice.reducer;
