import { globalStyles } from '@/constants';
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

import { authState, logoutUser } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';

export const ProfileScreen: React.FC = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { user, status } = useAppSelector(authState);
    const isLoading = status === 'loading';

    const handleLogout = async () => {
        await dispatch(logoutUser()).unwrap();
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.content}>
                <Text
                    variant="headlineMedium"
                    style={[styles.title, { color: theme.colors.onSurface }]}
                >
                    Perfil
                </Text>

                {user && (
                    <Card style={styles.userCard}>
                        <Card.Content style={styles.userInfo}>
                            <Text variant="titleLarge" style={styles.userName}>
                                {user.name}
                            </Text>
                            <Text variant="bodyMedium" style={styles.userEmail}>
                                {user.email}
                            </Text>
                            <Text variant="bodySmall" style={styles.userRut}>
                                RUT: {user.rut}
                            </Text>
                        </Card.Content>
                    </Card>
                )}

                <View style={styles.logoutSection}>
                    <Button
                        mode="contained"
                        onPress={handleLogout}
                        loading={isLoading}
                        disabled={isLoading}
                        style={styles.logoutButton}
                        contentStyle={styles.buttonContent}
                        icon="logout"
                    >
                        Cerrar Sesión
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
