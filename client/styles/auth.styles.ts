import { StyleSheet, Platform } from 'react-native';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#4B3D58', // Removed to show global background
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingTop: 25,
        paddingBottom: 50,
        paddingHorizontal: 20,
        ...(Platform.OS === 'web' || Platform.OS === 'windows' || Platform.OS === 'macos' ? {
            width: '100%',
            maxWidth: 500,
            alignSelf: 'center',
        } : {})
    },
    loginSubtitle: {
        color: '#8899A6',
        fontSize: 14,
        fontFamily: 'VT323_400Regular',
        letterSpacing: 2
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
    terminalLinkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    terminalLinkText: {
        color: '#8899A6',
        fontFamily: 'VT323_400Regular',
        fontSize: 18,
        letterSpacing: 2,
    },
    terminalLinkDecoration: {
        color: '#8899A6',
        fontFamily: 'VT323_400Regular',
        fontSize: 18,
        letterSpacing: 2,
        opacity: 0.5,
        textAlign: 'center',
        marginTop: -5,
    },
    // Keep existing styles below if any... or just append to end.
    text: {
        fontFamily: 'VT323_400Regular',
        fontSize: 18,
        color: '#8899A6', // Muted text for secondary actions
        textAlign: 'right',
        textDecorationLine: 'none',
        marginRight: 25, // Clear corner decoration
        textTransform: 'uppercase',
    },
    link: {
        fontFamily: 'VT323_400Regular',
        fontSize: 20,
        color: '#00FFFF',
        textAlign: 'right',
        textDecorationLine: 'none',
        marginRight: 25,
        textTransform: 'uppercase',
        textShadowColor: '#00FFFF',
        textShadowRadius: 3,
    },
});
