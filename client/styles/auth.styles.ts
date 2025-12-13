import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#4B3D58',
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
