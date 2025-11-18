import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ToastManager from 'toastify-react-native';

import { ThemeContextProvider } from '@/context/ThemeContext';
import { persistor, store } from '@/redux/store';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ToastManager />
                <ThemeContextProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="login" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </ThemeContextProvider>
            </PersistGate>
        </Provider>
    );
}
