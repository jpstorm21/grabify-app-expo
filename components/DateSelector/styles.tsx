import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        marginBottom: 8,
    },
    modalContent: {
        padding: 20,
        margin: 20,
        borderRadius: 12,
    },
    pickerContainer: {
        alignItems: 'center',
    },
    picker: {
        width: '100%',
        height: 200,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 12,
    },
    button: {
        flex: 1,
    },
});
