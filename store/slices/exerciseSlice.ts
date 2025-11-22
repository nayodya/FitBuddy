import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExerciseState, Exercise } from '../../types';

const initialState: ExerciseState = {
  items: [],
  isLoading: false,
  error: null,
  selectedExercise: null,
};

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedExercise: (state, action: PayloadAction<Exercise | null>) => {
      state.selectedExercise = action.payload;
    },
    fetchExercisesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchExercisesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setExercises,
  setSelectedExercise,
  fetchExercisesStart,
  fetchExercisesFailure,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
