import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="purchase-load" />
            <Stack.Screen name="stock-movement" />
            <Stack.Screen name="account-info" />
        </Stack>
    );
}
