import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        position: 'relative',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        opacity: 0.7,
    },
    card: {
        marginBottom: 24,
        borderRadius: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    cardShell: {
        position: 'relative',
        width: '100%',
        alignSelf: 'center',
        marginTop: 64,
    },
    cardContent: {
        padding: 24,
    },
    brandRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
        gap: 6,
    },
    wordmark: {
        height: 40,
        resizeMode: 'contain',
    },
    logoTop: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: '#fff',
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        marginTop: -50,
    },
    input: {
        marginBottom: 16,
    },
    actions: {
        marginTop: 8,
        gap: 12,
    },
    loginButton: {
        borderRadius: 10,
    },
    buttonContent: {
        paddingVertical: 10,
    },
    forgotButton: {
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        opacity: 0.7,
    },
    registerButton: {
        marginLeft: 4,
    },
    bottomRow: {
        marginTop: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingLogo: {
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: '#fff',
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 30,
        elevation: 12,
        transform: [{ translateY: -50 }],
    },
    errorText: {
        marginTop: -15,
    },
});
