import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        position: 'relative',
        zIndex: 1000,
    },
    input: {
        marginBottom: 8,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        maxHeight: 200,
        marginTop: 4,
    },
    scrollView: {
        maxHeight: 200,
    },
    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
});
