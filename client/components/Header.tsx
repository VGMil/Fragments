import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
    transparent?: boolean;
}

const Panel = ({ children, style, borderColor = '#333' }: { children: React.ReactNode, style?: any, borderColor?: string }) => (
    <View style={[styles.panel, { borderColor }, style]}>
        {children}
    </View>
);

export const Header = ({ transparent }: HeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            styles.container,
            { paddingTop: Math.max(insets.top, 5) },
            transparent && { backgroundColor: 'transparent' }
        ]}>
            <View style={styles.content}>
                <Panel borderColor="#00FFFF" style={styles.systemPanel}>
                    <Text style={styles.systemText}>FRAGMENTS_OS ONLINE</Text>
                    <View style={styles.activeDot} />
                </Panel>
            </View>
            {!transparent && <View style={styles.glowLine} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#050510',
        zIndex: 100,
        paddingBottom: 5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    panel: {
        backgroundColor: '#111122',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        ...Platform.select({
            web: { boxShadow: '0 0 5px rgba(0, 255, 255, 0.3)' },
            default: { elevation: 2 }
        })
    },
    systemPanel: {
        borderColor: '#00FFFF',
        gap: 10,
    },
    systemText: {
        color: '#00FFFF',
        fontSize: 12,
        lineHeight: 14, // Explicit line height
        fontFamily: 'PressStart2P_400Regular',
        textAlign: 'center',
        textAlignVertical: 'center', // Android alignment
        includeFontPadding: false, // Remove extra font padding on Android
        letterSpacing: 2,
        textShadowColor: '#00FFFF',
        textShadowRadius: 2,
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#00FF00',
        shadowColor: '#00FF00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    glowLine: {
        alignSelf: 'center',
        width: '100%',
        height: 1,
        backgroundColor: '#00FFFF',
        marginTop: 5,
        opacity: 0.2,
    }
});
