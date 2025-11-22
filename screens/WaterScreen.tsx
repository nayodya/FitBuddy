import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../store';
import { updateWaterIntake, resetStats } from '../store/slices/userStatsSlice';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';

const screenWidth = Dimensions.get('window').width;
const dailyGoal = 3000; // 3 liters in ml

export const WaterScreen: React.FC = () => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const dispatch = useDispatch();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const stats = useSelector((state: RootState) => state.userStats.stats);
  const waterIntake = stats.waterIntake;
  const percentage = Math.min((waterIntake / dailyGoal) * 100, 100);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleAddWater = (amount: number) => {
    const newWaterIntake = waterIntake + amount;
    dispatch(updateWaterIntake(newWaterIntake));
  };

  const handleReset = () => {
    dispatch(updateWaterIntake(0));
  };

  const waterIntakeLog = [
    { time: '08:00 AM', amount: 250, icon: 'coffee' },
    { time: '11:30 AM', amount: 500, icon: 'droplet' },
    { time: '02:00 PM', amount: 250, icon: 'droplet' },
    { time: '05:00 PM', amount: 500, icon: 'droplet' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={[{ opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text, fontWeight: FontWeights.bold }]}>
            Hydration Tracker
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Stay hydrated throughout the day
          </Text>
        </View>

        {/* Progress Circle */}
        <View style={styles.circleContainer}>
          <View style={styles.circleWrapper}>
            {/* Background Circle */}
            <View style={[styles.progressCircle, { borderColor: colors.border }]} />
            
            {/* Filled Portion */}
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.accent,
                  height: `${percentage}%`,
                }
              ]}
            />

            {/* Text Content */}
            <View style={styles.circleText}>
              <Text style={[styles.percentage, { color: colors.primary }]}>
                {percentage.toFixed(0)}%
              </Text>
              <Text style={[styles.waterAmount, { color: colors.text }]}>
                {waterIntake} ml
              </Text>
              <Text style={[styles.goalText, { color: colors.textSecondary, fontSize: FontSizes.sm }]}>
                of {dailyGoal} ml goal
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Add Buttons */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontWeight: FontWeights.bold }]}>
            Quick Add
          </Text>
          <View style={styles.buttonGrid}>
            <Button
              title="250 ml"
              onPress={() => handleAddWater(250)}
              variant="secondary"
              icon={<Feather name="droplet" size={16} color={colors.text} />}
              style={styles.gridButton}
            />
            <Button
              title="500 ml"
              onPress={() => handleAddWater(500)}
              variant="secondary"
              icon={<Feather name="droplet" size={16} color={colors.text} />}
              style={styles.gridButton}
            />
            <Button
              title="750 ml"
              onPress={() => handleAddWater(750)}
              variant="secondary"
              icon={<Feather name="droplet" size={16} color={colors.text} />}
              style={styles.gridButton}
            />
            <Button
              title="1000 ml"
              onPress={() => handleAddWater(1000)}
              variant="secondary"
              icon={<Feather name="droplet" size={16} color={colors.text} />}
              style={styles.gridButton}
            />
          </View>
        </View>

        {/* Custom Amount */}
        <View style={styles.section}>
          <Button
            title="Reset Daily Intake"
            onPress={handleReset}
            variant="outline"
            icon={<Feather name="refresh-cw" size={16} color={colors.primary} />}
          />
        </View>

        {/* Tips Section */}
        <View
          style={[
            styles.tipsCard,
            { backgroundColor: colors.accent + '15', borderColor: colors.accent }
          ]}
        >
          <View style={styles.tipsHeader}>
            <Feather name="info" size={20} color={colors.accent} />
            <Text
              style={[
                styles.tipsTitle,
                { color: colors.accent, fontWeight: FontWeights.semibold, marginLeft: Spacing.md }
              ]}
            >
              Hydration Tips
            </Text>
          </View>
          <Text style={[styles.tipsContent, { color: colors.textSecondary, marginTop: Spacing.md }]}>
            • Drink water before, during, and after exercise{'\n'}
            • Aim for 8-10 glasses (2-3 liters) daily{'\n'}
            • More if you're exercising or in hot weather{'\n'}
            • Monitor urine color for hydration level
          </Text>
        </View>

        {/* Hydration Levels Chart */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontWeight: FontWeights.bold }]}>
            Hydration Levels
          </Text>
          <View style={styles.levelsContainer}>
            <View
              style={[
                styles.levelItem,
                { backgroundColor: colors.error + '20', borderColor: colors.error }
              ]}
            >
              <Text style={[styles.levelIcon]}>😰</Text>
              <Text style={[styles.levelValue, { color: colors.error, fontWeight: FontWeights.semibold }]}>
                Dehydrated
              </Text>
              <Text style={[styles.levelLabel, { color: colors.textSecondary, fontSize: FontSizes.xs }]}>
                &lt; 1000 ml
              </Text>
            </View>
            <View
              style={[
                styles.levelItem,
                { backgroundColor: colors.warning + '20', borderColor: colors.warning }
              ]}
            >
              <Text style={[styles.levelIcon]}>🙂</Text>
              <Text style={[styles.levelValue, { color: colors.warning, fontWeight: FontWeights.semibold }]}>
                Good
              </Text>
              <Text style={[styles.levelLabel, { color: colors.textSecondary, fontSize: FontSizes.xs }]}>
                1000 - 2000 ml
              </Text>
            </View>
            <View
              style={[
                styles.levelItem,
                { backgroundColor: colors.success + '20', borderColor: colors.success }
              ]}
            >
              <Text style={[styles.levelIcon]}>💪</Text>
              <Text style={[styles.levelValue, { color: colors.success, fontWeight: FontWeights.semibold }]}>
                Excellent
              </Text>
              <Text style={[styles.levelLabel, { color: colors.textSecondary, fontSize: FontSizes.xs }]}>
                &gt; 2000 ml
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: Spacing.lg }} />
      </Animated.View>
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
  header: {
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSizes.xxl,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  circleWrapper: {
    position: 'relative',
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 8,
    borderRadius: 80,
  },
  progressFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 80,
    opacity: 0.3,
  },
  circleText: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  percentage: {
    fontSize: 40,
    fontWeight: '700',
  },
  waterAmount: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    marginTop: Spacing.xs,
  },
  goalText: {
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.md,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  gridButton: {
    flex: 1,
    minWidth: '48%',
    height: 44,
  },
  tipsCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipsTitle: {
    fontSize: FontSizes.md,
  },
  tipsContent: {
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * 1.8,
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  levelItem: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    alignItems: 'center',
  },
  levelIcon: {
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  levelValue: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  levelLabel: {
    textAlign: 'center',
  },
});
