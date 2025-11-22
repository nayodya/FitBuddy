import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { RootState } from '../store';
import { ExerciseCard } from '../components/ExerciseCard';
import { Colors, Spacing, FontSizes, FontWeights } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { setSelectedExercise } from '../store/slices/exerciseSlice';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';

export const FavoritesScreen: React.FC = () => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const dispatch = useDispatch();
  
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleExercisePress = (exercise: any) => {
    dispatch(setSelectedExercise(exercise));
    router.push('/(app)/exercise-detail' as never);
  };

  const handleRemoveFavorite = (exercise: any) => {
    dispatch(removeFavorite(exercise.id));
  };

  const renderFavoriteCard = ({ item }: { item: any }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => handleExercisePress(item)}
      onFavoritePress={() => handleRemoveFavorite(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: colors.text, fontWeight: FontWeights.bold }]}>
        No Favorites Yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Mark exercises as favorites to save them here
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontWeight: FontWeights.bold }]}>
          Favorites
        </Text>
        {favorites.length > 0 && (
          <Text style={[styles.count, { color: colors.textSecondary, fontSize: FontSizes.sm }]}>
            {favorites.length} saved
          </Text>
        )}
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavoriteCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: FontSizes.xxl,
  },
  count: {
    marginTop: Spacing.sm,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
});
