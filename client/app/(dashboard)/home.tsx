import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../lib/hooks/useAuth";
import { Screen } from "../../components/Screen";
import { router } from "expo-router";
import { Button } from "@/components/Button";
import { LogoutLoader } from "@/components/auth/LogoutLoader";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const [showLogoutLoader, setShowLogoutLoader] = useState(false);
  const handleLogout = () => {
    setShowLogoutLoader(true);
  }

  if (showLogoutLoader) {
    return <LogoutLoader visible={showLogoutLoader} onComplete={() => setShowLogoutLoader(false)} />;
  }

  return (
    <Screen>
      <View>
        <Text>Dashboard</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </Screen >
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
