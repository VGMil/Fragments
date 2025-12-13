import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';
import { Battery as BatteryIcon, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from 'lucide-react-native';

export const BatteryDisplay = () => {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [batteryState, setBatteryState] = useState<Battery.BatteryState>(Battery.BatteryState.UNKNOWN);

    useEffect(() => {
        let levelSubscription: Battery.Subscription | null = null;
        let stateSubscription: Battery.Subscription | null = null;

        const getBatteryStatus = async () => {
            const level = await Battery.getBatteryLevelAsync();
            const state = await Battery.getBatteryStateAsync();
            setBatteryLevel(level);
            setBatteryState(state);
        };

        getBatteryStatus();

        levelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            setBatteryLevel(batteryLevel);
        });

        stateSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
            setBatteryState(batteryState);
        });

        // Polling interval for robust updates (every 10 seconds)
        const timer = setInterval(getBatteryStatus, 10000);

        return () => {
            levelSubscription?.remove();
            stateSubscription?.remove();
            clearInterval(timer);
        };
    }, []);

    const level = batteryLevel ?? 1;
    const isCharging = batteryState === Battery.BatteryState.CHARGING;
    const percentage = Math.round(level * 100);

    // Determine Icon and Color
    let IconComponent = BatteryIcon;
    let color = '#ECECFA'; // Default off-white

    if (isCharging) {
        IconComponent = BatteryCharging;
        color = '#FFC857'; // Gold for charging
    } else {
        if (level > 0.75) {
            IconComponent = BatteryFull;
            color = '#55B84B'; // Green
        } else if (level > 0.50) {
            IconComponent = BatteryMedium;
            color = '#55B84B'; // Green
        } else if (level > 0.20) {
            IconComponent = BatteryMedium; // Lucide has Low/Medium/Full
            color = '#F29F38'; // Orange
        } else {
            IconComponent = BatteryLow; // Or BatteryWarning
            color = '#D72F2F'; // Red
        }
    }

    return (
        <View style={styles.container}>
            <IconComponent size={24} color={color} />
            <Text style={[styles.text, { color: color }]}>{percentage}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        fontFamily: 'VT323_400Regular',
        fontSize: 24,
        includeFontPadding: false,
        textAlignVertical: 'center',
    }
});
