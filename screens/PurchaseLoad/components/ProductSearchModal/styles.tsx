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
    searchContainer: {
        position: 'relative',
        zIndex: 1001,
    },
    searchInput: {
        marginBottom: 8,
    },
    productDropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        maxHeight: 300,
        marginTop: 4,
    },
    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
});
