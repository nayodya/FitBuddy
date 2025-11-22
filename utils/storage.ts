import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  AUTH_TOKEN: 'fitbuddy_auth_token',
  USER: 'fitbuddy_user',
  FAVORITES: 'fitbuddy_favorites',
  THEME: 'fitbuddy_theme',
  USER_STATS: 'fitbuddy_user_stats',
};

export const storage = {
  setItem: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to storage: ${key}`, error);
    }
  },

  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  },
};
