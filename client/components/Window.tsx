import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewProps, Platform } from 'react-native';
// Replaced icons with simple text or shapes if needed, keeping it minimal as per the generic "Window" requirement
import { X } from 'lucide-react-native';

interface WindowProps extends ViewProps {
    title: string;
    children: React.ReactNode;
    hasExitButton?: boolean;
    onExit?: () => void;
}

const Corner = ({ style }: { style: any }) => (
    <View style={[styles.corner, style]}>
        <View style={styles.cornerBolt} />
    </View>
);

export const Window = ({ title, children, hasExitButton = false, onExit, style, ...props }: WindowProps) => {

    return (
        <View style={[styles.container, style]} {...props}>
            {/* Corner Decorations */}
            <Corner style={styles.topLeft} />
            <Corner style={styles.topRight} />
            <Corner style={styles.bottomLeft} />
            <Corner style={styles.bottomRight} />

            {/* Glowing Borders (simulated with absolute views if platform doesn't support thorough box-shadow) */}
            <View style={styles.glowFrame} pointerEvents="none" />

            {/* Header Content */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    {/* Double line decoration for header */}
                    <View style={styles.headerDecorationLine} />
                    <View style={styles.headerDecorationLine} />
                    {/* Title Text (Absolute or overlaid?) - For now simpler text */}
                    {/* <Text style={styles.titleText}>{title}</Text> */}
                </View>

                {/* Title overlaps the lines? Or sits between? Let's put text on top */}
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>

                {hasExitButton && (
                    <TouchableOpacity onPress={onExit} style={styles.exitButton}>
                        <X size={16} color="#00FFFF" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Main Window Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const NEON_COLOR = '#00FFFF'; // Cyan
const FRAME_BG = 'rgba(20, 20, 30, 0.85)'; // Dark semi-transparent
const CORNER_SIZE = 16;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: FRAME_BG,
        borderWidth: 2,
        borderColor: NEON_COLOR,
        padding: 4, // Padding for inner content vs frame
        position: 'relative',
        // Glow effect
        ...Platform.select({
            web: {
                boxShadow: `0 0 15px ${NEON_COLOR}, inset 0 0 10px ${NEON_COLOR}40`,
            },
            default: {
                shadowColor: NEON_COLOR,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
                elevation: 10,
            }
        })
    },
    glowFrame: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 1,
        borderColor: NEON_COLOR,
        opacity: 0.5,
        margin: -4, // Expand slightly? or just match
    },
    // Corners
    corner: {
        position: 'absolute',
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        backgroundColor: '#2C2C3E', // Dark grey metal
        borderColor: NEON_COLOR,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    cornerBolt: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#555', // Bolt color
    },
    topLeft: { top: -2, left: -2, borderTopWidth: 2, borderLeftWidth: 2 },
    topRight: { top: -2, right: -2, borderTopWidth: 2, borderRightWidth: 2 },
    bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 2, borderLeftWidth: 2 },
    bottomRight: { bottom: -2, right: -2, borderBottomWidth: 2, borderRightWidth: 2 },

    // Header
    header: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 5,
        position: 'relative',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        marginRight: 10,
    },
    headerDecorationLine: {
        height: 2,
        backgroundColor: NEON_COLOR,
        width: '100%',
        marginVertical: 2,
        opacity: 0.6,
        shadowColor: NEON_COLOR,
        shadowRadius: 4,
        shadowOpacity: 0.8,
    },
    titleWrapper: {
        position: 'absolute',
        left: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: FRAME_BG, // Hide lines behind text
        paddingHorizontal: 10,
    },
    titleText: {
        color: NEON_COLOR,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        textShadowColor: NEON_COLOR,
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 0 },
        fontFamily: Platform.OS === 'web' ? 'monospace' : 'PressStart2P_400Regular',
    },
    exitButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: NEON_COLOR,
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        zIndex: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
});
