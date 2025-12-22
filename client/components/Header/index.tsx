import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Currencies } from './Currencies';
import { StateConnection } from './StateConnection';
import { OwnerSection } from './OwnerSection';

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

                {/* Desktop Absolute Center State */}
                {!isMobile && (
                    <View style={styles.desktopStateWrapper} pointerEvents="box-none">
                        <StateConnection connected={true} />
                    </View>
                )}

                {/* Mobile: Top Row for Status */}
                {isMobile && (
                    <View style={styles.mobileStatusRow}>
                        <StateConnection
                            connected={true}
                            style={styles.mobileState}
                            compact={false}
                        />
                    </View>
                )}

                {/* Main Row: Owner (Left) & Currencies (Right) */}
                <View style={[styles.mainRow, isMobile && styles.mainRowMobile]}>
                    <OwnerSection />

                    {/* Right Side */}
                    {isMobile ? (
                        <View style={styles.mobileCurrencyWrapper}>
                            <Currencies ach={1000} frg={1000} />
                        </View>
                    ) : (
                        <View style={styles.currencyWrapper}>
                            <Currencies ach={1000} frg={1000} />
                        </View>
                    )}
                </View>

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
        position: 'relative',
    },
    contentMobile: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 8,
    },

    // Rows
    mobileStatusRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 4,
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    mainRowMobile: {
        alignItems: 'center',
    },

    // Desktop Absolute Center
    desktopStateWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },

    // Mobile Specifics
    mobileState: {
        transform: [{ scale: 0.9 }],
        // alignSelf: 'flex-end', // Handled by container
    },
    mobileCurrencyWrapper: {
        justifyContent: 'center',
    },

    // Desktop Currency Wrapper
    currencyWrapper: {
        zIndex: 2,
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
