import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginBottom: 24,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
    },
    input: {
        marginBottom: 16,
    },
    errorText: {
        marginTop: -15,
        marginBottom: 8,
    },
    actions: {
        marginTop: 8,
    },
    editButton: {
        borderRadius: 12,
        marginTop: 8,
    },
    editActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    cancelButton: {
        flex: 1,
        borderRadius: 12,
    },
    saveButton: {
        flex: 1,
        borderRadius: 12,
    },
    buttonContent: {
        paddingVertical: 10,
    },
});
