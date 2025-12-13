import React from "react";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { Header } from "../components/Header";
import { useFonts } from 'expo-font';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

export const RootScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ header: () => <Header /> }}>
        <Stack.Screen name="index" />
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
    <KeyboardProvider>
      <RootScreen />
    </KeyboardProvider>
  )
}
