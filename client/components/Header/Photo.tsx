import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    cancelAnimation
} from 'react-native-reanimated';

// Import local placeholder
const placeholderSource = require('../../assets/images/owner/placeholder-avatar.webp');

interface PhotoProps {
    image?: string | null;
}

export const Photo = ({ image }: PhotoProps) => {
    const glowOpacity = useSharedValue(0.5);

    useEffect(() => {
        if (!image) {
            glowOpacity.value = withRepeat(
                withSequence(
                    withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0.4, { duration: 2000, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            );
        } else {
            cancelAnimation(glowOpacity);
            glowOpacity.value = 0;
        }
    }, [image]);

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: glowOpacity.value * 0.3
    }));

    const imageSource = image ? { uri: image } : placeholderSource;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={imageSource}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                />
                {!image && <Animated.View style={[styles.overlay, overlayStyle]} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 38,
        height: 44,
        borderWidth: 1.5,
        borderRadius: 6,
        padding: 3,
        backgroundColor: 'rgba(0, 20, 10, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00FFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 4,
        borderColor: '#00FFFF', // Fixed static border color
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00FFFF',
    }
});