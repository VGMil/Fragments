import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { X, AlertTriangle, CheckCircle, Info, Slash } from 'lucide-react-native';

export type PopupType = 'success' | 'error' | 'warning' | 'info';

const COLORS = {
    success: '#00fa9a', // SpringGreen
    error: '#ff0055',   // Retro Red
    warning: '#ffcc00', // Gold/Yellow
    info: '#00ffff',    // Cyan
};

const ICONS = {
    success: CheckCircle,
    error: Slash,
    warning: AlertTriangle,
    info: Info,
};

interface PopupProps {
    visible: boolean;
    type?: PopupType;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    animationType?: 'none' | 'slide' | 'fade';
}

const Corner = ({ color, style }: { color: string, style: any }) => (
    <View style={[styles.corner, { borderColor: color }, style]}>
        <View style={styles.cornerBolt} />
    </View>
);

export const Popup = ({
    visible,
    type = 'info',
    title,
    children,
    onClose,
    animationType = 'fade'
}: PopupProps) => {

    const color = COLORS[type];
    const Icon = ICONS[type];

    return (
        <Modal
            transparent
            visible={visible}
            animationType={animationType}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.container, { borderColor: color, shadowColor: color }]}>
                    {/* Glow Frame */}
                    {Platform.OS === 'web' && (
                        <View style={[styles.webGlow, { boxShadow: `0 0 20px ${color}40` }]} />
                    )}

                    {/* Corners */}
                    <Corner color={color} style={styles.topLeft} />
                    <Corner color={color} style={styles.topRight} />
                    <Corner color={color} style={styles.bottomLeft} />
                    <Corner color={color} style={styles.bottomRight} />

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerTitleContainer}>
                            <Icon color={color} size={20} style={{ marginRight: 10 }} />
                            <Text style={[styles.title, { color, textShadowColor: color }]}>
                                {title || type.toUpperCase()}
                            </Text>
                        </View>

                        {onClose && (
                            <TouchableOpacity onPress={onClose} style={[styles.closeButton, { borderColor: color }]}>
                                <X size={16} color={color} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Content Container (Empty/Generic as requested) */}
                    <View style={styles.content}>
                        {children}
                    </View>

                    {/* Decorative Bottom Bar */}
                    <View style={[styles.decorationBar, { backgroundColor: color }]} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(10, 10, 16, 0.95)',
        borderWidth: 2,
        padding: 15,
        elevation: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    webGlow: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        borderStyle: 'dashed',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 10,
    },
    title: {
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 14,
        letterSpacing: 1,
        textShadowRadius: 10,
        flexShrink: 1,
        lineHeight: 20,
    },
    content: {
        minHeight: 50,
    },
    closeButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    decorationBar: {
        height: 2,
        width: '100%',
        marginTop: 15,
        opacity: 0.5,
    },
    // Corner Styles
    corner: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderWidth: 1,
        backgroundColor: '#000',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cornerBolt: {
        width: 2,
        height: 2,
        backgroundColor: '#555',
    },
    topLeft: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
    topRight: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
    bottomLeft: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
    bottomRight: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
});
