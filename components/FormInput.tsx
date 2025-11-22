import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: string;
}

export const FormInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  editable = true,
  style,
  inputStyle,
  keyboardType = 'default',
  icon,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const [isFocused, setIsFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(!secureTextEntry);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(focusAnim, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.spring(focusAnim, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text, fontWeight: FontWeights.semibold }]}>
          {label}
        </Text>
      )}
      <Animated.View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.card,
            borderColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 2,
            elevation: 1,
          },
        ]}
      >
        {icon && (
          <Feather 
            name={icon as any} 
            size={18} 
            color={isFocused ? colors.primary : colors.textTertiary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: FontSizes.md,
              paddingLeft: icon ? 0 : Spacing.md,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={editable}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    gap: Spacing.sm,
  },
  icon: {
    marginLeft: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
  },
  errorText: {
    fontSize: FontSizes.xs,
    marginTop: Spacing.sm,
    fontWeight: FontWeights.medium,
  },
});
