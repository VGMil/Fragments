import React from 'react';
import { ImageBackground, StyleSheet, ViewProps, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
    children: React.ReactNode;
    withPadding?: boolean;
}

export const Screen = ({ children, style, withPadding = false, ...props }: ScreenProps) => {
    const insets = useSafeAreaInsets();

    return (
        <ImageBackground
            source={require('../assets/images/owner/background.webp')}
            style={[styles.container, style]}
            imageStyle={styles.image}
            resizeMode="cover"
            {...props}
        >
            <View style={{ marginTop: 70 }}>
                {children}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050510', // Fallback
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    image: {
        opacity: 0.4,
        width: Platform.OS === 'web' ? '100%' : '100%',
        left: Platform.OS === 'web' ? '0%' : '0%',
    }
});
