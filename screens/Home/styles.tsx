import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
        paddingTop: 20,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    selectOptionText: {
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    cardsContainer: {
        gap: 20,
        width: '100%',
    },
    optionCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    optionCardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        borderRadius: 12,
        marginRight: 16,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardIcon: {
        margin: 0,
    },
    cardTitle: {
        flex: 1,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    cardDescription: {
        marginBottom: 16,
        lineHeight: 22,
        letterSpacing: 0.2,
    },
    cardFooter: {
        alignItems: 'flex-end',
        marginTop: 8,
    },
    cardActionText: {
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
