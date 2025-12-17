import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar, View } from "react-native";
import { useFonts } from 'expo-font';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import * as SplashScreen from 'expo-splash-screen';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SessionProvider } from "@/lib/context/session.provider";
import { useSession } from "@/lib/hooks/useSession";

SplashScreen.preventAutoHideAsync();

export const RootScreen = () => {
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/login');
    } else if (session && inAuthGroup) {
      router.replace('/home');
    }
  }, [session, isLoading, segments]);

  if (isLoading) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade' }}>
        <Stack.Screen name="(dashboard)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </View>
  )
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PressStart2P_400Regular,
    VT323_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <SessionProvider>
      <KeyboardProvider>
        <RootScreen />
      </KeyboardProvider>
    </SessionProvider>
  )
}
