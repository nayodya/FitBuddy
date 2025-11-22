import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Colors, FontSizes, FontWeights, Shadows } from '../../constants/styles';
import { HomeScreen } from '../../screens/HomeScreen';
import { ExercisesScreen } from '../../screens/ExercisesScreen';
import { WaterScreen } from '../../screens/WaterScreen';
import { FavoritesScreen } from '../../screens/FavoritesScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { ExerciseDetailScreen } from '../../screens/ExerciseDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="tabs"
        component={TabNavigator}
      />
      <Stack.Screen
        name="exercise-detail"
        component={ExerciseDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingVertical: 0,
          paddingBottom: 0,
          paddingHorizontal: 0,
          height: 70,
          ...Shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: FontSizes.xs,
          fontWeight: FontWeights.semibold,
          marginTop: 2,
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
          marginBottom: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          paddingVertical: 6,
          justifyContent: 'center',
          alignItems: 'center',
          height: 70,
        },
        headerStyle: {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
          fontWeight: FontWeights.semibold,
          fontSize: FontSizes.lg,
        },
      }}
    >
      <Tab.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="exercises"
        component={ExercisesScreen}
        options={{
          title: 'Exercises',
          tabBarLabel: 'Exercises',
          tabBarIcon: ({ color, size }) => (
            <Feather name="zap" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="water"
        component={WaterScreen}
        options={{
          title: 'Water',
          tabBarLabel: 'Water',
          tabBarIcon: ({ color, size }) => (
            <Feather name="droplet" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
