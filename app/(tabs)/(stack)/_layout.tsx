import { Stack, useRouter, useSegments } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

import { globalColors } from '@/constants';

function BackButton() {
    const router = useRouter();
    const segments = useSegments();

    const handleBack = () => {
        const currentRoute = segments[segments.length - 1];

        if (currentRoute === 'account-info') {
            router.push('/(tabs)/profile');
        } else if (currentRoute === 'purchase-load' || currentRoute === 'stock-movement') {
            router.push('/(tabs)/home');
        } else {
            router.back();
        }
    };

    return (
        <TouchableOpacity onPress={handleBack} style={{ marginLeft: -8 }}>
            <IconButton icon="arrow-left" iconColor={globalColors.text} size={24} />
        </TouchableOpacity>
    );
}

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerLeft: () => <BackButton />,
                headerTitle: () => (
                    <Image
                        source={require('../../../assets/brand-logo.png')}
                        style={{ width: 150, height: 80, maxWidth: 150, maxHeight: 80 }}
                        resizeMode="contain"
                    />
                ),
                headerStyle: {
                    backgroundColor: globalColors.disabled,
                },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="purchase-load" />
            <Stack.Screen name="stock-movement" />
            <Stack.Screen name="account-info" />
        </Stack>
    );
}
