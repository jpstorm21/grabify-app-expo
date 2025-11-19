import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { IconButton } from 'react-native-paper';

import { globalColors } from '@/constants';
import { authState } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/store/hooks';

export default function TabLayout() {
    const { isAuthenticated } = useAppSelector(authState);

    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: globalColors.primary,
                tabBarInactiveTintColor: globalColors.textSecondary,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IconButton icon="home" size={size} iconColor={color} />
                    ),
                    tabBarLabel: 'Inicio',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IconButton icon="account-hard-hat" size={size} iconColor={color} />
                    ),
                    tabBarLabel: 'Perfil',
                }}
            />
            <Tabs.Screen
                name="(stack)"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
