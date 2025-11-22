import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ExerciseCard } from '../components/ExerciseCard';
import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';
import { exerciseService } from '../services/exerciseService';
import { RootState } from '../store';
import { fetchExercisesFailure, fetchExercisesStart, setExercises, setSelectedExercise } from '../store/slices/exerciseSlice';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';

export const ExercisesScreen: React.FC = () => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const { items: exercises, isLoading, error } = useSelector((state: RootState) => state.exercises);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    loadExercises();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadExercises = async () => {
    try {
      dispatch(fetchExercisesStart());
      const data = await exerciseService.fetchExercises();
      const dataWithFavorites = data.map(ex => ({
        ...ex,
        isFavorite: favorites.some(fav => fav.id === ex.id),
      }));
      dispatch(setExercises(dataWithFavorites));
    } catch (err) {
      dispatch(fetchExercisesFailure(err instanceof Error ? err.message : 'Failed to load exercises'));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExercises();
    setRefreshing(false);
  };

  const handleExercisePress = (exercise: any) => {
    dispatch(setSelectedExercise(exercise));
    router.push('/(app)/exercise-detail' as never);
  };

  const handleFavoritePress = (exercise: any) => {
    if (exercise.isFavorite) {
      dispatch(removeFavorite(exercise.id));
    } else {
      dispatch(addFavorite(exercise));
    }
  };

  const filteredExercises = exercises.filter(ex =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.muscle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExerciseCard = ({ item }: { item: any }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => handleExercisePress(item)}
      onFavoritePress={() => handleFavoritePress(item)}
    />
  );

  const renderHeader = () => (
    <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
      <View style={styles.titleSection}>
        <Text style={[styles.greeting, { color: colors.textSecondary, fontWeight: FontWeights.medium }]}>
          Find Your Workout
        </Text>
        <Text style={[styles.title, { color: colors.text, fontWeight: FontWeights.bold }]}>
          All Exercises
        </Text>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            ...Shadows.sm,
          },
        ]}
      >
        <Feather name="search" size={18} color={colors.textTertiary} />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: colors.text,
            },
          ]}
          placeholder="Find exercises..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery && (
          <Feather 
            name="x" 
            size={18} 
            color={colors.textTertiary}
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>

      {filteredExercises.length > 0 && (
        <Text style={[styles.resultCount, { color: colors.textSecondary, fontSize: FontSizes.sm }]}>
          {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
        </Text>
      )}
    </Animated.View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="inbox" size={48} color={colors.textTertiary} />
      <Text style={[styles.emptyText, { color: colors.text, fontWeight: FontWeights.semibold, marginTop: Spacing.md }]}>
        {searchQuery ? 'No exercises found' : 'No exercises available'}
      </Text>
      {searchQuery && (
        <Text style={[styles.emptySubtext, { color: colors.textSecondary, marginTop: Spacing.sm }]}>
          Try a different search term
        </Text>
      )}
    </View>
  );

  if (isLoading && exercises.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredExercises}
        renderItem={renderExerciseCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
      {error && (
        <View style={[styles.errorBanner, { backgroundColor: colors.error + '15' }]}>
          <Feather name="alert-circle" size={16} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error, marginLeft: Spacing.sm }]}>
            {error}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  headerContainer: {
    marginBottom: Spacing.lg,
  },
  titleSection: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.xxl,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    height: 44,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
  },
  resultCount: {
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyText: {
    fontSize: FontSizes.lg,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
  },
  errorBanner: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  errorText: {
    fontSize: FontSizes.sm,
    fontWeight: '600' as const,
    flex: 1,
  },
});
