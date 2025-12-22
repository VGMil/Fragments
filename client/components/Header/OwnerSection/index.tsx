import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Photo } from './Photo';

export const OwnerSection = () => {
    return (
        <View style={styles.ownerContainer}>
            <Photo image={''} />
            <View style={styles.nameColumn}>
                <Text style={styles.ownerTextPrimary}>Placeholder</Text>
                <Text style={styles.ownerTextSecondary}>Owner</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    nameColumn: {
        flexDirection: 'column',
        gap: 4,
    },
    ownerTextPrimary: {
        fontSize: 12,
        fontFamily: 'PressStart2P_400Regular',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    ownerTextSecondary: {
        fontSize: 10,
        fontFamily: 'PressStart2P_400Regular',
        color: '#00FFFF',
        opacity: 0.8,
        letterSpacing: 1,
    },
});
