import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    title: {
        marginBottom: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    userCard: {
        marginBottom: 30,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    userInfo: {
        padding: 20,
        alignItems: 'center',
    },
    userName: {
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    userEmail: {
        marginBottom: 4,
        textAlign: 'center',
        opacity: 0.7,
    },
    userRut: {
        textAlign: 'center',
        opacity: 0.6,
    },
    logoutSection: {
        alignItems: 'center',
    },
    logoutButton: {
        borderRadius: 12,
        minWidth: 200,
    },
    buttonContent: {
        paddingVertical: 8,
    },
});
