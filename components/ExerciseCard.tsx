import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  onFavoritePress?: () => void;
  style?: ViewStyle;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPress,
  onFavoritePress,
  style,
}) => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            ...Shadows.sm,
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={Platform.OS === 'android' ? 0.85 : 1}
      >
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: colors.text,
                    fontWeight: FontWeights.semibold,
                  },
                ]}
                numberOfLines={2}
              >
                {exercise.name}
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: colors.textSecondary,
                    fontSize: FontSizes.sm,
                  },
                ]}
              >
                {exercise.type} • {exercise.muscle}
              </Text>
            </View>
            {onFavoritePress && (
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={onFavoritePress}
                hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
              >
                <View style={[
                  styles.favoriteIconContainer,
                  { backgroundColor: exercise.isFavorite ? colors.error + '15' : colors.overlay }
                ]}>
                  <Feather
                    name={exercise.isFavorite ? 'heart' : 'heart'}
                    size={20}
                    color={exercise.isFavorite ? colors.error : colors.textTertiary}
                    fill={exercise.isFavorite ? colors.error : 'none'}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.badgeRow}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(exercise.difficulty) + '15' },
              ]}
            >
              <Text
                style={[
                  styles.difficultyText,
                  {
                    color: getDifficultyColor(exercise.difficulty),
                    fontSize: FontSizes.xs,
                    fontWeight: FontWeights.semibold,
                  },
                ]}
              >
                {exercise.difficulty?.charAt(0).toUpperCase() +
                  exercise.difficulty?.slice(1)}
              </Text>
            </View>
            <View style={[
              styles.equipmentBadge,
              { backgroundColor: colors.cardSecondary }
            ]}>
              <Feather name="tool" size={12} color={colors.textTertiary} />
              <Text
                style={[
                  styles.equipmentText,
                  {
                    color: colors.textSecondary,
                    fontSize: FontSizes.xs,
                  },
                ]}
              >
                {exercise.equipment}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  cardContent: {
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  title: {
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * 1.3,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    lineHeight: FontSizes.sm * 1.3,
  },
  favoriteButton: {
    padding: Spacing.sm,
    marginRight: -Spacing.sm,
  },
  favoriteIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  difficultyText: {
    textTransform: 'capitalize',
  },
  equipmentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  equipmentText: {
    textTransform: 'capitalize',
  },
});
