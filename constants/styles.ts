export const Colors = {
  light: {
    background: '#FAFBFC',
    text: '#0F1419',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    border: '#E2E8F0',
    primary: '#5D4E8C',
    primaryLight: '#7E6FA0',
    primaryDark: '#483A6F',
    accent: '#00D9FF',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    card: '#FFFFFF',
    cardSecondary: '#F8FAFC',
    tabBar: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.04)',
  },
  dark: {
    background: '#0D1117',
    text: '#FFFFFF',
    textSecondary: '#B0BAC9',
    textTertiary: '#8892A8',
    border: '#21262D',
    primary: '#7E6FA0',
    primaryLight: '#9B8BB8',
    primaryDark: '#6355A0',
    accent: '#00D9FF',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    errorLight: '#7F1D1D',
    card: '#161B22',
    cardSecondary: '#0D1117',
    tabBar: '#161B22',
    overlay: 'rgba(255, 255, 255, 0.05)',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const FontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
