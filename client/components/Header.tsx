import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BatteryDisplay } from './BatteryDisplay';

interface HeaderProps {
    transparent?: boolean;
}

export const Header = ({ transparent }: HeaderProps) => {
    const insets = useSafeAreaInsets();
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000 * 60); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const getFormattedDate = (date: Date) => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayName = days[date.getDay()];

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        const strMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${dayName} ${hours}:${strMinutes} ${ampm}`;
    };

    return (
        <View style={[
            styles.container,
            { paddingTop: insets.top },
            transparent && { backgroundColor: 'transparent' }
        ]}>
            <View style={styles.content}>
                <View style={styles.leftSection}>
                    <Text style={styles.text}>FRAGMENTS</Text>
                </View>
                <Text style={styles.text}>{getFormattedDate(date)}</Text>
                {Platform.OS === 'ios' || Platform.OS === 'android' ? <BatteryDisplay /> : null}
            </View>
            {!transparent && <View style={styles.borderBottom} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2C2C3E', // Dark pixel art blue/purple
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#ECECFA', // Off-white/Ghost white
        fontFamily: 'VT323_400Regular',
        fontSize: 24,
        letterSpacing: 0,
        textTransform: 'uppercase',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    borderBottom: {
        height: 4,
        backgroundColor: '#151520', // Darker shadow for "3D" pixel effect or just a border
        width: '100%',
    }
});
