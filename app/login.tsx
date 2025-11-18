import { Redirect } from 'expo-router';
import React from 'react';

import { authState } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/store/hooks';
import { LoginScreen } from '@/screens';

export default function Login() {
    const { isAuthenticated } = useAppSelector(authState);

    if (isAuthenticated) {
        return <Redirect href="/(tabs)/home" />;
    }

    return <LoginScreen />;
}
