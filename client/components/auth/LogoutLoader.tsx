import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PrinterLines } from '../PrinterLines';
import { useSession } from '@/lib/hooks/useSession';
import { useAuth } from '@/lib/hooks/useAuth';
import { router, Stack } from 'expo-router';

interface LogoutLoaderProps {
    visible: boolean;
    onComplete?: () => void;
}

export const LogoutLoader = ({ visible, onComplete }: LogoutLoaderProps) => {
    const { removeSession } = useSession();
    const { logout } = useAuth();

    // State
    const [started, setStarted] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        if (!visible) return;
        setStarted(false);
        setMessages([]);
        isMounted.current = true;

        const timer = setTimeout(() => {
            if (isMounted.current) {
                setStarted(true);
                runLogoutSequence();
            }
        }, 1000);

        return () => {
            isMounted.current = false;
            clearTimeout(timer);
        };
    }, [visible]);

    const runLogoutSequence = async () => {
        if (!isMounted.current) return;

        const bootLines = [
            "TERMINATING FRAGMENTS_OS...",
            "CLEARING MEMORY... OK",
            "DISCONNECTING FROM SECURE SERVER...",
            "CLOSING NEURAL LINK..."
        ];

        setMessages(bootLines);

        try {
            await logout();
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (isMounted.current) {
                setMessages(prev => [...prev, "", "GOODBYE"]);

                setTimeout(() => {
                    if (isMounted.current) {
                        removeSession();
                        onComplete?.();
                    }
                }, 1500);
            }
        } catch (error) {
            if (isMounted.current) {
                setMessages(prev => [...prev, "ERROR DETECTED", "FORCE QUIT INITIATED..."]);

                setTimeout(() => {
                    if (isMounted.current) {
                        removeSession();
                        onComplete?.();
                        router.replace('/login');
                    }
                }, 1500);
            }
        }
    };

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.bottomContent}>
                {!started ? (
                    <Text style={[styles.cursorText, { color: '#FF69B4', textShadowColor: '#FF69B4' }]}>{"> _"}</Text>
                ) : (
                    <PrinterLines
                        lines={messages}
                        textStyle={{
                            color: '#FF69B4',
                            fontFamily: 'VT323_400Regular',
                            fontSize: 20,
                            marginBottom: 6,
                            textShadowColor: '#FF69B4',
                            textShadowRadius: 6,
                        }}
                        delay={60}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000',
        zIndex: 9999,
        // Aligns children to the bottom
        justifyContent: 'flex-end',
        paddingBottom: 50,
        paddingHorizontal: 25,
    },
    bottomContent: {
        width: '100%',
        justifyContent: 'flex-end',
    },
    cursorText: {
        fontFamily: 'VT323_400Regular',
        fontSize: 24,
        textShadowRadius: 6,
    },
});
