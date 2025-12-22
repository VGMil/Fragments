import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Coins, Diamond, Gem } from 'lucide-react-native';

interface CurrenciesProps {
    ach: number;
    frg: number;
}

export const Currencies = ({ ach, frg }: CurrenciesProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const formatValue = (val: number) => val.toString().padStart(3, '0');

    // Fixed size for icons and container to ensure perfect vertical alignment
    const ICON_SIZE = 12;

    return (
        <View style={[
            styles.container,
            isMobile && styles.containerMobile
        ]}>
            <View style={styles.currencyGroup}>
                <Text style={{ ...styles.currencyText, color: '#FFD700' }}>[</Text>
                <View style={styles.iconContainer}>
                    <Coins size={isMobile ? ICON_SIZE : 12} color="#FFD700" strokeWidth={2.5} />
                </View>
                <Text style={[styles.achText, { color: '#FFD700' }]}>
                    {formatValue(ach)}{!isMobile && ' ACH'}
                </Text>
                <Text style={{ ...styles.currencyText, color: '#FFD700' }}>]</Text>
            </View>

            <View style={styles.currencyGroup}>
                <Text style={{ ...styles.currencyText, color: '#00FFFF' }}>[</Text>
                <View style={styles.iconContainer}>
                    <Gem size={isMobile ? ICON_SIZE : 14} color="#00FFFF" strokeWidth={1} fill="#00FFFF" />
                </View>
                <Text style={[styles.frgText, { color: '#00FFFF' }]}>
                    {formatValue(frg)}{!isMobile && ' FRG'}
                </Text>
                <Text style={{ ...styles.currencyText, color: '#00FFFF' }}>]</Text>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333344',
        gap: 12,
    },
    containerMobile: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: 'auto',
        borderWidth: 0,
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: 0,
        gap: 4,
    },
    currencyGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    iconContainer: {
        width: 14, // Fixed width container for alignment
        alignItems: 'center',
        justifyContent: 'center',
    },
    achText: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: 1,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    frgText: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: 1,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    currencyText: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: 1,
        includeFontPadding: false,
        textAlignVertical: 'center',
    }
});
