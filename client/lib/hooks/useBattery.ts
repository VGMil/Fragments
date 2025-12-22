import { useState, useEffect } from 'react';
import * as Battery from 'expo-battery';

export const useBattery = () => {
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

    return {
        level,
        batteryState,
        isCharging,
        percentage
    };
};
