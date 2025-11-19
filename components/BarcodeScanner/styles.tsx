import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    instructions: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 16,
    },
    lastCode: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    lastCodeValue: {
        fontWeight: 'bold',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    message: {
        textAlign: 'center',
        marginBottom: 12,
        fontSize: 16,
    },
});
