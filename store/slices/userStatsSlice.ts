import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStats } from '../../types';

interface UserStatsState {
  stats: UserStats;
  isLoading: boolean;
}

const initialState: UserStatsState = {
  stats: {
    waterIntake: 0,
    caloriesBurned: 0,
    totalWorkoutTime: 0,
  },
  isLoading: false,
};

const userStatsSlice = createSlice({
  name: 'userStats',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<UserStats>) => {
      state.stats = action.payload;
    },
    updateWaterIntake: (state, action: PayloadAction<number>) => {
      state.stats.waterIntake = action.payload;
    },
    updateCaloriesBurned: (state, action: PayloadAction<number>) => {
      state.stats.caloriesBurned = action.payload;
    },
    updateWorkoutTime: (state, action: PayloadAction<number>) => {
      state.stats.totalWorkoutTime = action.payload;
    },
    resetStats: (state) => {
      state.stats = {
        waterIntake: 0,
        caloriesBurned: 0,
        totalWorkoutTime: 0,
      };
    },
  },
});

export const {
  setStats,
  updateWaterIntake,
  updateCaloriesBurned,
  updateWorkoutTime,
  resetStats,
} = userStatsSlice.actions;

export default userStatsSlice.reducer;
