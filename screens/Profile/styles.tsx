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
        marginBottom: 24,
        paddingTop: 10,
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#d0d0d0',
    },
    userName: {
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    accountInfoButton: {
        marginTop: 8,
        elevation: 4,
    },
    accountInfoButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 3,
    },
    quickSettingsSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontWeight: '700',
        marginBottom: 16,
    },
    settingsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    settingsCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingsIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {
        fontSize: 24,
    },
    settingsTextContainer: {
        flex: 1,
    },
    settingsTitle: {
        fontWeight: '600',
        marginBottom: 4,
    },
    settingsDescription: {
        fontSize: 12,
    },
    permissionButton: {
        borderRadius: 8,
        minWidth: 100,
    },
    logoutSection: {
        marginTop: 'auto',
        marginBottom: 20,
        alignItems: 'center',
    },
    logoutButton: {
        borderRadius: 12,
        minWidth: 250,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonContent: {
        paddingVertical: 10,
    },
});
