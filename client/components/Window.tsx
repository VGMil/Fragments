import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { Folder, X } from 'lucide-react-native';

interface WindowProps extends ViewProps {
    title: string;
    children: React.ReactNode;
    hasExitButton?: boolean;
    onExit?: () => void;
}

export const Window = ({ title, children, hasExitButton = false, onExit, style, ...props }: WindowProps) => {

    return (
        <View style={[styles.container, style]} {...props}>
            {/* Header Row */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Folder size={20} color="#ECECFA" style={styles.icon} />
                    <Text style={styles.titleText}>/ {title}</Text>
                </View>

                {hasExitButton && (
                    <TouchableOpacity onPress={onExit} style={styles.exitButton} activeOpacity={0.8}>
                        <X size={18} color="white" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Main Window Content */}
            <View style={styles.windowFrame}>
                <View style={styles.content}>
                    {children}
                </View>
                {/* Footer Bar Decoration */}
                <View style={styles.footer}>
                    <View style={styles.footerLineDark} />
                    <View style={styles.footerLineLight} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        borderColor: '#232336',
        borderTopWidth: 3,
        borderBottomWidth: 5,
        borderLeftWidth: 3,
        borderRightWidth: 7,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#232336',
        padding: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    icon: {
        marginRight: 8,
    },
    titleText: {
        color: '#ECECFA',
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 16, // Reduced size for Press Start 2P as it is wider
        textTransform: 'uppercase',
        letterSpacing: 0,
        lineHeight: 20,
    },
    exitButton: {
        backgroundColor: '#FF4444',
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        // Shadow for pixel effect
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 4,
    },
    windowFrame: {
        backgroundColor: '#EAD4AA', // Beige color from image
        width: '100%',
        flex: 1, // Fill remaining space inside container
    },
    content: {
        flex: 1,
        padding: 20,
    },
    footer: {
        height: 24,
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 4,
        paddingHorizontal: 10,
        backgroundColor: '#D6A33A', // Gold/Darker beige
        borderTopWidth: 2,
        borderTopColor: '#9C772C', // Darker line
    },
    footerLineDark: {
        height: 4,
        backgroundColor: '#9C772C',
        width: '100%',
        marginBottom: 2,
        opacity: 0.5,
    },
    footerLineLight: {
        height: 2,
        backgroundColor: '#F0E6D2',
        width: '100%',
        opacity: 0.3,
    }
});
