import React from "react";
import { Stack } from "expo-router";
import { ImageBackground } from "react-native";

export default function AuthLayout() {
    return (
        <ImageBackground
            source={require('../../assets/images/owner/background.webp')}
            style={{ flex: 1 }}
        >
            <Stack screenOptions={{
                headerShown: false,
                animation: 'none', // Disable default slide, handled by CRTTransition
                contentStyle: { backgroundColor: 'black' } // Transparent so ImageBackground shows
            }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="signup" />
            </Stack>
        </ImageBackground>
    );
}