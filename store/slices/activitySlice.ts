import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Activity {
  id: string;
  type: 'exercise' | 'water' | 'meal' | 'achievement';
  name: string;
  duration?: number; // minutes
  intensity?: 'light' | 'moderate' | 'intense';
  timestamp: string;
  icon?: string;
}

interface ActivityState {
  items: Activity[];
  loading: boolean;
}

const initialState: ActivityState = {
  items: [
    {
      id: '1',
      type: 'exercise',
      name: 'Push-ups',
      duration: 15,
      intensity: 'moderate',
      timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      icon: 'activity',
    },
    {
      id: '2',
      type: 'achievement',
      name: '7-day streak!',
      timestamp: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
      icon: 'award',
    },
    {
      id: '3',
      type: 'exercise',
      name: 'Running',
      duration: 30,
      intensity: 'intense',
      timestamp: new Date(Date.now() - 48 * 60 * 60000).toISOString(),
      icon: 'activity',
    },
  ],
  loading: false,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.items.unshift(action.payload);
    },
    removeActivity: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addActivity, removeActivity, setActivities, setLoading } =
  activitySlice.actions;
export default activitySlice.reducer;
