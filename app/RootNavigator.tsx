import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { Redirect } from 'expo-router';
import { RootState } from '../store';
import { restoreAuth } from '../store/slices/authSlice';
import { storage, StorageKeys } from '../utils/storage';
import { setFavorites } from '../store/slices/favoritesSlice';

export default function RootNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isRestoring, setIsRestoring] = React.useState(true);

  useEffect(() => {
    const restoreState = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        const user = await storage.getItem(StorageKeys.USER);
        const token = await storage.getItem(StorageKeys.AUTH_TOKEN);
        const favorites = await storage.getItem(StorageKeys.FAVORITES);

        if (user && token) {
          dispatch(restoreAuth(user));
        }

        if (favorites) {
          dispatch(setFavorites(favorites));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setIsRestoring(false);
      }
    };

    restoreState();
  }, [dispatch]);

  if (isRestoring) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)" />;
}
