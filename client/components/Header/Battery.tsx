import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium } from 'lucide-react-native';
import { useBattery } from '@/lib/hooks/useBattery';

export const BatteryDisplay = () => {
    const { level, isCharging, percentage } = useBattery();

    // Determine Icon and Color
    let IconComponent = Battery;
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
            IconComponent = BatteryMedium;
            color = '#F29F38'; // Orange
        } else {
            IconComponent = BatteryLow;
            color = '#D72F2F'; // Red
        }
    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.text, { color: color }]}>{percentage}%</Text>
            <IconComponent size={14} color={color} strokeWidth={2.5} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Consistent dark background
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    text: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 10,
        includeFontPadding: false,
        textAlignVertical: 'center',
        lineHeight: 12,
        letterSpacing: 1, // Add spacing for retro feel
    }
});
