import React from 'react';
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Currencies } from './Currencies';
import { StateConnection } from './StateConnection';
import { OwnerSection } from './OwnerSection';
import { BatteryDisplay } from './Battery';

interface HeaderProps {
    transparent?: boolean;
}

export const Header = ({ transparent }: HeaderProps) => {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={[
            styles.container,
            { paddingTop: Math.max(insets.top, 10) },
            transparent && { backgroundColor: 'transparent' },
            !transparent && styles.borderBottom
        ]}>
            <View style={[styles.content, isMobile && styles.contentMobile]}>
                {isMobile ? (
                    <>
                        <View style={styles.mobileTopRow}>
                            <StateConnection connected={true} compact={false} />
                            {Platform.OS !== 'web' && <BatteryDisplay />}
                        </View>

                        <View style={styles.mobileMainRow}>
                            <View style={{ transform: [{ scale: 0.9 }] }}>
                                <OwnerSection />
                            </View>
                            <Currencies ach={1000} frg={1000} />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.desktopStateWrapper} pointerEvents="box-none">
                            <StateConnection connected={true} />
                        </View>

                        <View style={styles.desktopLeftGroup}>
                            <OwnerSection />
                        </View>

                        <View style={styles.desktopRightGroup}>
                            <Currencies ach={1000} frg={1000} />
                            {Platform.OS !== 'web' && (
                                <>
                                    <View style={styles.divider} />
                                    <BatteryDisplay />
                                </>
                            )}
                        </View>
                    </>
                )}
            </View>
            {!transparent && !isMobile && <View style={styles.glowLine} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#050510',
        zIndex: 100,
        paddingBottom: 10,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 255, 255, 0.1)',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        position: 'relative', // Context for absolute center
    },
    contentMobile: {
        flexDirection: 'column',
        gap: 10,
        paddingHorizontal: 15,
    },

    // --- Desktop Styles ---
    desktopStateWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0, // Behind interactive elements if any overlap, but pointerEvents="box-none" helps
    },
    desktopLeftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        zIndex: 1,
    },
    desktopRightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        zIndex: 1,
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#00FFFF',
        opacity: 0.2,
    },

    // --- Mobile Styles ---
    mobileTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    mobileMainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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
