import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    headerSection: {
        marginBottom: 32,
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    greetingText: {
        fontWeight: '700',
        flex: 1,
        letterSpacing: 0.3,
        fontSize: 20,
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    avatarIcon: {
        margin: 0,
    },
    separator: {
        height: 2,
        backgroundColor: '#e9ecef',
        width: '100%',
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitle: {
        fontWeight: '700',
        letterSpacing: 0.3,
        fontSize: 20,
    },
    countBadge: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        minWidth: 32,
        alignItems: 'center',
    },
    countText: {
        fontWeight: '600',
    },
    cardsContainer: {
        gap: 12,
    },
    optionCard: {
        borderRadius: 16,
        padding: 16,
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
    },
    iconContainer: {
        borderRadius: 12,
        marginRight: 16,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardIcon: {
        margin: 0,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontWeight: '600',
        marginBottom: 4,
        letterSpacing: 0.2,
        fontSize: 16,
    },
    cardSubtitle: {
        marginBottom: 2,
        letterSpacing: 0.2,
    },
    cardLabel: {
        marginTop: 4,
        letterSpacing: 0.2,
    },
    chevronIcon: {
        margin: 0,
    },
    warehouseCard: {
        borderRadius: 16,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    vehicleCard: {
        borderRadius: 16,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    emptyCard: {
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderStyle: 'dashed',
    },
    emptyText: {
        fontStyle: 'italic',
        textAlign: 'center',
    },
    logoutCard: {
        borderRadius: 16,
        padding: 16,
        marginTop: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    logoutCardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    logoutCardDisabled: {
        opacity: 0.5,
    },
    logoutContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutIcon: {
        margin: 0,
        marginRight: 8,
    },
    logoutText: {
        fontWeight: '600',
        letterSpacing: 0.3,
        fontSize: 16,
    },
});
