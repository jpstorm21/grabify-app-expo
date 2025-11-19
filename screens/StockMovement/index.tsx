import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '@/constants';
import { styles } from './styles';

export const StockMovementScreen: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Button
                    mode="text"
                    onPress={() => router.back()}
                    icon="arrow-left"
                    style={styles.backButton}
                >
                    Volver
                </Button>
            </View>
            <View style={styles.content}>
                <Text
                    variant="headlineMedium"
                    style={[styles.title, { color: theme.colors.onSurface }]}
                >
                    Movimiento de Stock
                </Text>
                <Text
                    variant="bodyMedium"
                    style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
                >
                    Esta pantalla estará disponible próximamente
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default StockMovementScreen;
