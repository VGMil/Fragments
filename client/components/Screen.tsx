import React from 'react';
import { ImageBackground, StyleSheet, ViewProps, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

interface ScreenProps extends ViewProps {
    children: React.ReactNode;
    hasHeader?: boolean;
}

export const Screen = ({ children, style, hasHeader = false, ...props }: ScreenProps) => {
    const headerHeight = useHeaderHeight();

    return (
        <ImageBackground
            source={require('../assets/images/owner/background.webp')}
            style={[styles.container, style]}
            imageStyle={styles.image}
            resizeMode="cover"
            {...props}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    { paddingTop: headerHeight },
                    !hasHeader && styles.centerContent
                ]}
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
        position: 'relative',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    image: {
        opacity: 0.4,
    },
    scrollView: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
    },
    centerContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});
