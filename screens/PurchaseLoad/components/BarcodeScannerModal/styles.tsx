import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scannerModal: {
        flex: 1,
        margin: 0,
        backgroundColor: '#000',
    },
    scannerContainer: {
        flex: 1,
    },
    scannerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    scannerTitle: {
        color: '#fff',
        fontWeight: '600',
    },
});
