import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { resetStats } from '../store/slices/userStatsSlice';
import { storage, StorageKeys } from '../utils/storage';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';

export const ProfileScreen: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const dispatch = useDispatch();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const user = useSelector((state: RootState) => state.auth.user);
  const stats = useSelector((state: RootState) => state.userStats.stats);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Logout',
        onPress: async () => {
          dispatch(logout());
          await storage.removeItem(StorageKeys.AUTH_TOKEN);
          await storage.removeItem(StorageKeys.USER);
          router.replace('/(auth)/login' as never);
        },
        style: 'destructive',
      },
    ]);
  };

  const StatCard = ({ icon, label, value, color }: any) => (
    <Animated.View style={[
      styles.statCard,
      {
        backgroundColor: colors.card,
        borderColor: colors.border,
        opacity: fadeAnim,
      },
      Shadows.sm,
    ]}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
        <Feather name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color: colors.text, fontWeight: FontWeights.bold, marginTop: Spacing.md }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: FontSizes.xs, marginTop: Spacing.xs }]}>
        {label}
      </Text>
    </Animated.View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* User Info Card */}
      <Animated.View
        style={[
          styles.userCard,
          {
            backgroundColor: colors.primary,
            opacity: fadeAnim,
          },
          Shadows.md,
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
          <Feather name="user" size={44} color="#FFFFFF" />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: '#FFFFFF', fontWeight: FontWeights.bold }]}>
            {user?.username || 'User'}
          </Text>
          <Text style={[styles.userEmail, { color: '#FFFFFF' + 'AA', fontSize: FontSizes.sm, marginTop: Spacing.xs }]}>
            {user?.email}
          </Text>
        </View>
      </Animated.View>

      {/* Stats Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontWeight: FontWeights.bold }]}>
          Today's Progress
        </Text>
        <View style={styles.statsGrid}>
          <StatCard
            icon="droplet"
            label="Water Intake"
            value={`${stats.waterIntake} ml`}
            color={colors.accent}
          />
          <StatCard
            icon="zap"
            label="Calories Burned"
            value={`${stats.caloriesBurned} kcal`}
            color={colors.success}
          />
        </View>
      </Animated.View>

      {/* Settings Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontWeight: FontWeights.bold }]}>
          Preferences
        </Text>

        <View
          style={[
            styles.settingCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
            Shadows.sm,
          ]}
        >
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <View style={styles.settingLabel}>
                {isDark ? (
                  <Feather name="moon" size={20} color={colors.primary} />
                ) : (
                  <Feather name="sun" size={20} color={colors.warning} />
                )}
                <Text style={[styles.settingText, { color: colors.text, marginLeft: Spacing.md }]}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary + '50' }}
                thumbColor={isDark ? colors.primary : colors.warning}
                style={{ transform: [{ scale: 0.9 }] }}
              />
            </View>
          </View>
        </View>
      </Animated.View>

      {/* About Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.cardSecondary,
              borderColor: colors.border,
            },
          ]}
        >
          <Feather name="info" size={20} color={colors.primary} />
          <View style={{ flex: 1, marginLeft: Spacing.md }}>
            <Text style={[styles.infoTitle, { color: colors.text, fontWeight: FontWeights.semibold }]}>
              FitBuddy v1.0
            </Text>
            <Text style={[styles.infoSubtitle, { color: colors.textSecondary, fontSize: FontSizes.sm, marginTop: Spacing.xs }]}>
              Your Personal Fitness Companion
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Logout Button */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          icon={<Feather name="log-out" size={18} color="#FFFFFF" />}
        />
      </Animated.View>

      <View style={{ height: Spacing.lg }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  userCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.lg,
  },
  userEmail: {
    fontSize: FontSizes.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.lg,
  },
  statLabel: {
    marginTop: Spacing.xs,
  },
  settingCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    padding: Spacing.md,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: FontSizes.md,
  },
  infoCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: FontSizes.md,
  },
  infoSubtitle: {
    fontSize: FontSizes.sm,
  },
});
