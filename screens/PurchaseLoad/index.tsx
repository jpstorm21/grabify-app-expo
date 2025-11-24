import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyles } from '@/constants';
import { styles } from './styles';

export const PurchaseLoadScreen: React.FC = () => {
    const theme = useTheme();

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.content}>
                <Text
                    variant="headlineMedium"
                    style={[styles.title, { color: theme.colors.onSurface }]}
                >
                    Carga de Compra
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

export default PurchaseLoadScreen;
