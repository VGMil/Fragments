import React from 'react';
import { ImageBackground, StyleSheet, ViewProps, Platform, View, ScrollView, Dimensions } from 'react-native';

interface ScreenProps extends ViewProps {
    children: React.ReactNode;
    hasHeader?: boolean;
}

export const Screen = ({ children, style, hasHeader = false, ...props }: ScreenProps) => {
    return (
        <ImageBackground
            source={require('../assets/images/owner/background.webp')}
            style={[styles.container, style]}
            imageStyle={styles.image}
            resizeMode="cover"
            {...props}
        >
            <ScrollView
                style={[styles.scrollView]}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050510', // Fallback
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'relative',
        alignItems: 'center',
    },
    image: {
        opacity: 0.4,
        width: Dimensions.get('window').width,
        left: '0%',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginTop: 70
    },
});
