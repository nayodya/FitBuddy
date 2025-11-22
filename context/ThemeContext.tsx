import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, StorageKeys } from '../utils/storage';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadThemePreference = async () => {
      const savedTheme = await storage.getItem(StorageKeys.THEME);
      if (savedTheme !== null) {
        setIsDark(savedTheme);
      }
      setIsLoading(false);
    };
    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await storage.setItem(StorageKeys.THEME, newTheme);
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
