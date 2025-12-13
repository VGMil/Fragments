import { StyleSheet, Platform } from 'react-native';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B3D58',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 50,
        paddingHorizontal: 20,
        ...(Platform.OS === 'web' || Platform.OS === 'windows' || Platform.OS === 'macos' ? {
            width: '100%',
            maxWidth: 500,
            alignSelf: 'center',
        } : {})
    },
    logo: {
        backgroundColor: '#D5D5D5',
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#232336',
        borderTopWidth: 3,
        borderBottomWidth: 5,
        borderLeftWidth: 3,
        borderRightWidth: 7,
        alignSelf: 'center',
    },
    text: {
        fontFamily: 'VT323_400Regular',
        fontSize: 22,
        color: '#232336',
        textAlign: 'right',
        letterSpacing: 0,
        textDecorationLine: 'underline',
    },
    link: {
        fontFamily: 'VT323_400Regular',
        fontSize: 22,
        color: '#232336',
        textAlign: 'right',
        letterSpacing: 0,
        textDecorationLine: 'underline',
    },
});
