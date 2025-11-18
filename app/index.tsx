import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';

import { Loading } from '@/components';
import { authState, fecthCheckSession } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';

export default function Index() {
    const dispatch = useAppDispatch();
    const { status, isAuthenticated } = useAppSelector(authState);
    const isLoading = status === 'loading';

    useEffect(() => {
        (async () => {
            await dispatch(fecthCheckSession());
        })();
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    if (isAuthenticated) {
        return <Redirect href="/(tabs)/home" />;
    }

    return <Redirect href="/login" />;
}
