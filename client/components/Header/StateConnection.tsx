import { Wifi, X } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, useWindowDimensions } from 'react-native';

interface StateConnectionProps {
    connected?: boolean;
    style?: StyleProp<ViewStyle>;
    compact?: boolean;
}

export const StateConnection = ({ connected = true, style, compact }: StateConnectionProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    // Use prop if provided, otherwise fallback to auto-detect mobile
    const isCompact = compact !== undefined ? compact : isMobile;

    return (
        <View style={[
            styles.panel,
            isMobile && styles.panelMobile,
            style,
        ]}>
            <Text style={[
                styles.systemText,
                isMobile && styles.systemTextMobile,
                { color: connected ? '#00FFFF' : '#FF0000' }
            ]}>
                {!isCompact ? 'FRAGMENTS_OS ' : ''}{connected ? 'ONLINE' : 'OFFLINE'}
            </Text>
            {connected ? (
                <Wifi size={isMobile ? 14 : 16} color="#00FFFF" strokeWidth={2.5} />
            ) : (
                <X size={isMobile ? 14 : 16} color="#FF0000" strokeWidth={2.5} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    panel: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        backgroundColor: '#111122', // Ensuring background color is consistent
    },
    panelMobile: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        gap: 6,
    },
    systemText: {
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'PressStart2P_400Regular',
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        letterSpacing: 2,
    },
    systemTextMobile: {
        fontSize: 10, // Smaller font for mobile
        letterSpacing: 1,
    },
});