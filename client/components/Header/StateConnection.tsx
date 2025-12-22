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
                FRAGMENTS_OS
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
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    panelMobile: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        gap: 6,
    },
    systemText: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'PressStart2P_400Regular',
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        letterSpacing: 2,
        paddingTop: 3,
    },
    systemTextMobile: {
        fontSize: 10,
        lineHeight: 14,
        letterSpacing: 1,
        paddingTop: 2,
    },
});