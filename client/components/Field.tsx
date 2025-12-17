import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, Platform } from 'react-native';

interface FieldProps extends TextInputProps {
    label: string;
    icon?: any;
    required?: boolean;
}

export const Field = ({ label, required, style, onFocus, onBlur, ...props }: FieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    return (
        <View style={styles.container}>
            {/* Label Row */}
            <Text style={styles.label}>
                {'>'} {label}
                :
                {required && <Text style={{ color: 'white', textShadowColor: 'white', textShadowRadius: 2 }}> *</Text>}
            </Text>

            {/* Input Row */}
            <View style={[styles.terminalLine, isFocused && styles.focusedLine]}>
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor="#8899A6" // Faded grey for "ghost" effect
                    selectionColor="#00FF00"
                    cursorColor="#00FF00"
                    underlineColorAndroid="transparent" // Remove native underline
                    autoCorrect={false}
                    spellCheck={false}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
            </View>
        </View>
    );
};

const TERMINAL_GREEN = '#04ca9f'; // Classic bright green
const BG_COLOR = '#050505'; // Almost black

const styles = StyleSheet.create({
    container: {
        marginBottom: 15, // Increased spacing for vertical layout
        // Removed border from container, now only on input
    },
    label: {
        fontFamily: 'VT323_400Regular',
        fontSize: 20, // Increased for VT323
        color: TERMINAL_GREEN,
        marginBottom: 5,
        textShadowRadius: 2,

    },
    terminalLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        width: '100%',
        backgroundColor: BG_COLOR,
        borderWidth: 1,
        borderColor: '#333',
    },
    focusedLine: {
        borderColor: TERMINAL_GREEN,
        backgroundColor: '#001100',
    },
    // Removed old prompt style
    input: {
        flex: 1,
        fontFamily: 'VT323_400Regular', // Input text font
        fontSize: 20, // Increased for VT323
        color: TERMINAL_GREEN,
        height: '100%',
        textShadowColor: TERMINAL_GREEN,
        textShadowRadius: 2,
        ...(Platform.OS === 'web' ? {
            outlineStyle: 'none',
            boxShadow: '0 0 0px 1000px #050505 inset',
            caretColor: TERMINAL_GREEN,
            transition: 'background-color 50000s ease-in-out 0s',
        } : {} as any),
    },
});
