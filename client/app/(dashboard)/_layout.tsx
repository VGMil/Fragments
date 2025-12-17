import React from "react";
import { Stack } from "expo-router";
import { Header } from "../../components/Header";

export default function DashboardLayout() {
    return <Stack screenOptions={{
        header: () => <Header transparent />,
        headerTransparent: true
    }}>
        <Stack.Screen name="home" />
    </Stack>
}