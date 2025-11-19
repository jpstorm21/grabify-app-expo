import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="purchase-load" options={{ headerShown: false }} />
            <Stack.Screen name="stock-movement" options={{ headerShown: false }} />
            <Stack.Screen name="account-info" options={{ headerShown: false }} />
        </Stack>
    );
}
