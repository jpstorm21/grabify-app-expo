import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: {
        fontWeight: '600',
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginVertical: 24,
        opacity: 0.6,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginBottom: 8,
    },
    productName: {
        flex: 1,
        fontWeight: '500',
    },
    productControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    quantityText: {
        minWidth: 30,
        textAlign: 'center',
        fontWeight: '600',
    },
});
