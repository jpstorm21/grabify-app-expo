import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import { globalColors, globalStyles } from '@/constants';
import { authState, logoutUser } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { styles } from './styles';

const EMPLOYEE_TYPE = 'employee';

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

    const warehouses = user?.warehouse || [];
    const vehicles = user?.vehicle ? [user.vehicle] : [];

    return (
        <View style={globalStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.headerSection}>
                        <View style={styles.greetingContainer}>
                            <Text
                                variant="bodyLarge"
                                style={[styles.greetingText, { color: globalColors.text }]}
                            >
                                {user?.name}
                            </Text>
                            <View style={styles.avatarContainer}>
                                {user?.photosPaths && user?.photosPaths.length > 0 ? (
                                    <Image
                                        source={{ uri: user?.photosPaths[0]?.path }}
                                        style={{ width: '100%', height: '100%', borderRadius: 32 }}
                                    />
                                ) : (
                                    <IconButton
                                        icon="account"
                                        size={32}
                                        iconColor={globalColors.primary}
                                        style={styles.avatarIcon}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.section}>
                        <Text
                            variant="bodyLarge"
                            style={[
                                styles.sectionTitle,
                                { color: globalColors.text, marginBottom: 16 },
                            ]}
                        >
                            Cuenta
                        </Text>
                        <Pressable
                            onPress={handleAccountInfo}
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
                                        icon="account-edit"
                                        size={28}
                                        iconColor={globalColors.primary}
                                        style={styles.cardIcon}
                                    />
                                </View>
                                <View style={styles.cardContent}>
                                    <Text
                                        variant="bodyLarge"
                                        style={[styles.cardTitle, { color: globalColors.text }]}
                                    >
                                        Modificar Datos
                                    </Text>
                                    <Text
                                        variant="bodySmall"
                                        style={[
                                            styles.cardSubtitle,
                                            { color: globalColors.textSecondary },
                                        ]}
                                    >
                                        Actualiza tu información personal
                                    </Text>
                                </View>
                                <IconButton
                                    icon="chevron-right"
                                    size={24}
                                    iconColor={globalColors.textSecondary}
                                    style={styles.chevronIcon}
                                />
                            </View>
                        </Pressable>
                    </View>
                    {user?.type === EMPLOYEE_TYPE && (
                        <>
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Text
                                        variant="titleMedium"
                                        style={[styles.sectionTitle, { color: globalColors.text }]}
                                    >
                                        Máquinas Asignadas
                                    </Text>
                                    {warehouses.length > 0 && (
                                        <View style={styles.countBadge}>
                                            <Text
                                                variant="labelSmall"
                                                style={[
                                                    styles.countText,
                                                    { color: globalColors.textSecondary },
                                                ]}
                                            >
                                                {warehouses.length}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                {warehouses.length > 0 ? (
                                    <View style={styles.cardsContainer}>
                                        {warehouses.map((warehouse) => (
                                            <Pressable
                                                key={warehouse.id}
                                                style={({ pressed }) => [
                                                    styles.warehouseCard,
                                                    { backgroundColor: theme.colors.surface },
                                                    pressed && styles.optionCardPressed,
                                                ]}
                                            >
                                                <View style={styles.cardHeader}>
                                                    <View
                                                        style={[
                                                            styles.iconContainer,
                                                            {
                                                                backgroundColor:
                                                                    globalColors.secondary + '20',
                                                            },
                                                        ]}
                                                    >
                                                        <IconButton
                                                            icon="package-variant"
                                                            size={28}
                                                            iconColor={globalColors.secondary}
                                                            style={styles.cardIcon}
                                                        />
                                                    </View>
                                                    <View style={styles.cardContent}>
                                                        <Text
                                                            variant="bodyLarge"
                                                            style={[
                                                                styles.cardTitle,
                                                                { color: globalColors.text },
                                                            ]}
                                                        >
                                                            {warehouse.name}
                                                        </Text>
                                                        {warehouse.description && (
                                                            <Text
                                                                variant="bodySmall"
                                                                style={[
                                                                    styles.cardSubtitle,
                                                                    {
                                                                        color: globalColors.textSecondary,
                                                                    },
                                                                ]}
                                                            >
                                                                {warehouse.description}
                                                            </Text>
                                                        )}
                                                        {warehouse.kind && (
                                                            <Text
                                                                variant="labelSmall"
                                                                style={[
                                                                    styles.cardLabel,
                                                                    {
                                                                        color: globalColors.textSecondary,
                                                                    },
                                                                ]}
                                                            >
                                                                Tipo: {warehouse.kind}
                                                            </Text>
                                                        )}
                                                    </View>
                                                </View>
                                            </Pressable>
                                        ))}
                                    </View>
                                ) : (
                                    <View style={styles.emptyCard}>
                                        <Text
                                            variant="bodyMedium"
                                            style={[
                                                styles.emptyText,
                                                { color: globalColors.textSecondary },
                                            ]}
                                        >
                                            No hay máquinas asignadas
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Text
                                        variant="titleMedium"
                                        style={[styles.sectionTitle, { color: globalColors.text }]}
                                    >
                                        Vehículos Asignados
                                    </Text>
                                    {vehicles.length > 0 && (
                                        <View style={styles.countBadge}>
                                            <Text
                                                variant="labelSmall"
                                                style={[
                                                    styles.countText,
                                                    { color: globalColors.textSecondary },
                                                ]}
                                            >
                                                {vehicles.length}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                {vehicles.length > 0 ? (
                                    <View style={styles.cardsContainer}>
                                        {vehicles.map((vehicle) => (
                                            <Pressable
                                                key={vehicle.id}
                                                style={({ pressed }) => [
                                                    styles.vehicleCard,
                                                    { backgroundColor: theme.colors.surface },
                                                    pressed && styles.optionCardPressed,
                                                ]}
                                            >
                                                <View style={styles.cardHeader}>
                                                    <View
                                                        style={[
                                                            styles.iconContainer,
                                                            {
                                                                backgroundColor:
                                                                    globalColors.info + '20',
                                                            },
                                                        ]}
                                                    >
                                                        <IconButton
                                                            icon="car"
                                                            size={28}
                                                            iconColor={globalColors.info}
                                                            style={styles.cardIcon}
                                                        />
                                                    </View>
                                                    <View style={styles.cardContent}>
                                                        <Text
                                                            variant="bodyLarge"
                                                            style={[
                                                                styles.cardTitle,
                                                                { color: globalColors.text },
                                                            ]}
                                                        >
                                                            {vehicle.brand} {vehicle.model}
                                                        </Text>
                                                        <Text
                                                            variant="bodySmall"
                                                            style={[
                                                                styles.cardSubtitle,
                                                                {
                                                                    color: globalColors.textSecondary,
                                                                },
                                                            ]}
                                                        >
                                                            Patente: {vehicle.licensePlate}
                                                        </Text>
                                                        {vehicle.year && (
                                                            <Text
                                                                variant="labelSmall"
                                                                style={[
                                                                    styles.cardLabel,
                                                                    {
                                                                        color: globalColors.textSecondary,
                                                                    },
                                                                ]}
                                                            >
                                                                Año: {vehicle.year}
                                                            </Text>
                                                        )}
                                                    </View>
                                                </View>
                                            </Pressable>
                                        ))}
                                    </View>
                                ) : (
                                    <View style={styles.emptyCard}>
                                        <Text
                                            variant="bodyMedium"
                                            style={[
                                                styles.emptyText,
                                                { color: globalColors.textSecondary },
                                            ]}
                                        >
                                            No hay vehículos asignados
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </>
                    )}
                    <Pressable
                        onPress={handleLogout}
                        disabled={isLoading}
                        style={({ pressed }) => [
                            styles.logoutCard,
                            { backgroundColor: theme.colors.tertiary },
                            pressed && styles.logoutCardPressed,
                            isLoading && styles.logoutCardDisabled,
                        ]}
                    >
                        <View style={styles.logoutContent}>
                            <IconButton
                                icon="logout"
                                size={24}
                                iconColor={globalColors.background}
                                style={styles.logoutIcon}
                            />
                            <Text
                                variant="bodyLarge"
                                style={[styles.logoutText, { color: globalColors.background }]}
                            >
                                {isLoading ? 'Cerrando sesión...' : 'CERRAR SESIÓN'}
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;
