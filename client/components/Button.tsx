import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps, ActivityIndicator, View, Platform } from 'react-native';

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
            activeOpacity={0.7}
            disabled={disabled || loading}
            {...props}
        >
            {/* Inner "Highlight" Border for 3D effect */}
            <View style={styles.innerBevel}>
                {loading ? (
                    <ActivityIndicator color="#000033" />
                ) : (
                    <Text style={[
                        styles.text,
                        variant === 'secondary' && styles.secondaryText,
                        disabled && styles.disabledText
                    ]}>
                        [ {title} ]
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const MAIN_COLOR = '#00FFFF'; // Electric Cyan
const SHADOW_COLOR = '#003333'; // Dark Cyan/Black for 3D depth
const GLOW_COLOR = '#00FFFF'; // Same as main for the glow

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLOR,
        padding: 2,
        alignItems: 'stretch',
        justifyContent: 'center',
        borderColor: SHADOW_COLOR,
        borderWidth: 2,
        borderRadius: 2,
        marginBottom: 10,
        borderBottomWidth: 6,
        borderBottomColor: SHADOW_COLOR,
        shadowColor: GLOW_COLOR,
        shadowOffset: { width: 0, height: 0 }, // Center glow
        shadowOpacity: 1, // Max intensity
        shadowRadius: 10, // Spread
        elevation: 10,
    },
    innerBevel: {
        backgroundColor: MAIN_COLOR,
        borderTopWidth: 2,
        borderTopColor: '#E0FFFF', // Almost white cyan
        borderLeftWidth: 2,
        borderLeftColor: '#E0FFFF',
        borderRightWidth: 2,
        borderRightColor: '#00CCCC', // Darker cyan
        borderBottomWidth: 2,
        borderBottomColor: '#00CCCC',
        paddingVertical: 12,
        alignItems: 'center',
    },
    secondaryContainer: {
        backgroundColor: 'transparent',
        borderColor: MAIN_COLOR,
        borderWidth: 2,
        // No 3D bottom for ghost button
        borderBottomWidth: 2,
        borderBottomColor: MAIN_COLOR,
    },
    disabledContainer: {
        backgroundColor: '#555555',
        borderColor: '#333333',
        opacity: 0.8,
    },
    text: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 14, // Reduced slightly to fit pixel font spacing
        color: '#000033', // Dark text on bright button
        textTransform: 'uppercase',
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        letterSpacing: 2, // Increased for pixel font readability
    },
    secondaryText: {
        color: MAIN_COLOR,
    },
    disabledText: {
        color: '#888',
    }
});
