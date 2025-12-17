import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PrinterLines } from '../PrinterLines';
import { useSession } from '@/lib/hooks/useSession';
import { useAuth } from '@/lib/hooks/useAuth';
import Constants from 'expo-constants';

interface LoginLoaderProps {
    visible: boolean;
    onComplete?: () => void;
    email: string;
    password: string;
}

type Phase = 'init' | 'booting' | 'loading' | 'finishing' | 'decision';

const LOADING_BLOCKS = 20;

// Colors
const THEME = {
    DEFAULT: '#00FFFF', // Celeste (Cyan)
    SUCCESS: '#00FF00', // Green
    ERROR: '#FF69B4',   // Rosa Chicle (Hot Pink)
};

export const LoginLoader = ({ visible, onComplete, email, password }: LoginLoaderProps) => {
    const { saveSession } = useSession();
    const { signIn } = useAuth();

    // State
    const [phase, setPhase] = useState<Phase>('init');
    const [messages, setMessages] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [authResult, setAuthResult] = useState<'success' | 'error' | null>(null);
    const [pendingToken, setPendingToken] = useState<string | null>(null);
    const [themeColor, setThemeColor] = useState(THEME.DEFAULT);

    const isMounted = useRef(true);

    useEffect(() => {
        if (!visible) return;
        setPhase('init');
        setMessages([]);
        setProgress(0);
        setAuthResult(null);
        setPendingToken(null);
        setThemeColor(THEME.DEFAULT);
        isMounted.current = true;

        const timer1 = setTimeout(() => {
            if (!isMounted.current) return;
            setPhase('booting');
            startBootSequence();
        }, 1000);

        return () => {
            isMounted.current = false;
            clearTimeout(timer1);
        };
    }, [visible]);

    const startBootSequence = () => {
        const bootLines = [
            "INITIALIZING FRAGMENTS_OS...",
            "CHECKING MEMORY... OK",
            "CONNECTING TO SECURE SERVER...",
            "ESTABLISHING NEURAL LINK..."
        ];

        setMessages(bootLines);

        performLogin();

        setTimeout(() => {
            if (isMounted.current) setPhase('loading');
        }, 2000);
    };

    const performLogin = async () => {
        try {
            const data = await signIn(email, password);
            if (data && data.length > 0) {
                setPendingToken(data);
                setAuthResult('success');
            } else {
                setAuthResult('error');
            }
        } catch (error) {
            setAuthResult('error');
        }
    };

    // Update Color based on Result ONLY when phase changes to decision (end of loading)
    useEffect(() => {
        if (phase === 'decision' && authResult) {
            if (authResult === 'success') {
                setThemeColor(THEME.SUCCESS);
            } else {
                setThemeColor(THEME.ERROR);
            }
        }
    }, [phase, authResult]);

    // Handle Progress Bar Simulation
    useEffect(() => {
        if (phase !== 'loading') return;

        const interval = setInterval(() => {
            if (!isMounted.current) return clearInterval(interval);

            // Simulation logic
            setProgress(prev => {
                const target = authResult ? 100 : 85;
                if (prev >= target && authResult) {
                    clearInterval(interval);
                    handleLoadingComplete(authResult); // triggers next phase
                    return 100;
                }
                if (prev < target) {
                    return Math.min(prev + (Math.random() * 8), target);
                }
                return prev;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [phase, authResult]);

    const handleLoadingComplete = (result: 'success' | 'error') => {
        setPhase('decision');

        setTimeout(() => {
            if (!isMounted.current) return;
            // Finish messages
            if (result === 'success') {
                setMessages(prev => [...prev, "", "ACCESS GRANTED"]);
            } else {
                setMessages(prev => [...prev, "", "ACCESS DENIED"]);
            }
            setPhase('finishing');
        }, 500);
    };

    // Phase 4: Finish
    useEffect(() => {
        if (phase === 'finishing') {
            const timer = setTimeout(async () => {
                if (!isMounted.current) return;

                if (authResult === 'success' && pendingToken) {
                    await saveSession(pendingToken);
                }
                onComplete?.();
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [phase]);


    if (!visible) return null;

    const renderProgressBar = () => {
        const filledBlocks = Math.floor((progress / 100) * LOADING_BLOCKS);
        const blocks = [];

        for (let i = 0; i < LOADING_BLOCKS; i++) {
            blocks.push(
                <View
                    key={i}
                    style={[
                        styles.block,
                        { backgroundColor: i < filledBlocks ? themeColor : '#1a1a1a' }
                    ]}
                />
            );
        }

        return (
            <View style={styles.progressWrapper}>
                <View style={[styles.blocksContainer, { borderColor: themeColor }]}>
                    {blocks}
                </View>
                <Text style={[styles.percentText, { color: themeColor, textShadowColor: themeColor }]}>
                    LOADING: {Math.floor(progress)}%
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Content Container aligned to bottom */}
            <View style={styles.bottomContent}>

                {phase === 'init' ? (
                    <Text style={[styles.cursorText, { color: themeColor, textShadowColor: themeColor }]}>{"> _"}</Text>
                ) : (
                    <>
                        <PrinterLines
                            lines={messages}
                            textStyle={{
                                color: themeColor,
                                fontFamily: 'VT323_400Regular',
                                fontSize: 20,
                                marginBottom: 6,
                                textShadowColor: themeColor,
                                textShadowRadius: 6,
                            }}
                            delay={80}
                        />

                        {(phase === 'loading' || phase === 'decision' || phase === 'finishing') && (
                            <View style={styles.loaderArea}>
                                {renderProgressBar()}
                            </View>
                        )}
                    </>
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
    loaderArea: {
        marginTop: 20,
        width: '100%',
    },
    progressWrapper: {
        width: '100%',
    },
    blocksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 20,
        marginBottom: 8,
    },
    block: {
        width: '4%',
        height: '100%',
        borderRadius: 1,
    },
    percentText: {
        fontFamily: 'VT323_400Regular',
        fontSize: 18,
        textAlign: 'right',
        textShadowRadius: 4,
    }
});
