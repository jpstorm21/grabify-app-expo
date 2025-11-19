import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '@/constants';
import { authState } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/store/hooks';
import { styles } from './styles';

export const HomeScreen: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const { user } = useAppSelector(authState);

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.content}>
                <View style={styles.headerSection}>
                    <Text
                        variant="displayMedium"
                        style={[styles.appName, { color: theme.colors.primary }]}
                    >
                        Grabify App
                    </Text>
                    <Text
                        variant="titleLarge"
                        style={[styles.welcomeText, { color: theme.colors.onSurface }]}
                    >
                        Bienvenido {user?.name || ''}
                    </Text>
                    <Text
                        variant="bodyLarge"
                        style={[styles.motivationalText, { color: theme.colors.onSurfaceVariant }]}
                    >
                        ¿Qué haremos hoy?
                    </Text>
                </View>
                <View style={styles.actionsSection}>
                    <Button
                        mode="contained"
                        onPress={() => router.push('/(tabs)/(stack)/purchase-load')}
                        style={styles.actionButton}
                        contentStyle={styles.buttonContent}
                        icon="cart-plus"
                    >
                        Carga de Compra
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => router.push('/(tabs)/(stack)/stock-movement')}
                        style={[styles.actionButton, styles.secondaryButton]}
                        contentStyle={styles.buttonContent}
                        icon="package-variant"
                    >
                        Movimiento de Stock
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};
