import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import exerciseReducer from './slices/exerciseSlice';
import favoritesReducer from './slices/favoritesSlice';
import userStatsReducer from './slices/userStatsSlice';
import activityReducer from './slices/activitySlice';
import wellnessTipsReducer from './slices/wellnessTipsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    favorites: favoritesReducer,
    userStats: userStatsReducer,
    activity: activityReducer,
    wellnessTips: wellnessTipsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
