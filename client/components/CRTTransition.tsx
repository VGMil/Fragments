import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay,
    Easing,
    runOnJS
} from 'react-native-reanimated';

interface CRTTransitionProps {
    children: React.ReactNode;
    isExiting?: boolean;
    onExitComplete?: () => void;
}

export const CRTTransition = ({ children, isExiting, onExitComplete }: CRTTransitionProps) => {
    const scaleX = useSharedValue(0.001); // Start as dot
    const scaleY = useSharedValue(0.005); // Thin line
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scaleX: scaleX.value },
            { scaleY: scaleY.value }
        ],
        opacity: opacity.value,
    }));

    // Power Up (Enter)
    useEffect(() => {
        if (!isExiting) {
            opacity.value = withTiming(1, { duration: 100 });
            scaleX.value = withSequence(
                withTiming(0.001, { duration: 0 }), // Reset to dot
                withTiming(1, { duration: 400, easing: Easing.out(Easing.exp) }) // Expand width (Slower for PC/Large screens)
            );
            scaleY.value = withSequence(
                withTiming(0.005, { duration: 0 }), // Reset to line
                withDelay(400, withTiming(1, { duration: 400, easing: Easing.out(Easing.exp) })) // Expand height
            );
        }
    }, [isExiting]);

    // Power Down (Exit)
    useEffect(() => {
        if (isExiting) {
            // Crush Height
            scaleY.value = withTiming(0.005, { duration: 300, easing: Easing.in(Easing.exp) }, () => {
                // Crush Width
                scaleX.value = withTiming(0.001, { duration: 300, easing: Easing.in(Easing.exp) }, (finished) => {
                    if (finished) {
                        opacity.value = withTiming(0, { duration: 50 });
                        if (onExitComplete) {
                            runOnJS(onExitComplete)();
                        }
                    }
                });
            });
        }
    }, [isExiting, onExitComplete]);

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        // Web fix to prevent content jumping
        ...Platform.select({
            web: {
                willChange: 'transform, opacity', // Hint browser for optimization
            }
        })
    }
});
