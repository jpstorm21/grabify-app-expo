import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalContent: {
        padding: 20,
        margin: 20,
        borderRadius: 12,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    container: {
        gap: 16,
    },
    productName: {
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        marginBottom: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 8,
    },
    buttonCancel: {
        flex: 1,
    },
    buttonAdd: {
        flex: 1,
    },
});
