import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

import { LucideIcon } from 'lucide-react-native';

interface FieldProps extends TextInputProps {
    label: string;
    icon?: LucideIcon;
}

export const Field = ({ label, icon: Icon, style, ...props }: FieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                {/* Decorative Orange Block */}
                <View style={styles.decorationChunk}>
                    {Icon && <Icon size={20} color="#232336" />}
                </View>

                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor="#999"
                    {...props}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 12,
        color: '#232336',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 4,
        borderColor: '#232336',
        borderTopWidth: 3,
        borderBottomWidth: 5,
        borderLeftWidth: 3,
        borderRightWidth: 7,
        height: 60,
    },
    decorationChunk: {
        width: 30,
        height: '100%',
        backgroundColor: '#E59646', // Pixel art orange/gold
        borderRightWidth: 4,
        borderRightColor: '#232336',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontFamily: 'Courier', // Monospace for that terminal feel
        fontSize: 16,
        paddingHorizontal: 12,
        color: '#232336',
        height: '100%',
    },
});
