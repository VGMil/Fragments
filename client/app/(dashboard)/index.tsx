import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Platform } from "react-native";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../../assets/images/owner/logo.svg";
import { useAuth } from "../../lib/hooks/useAuth";
import { Header } from "../../components/Header";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require('../../assets/images/owner/background.webp')}
        style={styles.background}
        imageStyle={{
          width: Platform.OS !== 'web' ? '200%' : '100%',
          left: Platform.OS !== 'web' ? '-60%' : '0%',
        }}
        resizeMode="cover"
      >
        {/* Reused Header Component */}
        <Header transparent />

        {/* Main Content Area (Empty for now to show castle) */}
        <View style={styles.content} />

        {/* Bottom Taskbar */}
        <View style={[
          styles.taskbar,
          {
            paddingBottom: Math.max(insets.bottom, 10),
            paddingTop: 10,
            minHeight: 60 + insets.bottom
          }
        ]}>
          <TouchableOpacity style={styles.startButton} onPress={() => { logout(() => { router.replace('/login') }) }}>
            <View style={styles.iconFrame}>
              <Logo width={30} height={30} color="#FFC857" />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',

  },
  content: {
    flex: 1,
  },
  taskbar: {
    backgroundColor: '#4B3D58', // Matches the purple tone in the image taskbar
    borderTopWidth: 4,
    borderTopColor: '#2C2C3E', // Dark border top
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    paddingVertical: 0
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFrame: {
    width: 40,
    height: 40,
    backgroundColor: '#2C2C3E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ECECFA',
    borderBottomWidth: 4,
    borderRightWidth: 4,
  }
});
