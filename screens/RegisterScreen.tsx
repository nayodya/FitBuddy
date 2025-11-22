import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { registerValidationSchema } from '../utils/validations';
import { authService } from '../services/authService';
import { registerSuccess, loginFailure, setLoading } from '../store/slices/authSlice';
import { storage, StorageKeys } from '../utils/storage';
import { Colors, Spacing, FontSizes, FontWeights } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterScreen: React.FC = () => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const user = await authService.register(data.username, data.email, data.password);

      // Save user and token to storage
      await storage.setItem(StorageKeys.USER, user);
      await storage.setItem(StorageKeys.AUTH_TOKEN, `token_${user.id}`);

      dispatch(registerSuccess(user));
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(loginFailure(errorMessage));
      Alert.alert('Registration Error', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const navigateToLogin = () => {
    router.push('/(auth)/login' as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text, fontWeight: FontWeights.bold }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join FitBuddy Today
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Username"
                placeholder="Choose a username"
                value={value}
                onChangeText={onChange}
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Password"
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
                secureTextEntry
              />
            )}
          />

          <Button
            title={isLoading ? 'Creating Account...' : 'Register'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            loading={isLoading}
            style={styles.registerButton}
          />

          <View style={styles.divider} />

          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
            <Text
              style={[styles.loginLink, { color: colors.primary, fontWeight: FontWeights.semibold }]}
              onPress={navigateToLogin}
            >
              Login here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  form: {
    marginBottom: Spacing.xxl,
  },
  registerButton: {
    marginTop: Spacing.lg,
    height: 50,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: Spacing.lg,
  },
  loginText: {
    textAlign: 'center',
    fontSize: FontSizes.sm,
  },
  loginLink: {
    textDecorationLine: 'underline',
  },
});
