import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface SwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label?: string;
}

export const Switch = ({ value, onValueChange, label }: SwitchProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onValueChange(!value)}
            activeOpacity={0.8}
        >
            <View style={[styles.checkbox, value && styles.checkboxChecked]}>
                {value && <View style={styles.innerCheck} />}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#5de4c8', // Cyan/Teal color often seen in retro interfaces
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: '#002b25',
    },
    innerCheck: {
        width: 10,
        height: 10,
        backgroundColor: '#5de4c8',
    },
    label: {
        fontFamily: 'VT323_400Regular',
        fontSize: 16,
        color: '#5de4c8',
        letterSpacing: 1,
    }
});
