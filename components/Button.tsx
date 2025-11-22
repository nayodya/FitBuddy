import React, { useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Animated,
  Platform,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.5 : 1,
      borderRadius: BorderRadius.md,
      ...Shadows.sm,
    };

    const sizeStyles = {
      small: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg, minHeight: 36 },
      medium: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, minHeight: 44 },
      large: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xxl, minHeight: 52 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.cardSecondary,
        borderWidth: 1,
        borderColor: colors.border,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
      },
      danger: {
        backgroundColor: colors.error,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const variantTextColors = {
      primary: '#FFFFFF',
      secondary: colors.text,
      outline: colors.primary,
      danger: '#FFFFFF',
      ghost: colors.primary,
    };

    return {
      color: variantTextColors[variant],
      fontSize: FontSizes.md,
      fontWeight: FontWeights.semibold,
    };
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={Platform.OS === 'android' ? 0.85 : 1}
      >
        {loading ? (
          <ActivityIndicator 
            color={variant === 'outline' || variant === 'ghost' ? colors.primary : '#FFFFFF'} 
            size="small"
          />
        ) : (
          <>
            {icon && <>{icon}</> }
            <Text style={[
              getTextStyle(), 
              icon ? { marginLeft: Spacing.sm } : undefined,
              textStyle
            ]}>
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
