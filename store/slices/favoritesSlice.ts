import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '../../types';

interface FavoritesState {
  items: Exercise[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Exercise[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    addFavorite: (state, action: PayloadAction<Exercise>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, isFavorite: true });
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
  setLoading,
  setError,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
