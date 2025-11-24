import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalColors, globalStyles } from '@/constants';
import { styles } from './styles';

export const HomeScreen: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.content}>
                <View style={styles.headerSection}>
                    <Text
                        variant="headlineMedium"
                        style={[styles.selectOptionText, { color: globalColors.text }]}
                    >
                        Seleccione una opción
                    </Text>
                </View>
                <View style={styles.cardsContainer}>
                    <Pressable
                        onPress={() => router.push('/(tabs)/(stack)/purchase-load')}
                        style={({ pressed }) => [
                            styles.optionCard,
                            { backgroundColor: theme.colors.surface },
                            pressed && styles.optionCardPressed,
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: globalColors.primary + '20' },
                                ]}
                            >
                                <IconButton
                                    icon="cart-plus"
                                    size={32}
                                    iconColor={globalColors.primary}
                                    style={styles.cardIcon}
                                />
                            </View>
                            <Text
                                variant="titleLarge"
                                style={[styles.cardTitle, { color: globalColors.text }]}
                            >
                                Carga de Compra
                            </Text>
                        </View>
                        <Text
                            variant="bodyMedium"
                            style={[styles.cardDescription, { color: globalColors.textSecondary }]}
                        >
                            Genera un movimiento de stock a una bodega en base a lo que se compró de
                            proveedores
                        </Text>
                        <View style={styles.cardFooter}>
                            <Text
                                variant="labelMedium"
                                style={[styles.cardActionText, { color: globalColors.primary }]}
                            >
                                Iniciar →
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => router.push('/(tabs)/(stack)/stock-movement')}
                        style={({ pressed }) => [
                            styles.optionCard,
                            { backgroundColor: theme.colors.surface },
                            pressed && styles.optionCardPressed,
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: globalColors.secondary + '20' },
                                ]}
                            >
                                <IconButton
                                    icon="package-variant"
                                    size={32}
                                    iconColor={globalColors.secondary}
                                    style={styles.cardIcon}
                                />
                            </View>
                            <Text
                                variant="titleLarge"
                                style={[styles.cardTitle, { color: globalColors.text }]}
                            >
                                Movimiento de Stock
                            </Text>
                        </View>
                        <Text
                            variant="bodyMedium"
                            style={[styles.cardDescription, { color: globalColors.textSecondary }]}
                        >
                            Sacar stock de bodega para el transporte o del transporte a una máquina
                            vending
                        </Text>
                        <View style={styles.cardFooter}>
                            <Text
                                variant="labelMedium"
                                style={[styles.cardActionText, { color: globalColors.secondary }]}
                            >
                                Iniciar →
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};
