import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RootState } from '../store';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';

export const ExerciseDetailScreen: React.FC = () => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const exercise = useSelector((state: RootState) => state.exercises.selectedExercise);
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some(fav => fav.id === exercise?.id)
  );

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  if (!exercise) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>Exercise not found</Text>
      </View>
    );
  }

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(removeFavorite(exercise.id));
    } else {
      dispatch(addFavorite(exercise));
    }
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

  const InfoBlock = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <View style={[
      styles.infoBlock,
      { backgroundColor: colors.cardSecondary, borderColor: colors.border }
    ]}>
      <Feather name={icon as any} size={20} color={colors.primary} />
      <View style={{ flex: 1, marginLeft: Spacing.md }}>
        <Text style={[styles.infoLabel, { color: colors.textSecondary, fontSize: FontSizes.sm }]}>
          {label}
        </Text>
        <Text
          style={[
            styles.infoValue,
            {
              color: colors.text,
              fontSize: FontSizes.md,
              fontWeight: FontWeights.semibold,
              marginTop: Spacing.xs,
            },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        >
          <Feather name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
              fontWeight: FontWeights.semibold,
            },
          ]}
          numberOfLines={1}
        >
          Exercise Details
        </Text>
        <TouchableOpacity
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Animated.View>
            <Feather
              name={isFavorite ? 'heart' : 'heart'}
              size={24}
              color={isFavorite ? colors.error : colors.textSecondary}
              fill={isFavorite ? colors.error : 'none'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Hero Section */}
          <View
            style={[
              styles.heroSection,
              {
                backgroundColor: colors.primary + '12',
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.exerciseName,
                {
                  color: colors.text,
                  fontWeight: FontWeights.bold,
                },
              ]}
            >
              {exercise.name}
            </Text>
            <View style={styles.tagsContainer}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.primary + '20',
                  },
                ]}
              >
                <Feather name="zap" size={14} color={colors.primary} />
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: colors.primary,
                      fontSize: FontSizes.xs,
                      fontWeight: FontWeights.semibold,
                      marginLeft: Spacing.xs,
                    },
                  ]}
                >
                  {exercise.type}
                </Text>
              </View>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.success + '20',
                  },
                ]}
              >
                <Feather name="activity" size={14} color={colors.success} />
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: colors.success,
                      fontSize: FontSizes.xs,
                      fontWeight: FontWeights.semibold,
                      marginLeft: Spacing.xs,
                    },
                  ]}
                >
                  {exercise.muscle}
                </Text>
              </View>
            </View>
          </View>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <InfoBlock
              icon="trending-up"
              label="Difficulty"
              value={exercise.difficulty?.charAt(0).toUpperCase() + exercise.difficulty?.slice(1)}
            />
            <InfoBlock
              icon="tool"
              label="Equipment"
              value={exercise.equipment}
            />
          </View>

          {/* Instructions Section */}
          {exercise.instructions && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="list" size={20} color={colors.primary} />
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.text,
                      fontWeight: FontWeights.bold,
                      marginLeft: Spacing.md,
                    },
                  ]}
                >
                  Instructions
                </Text>
              </View>
              <Text
                style={[
                  styles.sectionContent,
                  {
                    color: colors.textSecondary,
                    fontSize: FontSizes.md,
                    lineHeight: FontSizes.md * 1.6,
                    marginTop: Spacing.md,
                  },
                ]}
              >
                {exercise.instructions}
              </Text>
            </View>
          )}

          {/* Wellness Tip Section */}
          <View
            style={[
              styles.tipsSection,
              {
                backgroundColor: colors.warning + '10',
                borderColor: colors.warning + '30',
              },
            ]}
          >
            <View style={styles.tipHeader}>
              <Feather name="award" size={20} color={colors.warning} />
              <Text
                style={[
                  styles.tipsTitle,
                  {
                    color: colors.warning,
                    fontWeight: FontWeights.bold,
                    marginLeft: Spacing.md,
                  },
                ]}
              >
                Wellness Tip
              </Text>
            </View>
            <Text
              style={[
                styles.tipsContent,
                {
                  color: colors.textSecondary,
                  fontSize: FontSizes.md,
                  lineHeight: FontSizes.md * 1.6,
                  marginTop: Spacing.md,
                },
              ]}
            >
              Always warm up before starting any exercise. Maintain proper form and listen to your body. Stay hydrated throughout your workout!
            </Text>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: Spacing.lg }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  headerTitle: {
    flex: 1,
    fontSize: FontSizes.lg,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  heroSection: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  exerciseName: {
    fontSize: FontSizes.xxxl,
    marginBottom: Spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    textTransform: 'capitalize',
  },
  infoGrid: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoBlock: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    marginBottom: Spacing.xs,
  },
  infoValue: {
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
  },
  sectionContent: {
    marginBottom: Spacing.md,
  },
  tipsSection: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipsTitle: {
    fontSize: FontSizes.lg,
  },
  tipsContent: {
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
