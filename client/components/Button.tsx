import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
}

export const Button = ({ title, variant = 'primary', loading = false, style, disabled, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                variant === 'secondary' && styles.secondaryContainer,
                disabled && styles.disabledContainer,
                style
            ]}
            activeOpacity={0.8}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color="#232336" />
            ) : (
                <Text style={[
                    styles.text,
                    variant === 'secondary' && styles.secondaryText,
                    disabled && styles.disabledText
                ]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC857',
        paddingTop: 17,    // +1px (vs 16) to compensate for top border (3px) vs bottom (5px)
        paddingBottom: 15, // -1px
        paddingLeft: 28,   // +4px (vs 24) to compensate for left border (3px) vs right (7px)
        paddingRight: 20,  // -4px
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#232336',
        borderTopWidth: 3,
        borderBottomWidth: 5,
        borderLeftWidth: 3,
        borderRightWidth: 7,
        // Elevation/Shadow for 3D feel could be added, but flat fits the provided image better
    },
    secondaryContainer: {
        backgroundColor: 'transparent',
        borderColor: '#232336',
        borderTopWidth: 3,
        borderBottomWidth: 5,
        borderLeftWidth: 3,
        borderRightWidth: 7,
    },
    disabledContainer: {
        backgroundColor: '#D5D5D5',
        opacity: 0.8,
    },
    text: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 14, // Good size for button text
        color: '#232336', // Dark text on yellow background
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: 0,
    },
    secondaryText: {
        color: '#ECECFA',
    },
    disabledText: {
        color: '#888',
    }
});
