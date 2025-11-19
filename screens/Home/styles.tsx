import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    headerSection: {
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
    },
    appName: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    welcomeText: {
        textAlign: 'center',
        marginBottom: 8,
        fontWeight: '600',
    },
    motivationalText: {
        textAlign: 'center',
        opacity: 0.8,
        fontStyle: 'italic',
    },
    actionsSection: {
        gap: 16,
        width: '100%',
    },
    actionButton: {
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    secondaryButton: {
        backgroundColor: '#3ecadd',
    },
    buttonContent: {
        paddingVertical: 12,
    },
});
