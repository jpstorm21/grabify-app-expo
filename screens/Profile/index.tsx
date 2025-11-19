import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '@/constants';
import { authState, logoutUser } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { styles } from './styles';

export const ProfileScreen: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { user, status } = useAppSelector(authState);
    const isLoading = status === 'loading';

    const handleLogout = async () => {
        await dispatch(logoutUser()).unwrap();
    };

    const handleAccountInfo = () => {
        router.push('/(tabs)/(stack)/account-info');
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.headerSection}>
                        <Text
                            variant="headlineMedium"
                            style={[styles.title, { color: theme.colors.onSurface }]}
                        >
                            Mi cuenta
                        </Text>
                    </View>

                    {user && (
                        <>
                            <View style={styles.profileSection}>
                                <View style={styles.avatarContainer}>
                                    {/* Avatar vacío por ahora */}
                                </View>
                                <Text
                                    variant="headlineSmall"
                                    style={[styles.userName, { color: theme.colors.onSurface }]}
                                >
                                    {user.name}
                                </Text>

                                <Button
                                    mode="elevated"
                                    onPress={handleAccountInfo}
                                    style={styles.accountInfoButton}
                                    contentStyle={styles.accountInfoButtonContent}
                                    icon="account"
                                    buttonColor={theme.colors.primary}
                                    textColor={theme.colors.background}
                                >
                                    Información de mi cuenta
                                </Button>
                            </View>
                            <View style={styles.logoutSection}>
                                <Button
                                    mode="contained"
                                    onPress={handleLogout}
                                    loading={isLoading}
                                    disabled={isLoading}
                                    style={styles.logoutButton}
                                    contentStyle={styles.buttonContent}
                                    buttonColor={theme.colors.tertiary}
                                    textColor="#fff"
                                    icon="logout"
                                >
                                    Cerrar Sesión
                                </Button>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
