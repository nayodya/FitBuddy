import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BorderRadius, Colors, FontSizes, FontWeights, Shadows, Spacing } from '../constants/styles';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store';
import { addActivity } from '../store/slices/activitySlice';
import { updateWaterIntake } from '../store/slices/userStatsSlice';
import { addFavorite, removeFavorite, setCurrentIndex } from '../store/slices/wellnessTipsSlice';

const screenWidth = Dimensions.get('window').width;

export const HomeScreen: React.FC = () => {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const dispatch = useDispatch();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [tipsScrollPosition, setTipsScrollPosition] = useState(0);

  const user = useSelector((state: RootState) => state.auth.user);
  const stats = useSelector((state: RootState) => state.userStats.stats);
  const activities = useSelector((state: RootState) => state.activity.items);
  const wellnessTips = useSelector((state: RootState) => state.wellnessTips.items);
  const tipsFavorites = useSelector((state: RootState) => state.wellnessTips.favorites);
  const currentTipIndex = useSelector((state: RootState) => state.wellnessTips.currentIndex);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleQuickWater = () => {
    dispatch(updateWaterIntake(stats.waterIntake + 250));
    dispatch(
      addActivity({
        id: Date.now().toString(),
        type: 'water',
        name: 'Water intake',
        timestamp: new Date().toISOString(),
        icon: 'droplet',
      })
    );
  };

  const handleStartWorkout = () => {
    router.push('/(app)/exercises' as never);
  };

  const currentTip = wellnessTips[currentTipIndex];
  const isTipFavorited = tipsFavorites.includes(currentTip?.id);

  const handleTipFavorite = () => {
    if (isTipFavorited) {
      dispatch(removeFavorite(currentTip.id));
    } else {
      dispatch(addFavorite(currentTip.id));
    }
  };

  const handleTipsScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    if (index !== currentTipIndex && index < wellnessTips.length) {
      dispatch(setCurrentIndex(index));
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={[{ opacity: fadeAnim }]}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerContent}>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Hello, {user?.username || 'there'}! 👋
            </Text>
            <Text style={[styles.headerTitle, { color: colors.text, fontWeight: FontWeights.bold }]}>
              Today's Overview
            </Text>
          </View>
        </View>

        {/* Daily Stats Cards */}
        <View style={styles.statsContainer}>
          {/* Water */}
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleQuickWater}
            activeOpacity={0.7}
          >
            <View style={[styles.statIconBg, { backgroundColor: colors.accent + '20' }]}>
              <Feather name="droplet" size={24} color={colors.accent} />
            </View>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: colors.text, fontWeight: FontWeights.bold }]}>
                {stats.waterIntake} ml
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: FontSizes.xs }]}>
                Water intake
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Wellness Tip Carousel */}
        {wellnessTips.length > 0 && (
          <View style={styles.tipsSection}>
            <View style={styles.tipsHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontWeight: FontWeights.bold }]}>
                Wellness Tip
              </Text>
              <Text style={[styles.tipIndicator, { color: colors.textSecondary, fontSize: FontSizes.xs }]}>
                {currentTipIndex + 1} / {wellnessTips.length}
              </Text>
            </View>

            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleTipsScroll}
              style={styles.tipsCarousel}
              scrollEventThrottle={16}
            >
              {wellnessTips.map(tip => (
                <View key={tip.id} style={[styles.tipCard, { width: screenWidth - Spacing.md * 2, backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={styles.tipContent}>
                    <View style={styles.tipTitleRow}>
                      <Feather name={tip.icon as any || 'award'} size={20} color={colors.primary} />
                      <Text style={[styles.tipTitle, { color: colors.text, fontWeight: FontWeights.semibold, marginLeft: Spacing.md }]}>
                        {tip.title}
                      </Text>
                    </View>
                    <Text style={[styles.tipDescription, { color: colors.textSecondary, marginTop: Spacing.md }]}>
                      {tip.description}
                    </Text>
                    <TouchableOpacity
                      style={styles.tipFavoriteButton}
                      onPress={handleTipFavorite}
                    >
                      <Feather
                        name={isTipFavorited ? 'heart' : 'heart'}
                        size={20}
                        color={isTipFavorited ? colors.error : colors.textTertiary}
                        fill={isTipFavorited ? colors.error : 'none'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Carousel Dots */}
            <View style={styles.dotsContainer}>
              {wellnessTips.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: index === currentTipIndex ? colors.primary : colors.border,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/(app)/exercises' as never)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: colors.primary + '20' }]}>
                <Feather name="activity" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.text, fontWeight: FontWeights.semibold }]}>
                Exercises
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/(app)/water' as never)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: colors.accent + '20' }]}>
                <Feather name="droplet" size={24} color={colors.accent} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.text, fontWeight: FontWeights.semibold }]}>
                Water
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/(app)/favorites' as never)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: colors.error + '20' }]}>
                <Feather name="heart" size={24} color={colors.error} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.text, fontWeight: FontWeights.semibold }]}>
                Favorites
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/(app)/profile' as never)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: colors.success + '20' }]}>
                <Feather name="user" size={24} color={colors.success} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.text, fontWeight: FontWeights.semibold }]}>
                Profile
              </Text>
            </TouchableOpacity>
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
  headerSection: {
    marginBottom: Spacing.xl,
  },
  headerContent: {
    marginBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
  },
  statsContainer: {
    marginBottom: Spacing.xl,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: FontSizes.md,
  },
  statLabel: {
    marginTop: Spacing.xs,
  },
  quickActionsSection: {
    marginBottom: Spacing.xl,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickActionCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  actionIconBg: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  actionLabel: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
    height: 44,
  },
  categoriesSection: {
    marginBottom: Spacing.xl,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  categoryCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoryName: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  categoryCount: {
    textAlign: 'center',
  },
  tipsSection: {
    marginBottom: Spacing.xl,
  },
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  tipIndicator: {
    backgroundColor: 'transparent',
  },
  tipsCarousel: {
    marginHorizontal: -Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  tipCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  tipContent: {
    flex: 1,
  },
  tipTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: FontSizes.md,
  },
  tipDescription: {
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * 1.6,
  },
  tipFavoriteButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    padding: Spacing.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
