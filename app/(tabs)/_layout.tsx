import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
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
                headerShown: true,
                headerTitle: () => (
                    <Image
                        source={require('../../assets/brand-logo.png')}
                        style={{ width: 150, height: 80, maxWidth: 150, maxHeight: 80 }}
                        resizeMode="contain"
                    />
                ),
                headerStyle: {
                    backgroundColor: globalColors.disabled,
                },
                headerTitleAlign: 'center',
                headerTitleContainerStyle: {
                    left: 0,
                    right: 0,
                },
                tabBarActiveTintColor: globalColors.tertiary,
                tabBarInactiveTintColor: globalColors.textSecondary,
                tabBarStyle: {
                    backgroundColor: globalColors.disabled,
                },
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
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
