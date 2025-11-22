import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WellnessTip {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'nutrition' | 'fitness' | 'mental';
  icon?: string;
  isFavorite?: boolean;
}

interface WellnessTipsState {
  items: WellnessTip[];
  currentIndex: number;
  favorites: string[];
}

const initialState: WellnessTipsState = {
  items: [
    {
      id: '1',
      title: 'Stay Hydrated',
      description: 'Drink 8-10 glasses of water daily to keep your body functioning optimally.',
      category: 'health',
      icon: 'droplet',
    },
    {
      id: '2',
      title: 'Morning Stretches',
      description: 'Start your day with 5-10 minutes of stretching to improve flexibility and reduce tension.',
      category: 'fitness',
      icon: 'activity',
    },
    {
      id: '3',
      title: 'Balanced Nutrition',
      description: 'Eat a mix of proteins, carbs, and healthy fats for sustained energy throughout the day.',
      category: 'nutrition',
      icon: 'fork-knife',
    },
    {
      id: '4',
      title: 'Quality Sleep',
      description: 'Aim for 7-9 hours of quality sleep to support recovery and overall wellness.',
      category: 'health',
      icon: 'moon',
    },
    {
      id: '5',
      title: 'Mindful Breathing',
      description: 'Practice deep breathing exercises for 5 minutes to reduce stress and improve focus.',
      category: 'mental',
      icon: 'wind',
    },
    {
      id: '6',
      title: 'Active Recovery',
      description: 'On rest days, do light activities like walking or yoga to aid muscle recovery.',
      category: 'fitness',
      icon: 'heart',
    },
  ],
  currentIndex: 0,
  favorites: [],
};

const wellnessTipsSlice = createSlice({
  name: 'wellnessTips',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setTips: (state, action: PayloadAction<WellnessTip[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setCurrentIndex, addFavorite, removeFavorite, setTips } =
  wellnessTipsSlice.actions;
export default wellnessTipsSlice.reducer;
