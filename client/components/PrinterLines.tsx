import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface PrinterLinesProps {
    lines: string[];
    delay?: number;
    typingSpeed?: number; // Time per line if not typing char by char, keeping it simple as "line by line"
    style?: ViewStyle;
    textStyle?: TextStyle;
    onComplete?: () => void;
}

export const PrinterLines = ({
    lines,
    delay = 500,
    style,
    textStyle,
    onComplete
}: PrinterLinesProps) => {
    const [showCursor, setShowCursor] = useState(true);
    const [visibleCount, setVisibleCount] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    const prevLinesRef = useRef<string[]>([]);

    useEffect(() => {
        const prevLines = prevLinesRef.current;
        const isAppend = lines.length > prevLines.length && lines.slice(0, prevLines.length).every((l, i) => l === prevLines[i]);

        if (!isAppend) {
            setVisibleCount(0);
        }
        prevLinesRef.current = lines;
    }, [lines]);

    useEffect(() => {
        if (visibleCount < lines.length) {
            timeoutRef.current = setTimeout(() => {
                setVisibleCount(prev => prev + 1);
            }, delay);
        } else {
            if (onComplete) onComplete();
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [visibleCount, lines.length, delay, onComplete]);

    return (
        <View style={[styles.container, style]}>
            {lines.slice(0, visibleCount).map((line, index) => (
                <Text key={index} style={[styles.text, textStyle]}>
                    {"> "}{line}
                </Text>
            ))}
            {visibleCount < lines.length && (
                <Text style={[styles.text, textStyle, styles.cursor, { opacity: showCursor ? 1 : 0 }]}>_</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    text: {
        fontFamily: 'VT323_400Regular',
        fontSize: 20,
        color: '#00FF00', // Green terminal text by default
        marginBottom: 4,
    },
    cursor: {
        opacity: 0.8,
    }
});
