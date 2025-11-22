import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { store } from '../store';
import { ThemeProvider } from '../context/ThemeContext';
import RootNavigator from './RootNavigator';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </ReduxProvider>
  );
}
