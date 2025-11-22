import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { loginValidationSchema } from '../utils/validations';
import { authService } from '../services/authService';
import { loginSuccess, loginFailure, setLoading } from '../store/slices/authSlice';
import { storage, StorageKeys } from '../utils/storage';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius, Shadows } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginScreen: React.FC = () => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const user = await authService.login(data.email, data.password);
      
      await storage.setItem(StorageKeys.USER, user);
      await storage.setItem(StorageKeys.AUTH_TOKEN, `token_${user.id}`);

      dispatch(loginSuccess(user));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      Alert.alert('Login Error', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const navigateToRegister = () => {
    router.push('/(auth)/register' as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={[styles.logoContainer, { backgroundColor: colors.primary + '15' }]}>
            <Feather name="heart" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text, fontWeight: FontWeights.bold }]}>
            FitBuddy
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your Personal Fitness Companion
          </Text>
        </Animated.View>

        <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Email Address"
                placeholder="john@example.com"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                icon="mail"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                secureTextEntry
                icon="lock"
              />
            )}
          />

          <Button
            title={isLoading ? 'Logging in...' : 'Login'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            loading={isLoading}
            style={styles.loginButton}
          />

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[styles.registerText, { color: colors.textSecondary }]}>
            Don't have an account?{' '}
            <Text
              style={[styles.registerLink, { color: colors.primary, fontWeight: FontWeights.semibold }]}
              onPress={navigateToRegister}
            >
              Create one
            </Text>
          </Text>
        </Animated.View>

        <Animated.View style={[styles.demoCredentials, { 
          backgroundColor: colors.cardSecondary,
          borderColor: colors.border,
          opacity: fadeAnim 
        }]}>
          <View style={styles.demoHeader}>
            <Feather name="info" size={16} color={colors.primary} />
            <Text style={[styles.demoTitle, { color: colors.primary, fontWeight: FontWeights.semibold }]}>
              Demo Credentials
            </Text>
          </View>
          <Text style={[styles.demoText, { color: colors.textSecondary, fontSize: FontSizes.sm }]}>
            📧 john@example.com{'\n'}🔐 password123
          </Text>
        </Animated.View>
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
    marginBottom: Spacing.xxxl,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
  form: {
    marginBottom: Spacing.xxxl,
  },
  loginButton: {
    marginTop: Spacing.xl,
    height: 50,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.lg,
  },
  registerText: {
    textAlign: 'center',
    fontSize: FontSizes.sm,
  },
  registerLink: {
    textDecorationLine: 'underline',
  },
  demoCredentials: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginTop: Spacing.lg,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  demoTitle: {
    marginBottom: 0,
  },
  demoText: {
    lineHeight: 24,
  },
});
