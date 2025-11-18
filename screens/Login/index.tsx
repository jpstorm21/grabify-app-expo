import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Card, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

import { Loading } from '@/components';
import { notify } from '@/lib/toast';
import {
    authState,
    clearError,
    clearMessage,
    clearStatus,
    loginUser,
} from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { formatRutUtil, isValidRut } from '@/utils/rut';
import { styles } from './styles';

export const LoginScreen: React.FC = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(authState);
    const isLoading = status === 'loading';

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: { rut: '', password: '' },
        validationSchema: Yup.object({
            rut: Yup.string()
                .max(255, 'Máximo 255 caracteres')
                .required('Rut es requerido')
                .test('validate-rut', 'El Rut no es válido', (value) => isValidRut(value || '')),
            password: Yup.string()
                .max(255, 'Máximo 255 caracteres')
                .required('Contraseña es requerida'),
        }),
        onSubmit: async ({ rut, password }) => {
            const promise = dispatch(loginUser({ rut, password, userType: 'admin' })).unwrap();
            await notify.promise(
                promise,
                {
                    pending: 'Iniciando sesión…',
                    success: 'Sesión iniciada correctamente',
                    error: 'No pudimos iniciar sesión',
                },
                {
                    position: 'bottom',
                    onClose: () => {
                        dispatch(clearError());
                        dispatch(clearMessage());
                        dispatch(clearStatus());
                    },
                },
            );
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.cardShell}>
                        <Card style={styles.card}>
                            <Card.Content style={styles.cardContent}>
                                <View style={styles.brandRow}>
                                    <Image
                                        source={require('../../assets/Logos/logo.png')}
                                        style={styles.logoTop}
                                    />
                                    <Image
                                        source={require('../../assets/Logos/brand-logo.png')}
                                        style={styles.wordmark}
                                    />
                                    <Text
                                        variant="bodyLarge"
                                        style={[styles.subtitle, { color: theme.colors.onSurface }]}
                                    >
                                        Inicia sesión para continuar
                                    </Text>
                                </View>
                                <TextInput
                                    label="RUT"
                                    value={formik.values.rut}
                                    onChangeText={(text) => {
                                        const formatted = formatRutUtil(text);
                                        formik.setFieldValue('rut', formatted, true);
                                    }}
                                    onBlur={() => formik.handleBlur('rut')}
                                    mode="outlined"
                                    autoCapitalize="none"
                                    left={<TextInput.Icon icon="account" />}
                                    style={styles.input}
                                    error={Boolean(formik.touched.rut && formik.errors.rut)}
                                />
                                {formik.touched.rut && formik.errors.rut && (
                                    <HelperText
                                        type="error"
                                        visible={true}
                                        style={styles.errorText}
                                    >
                                        {formik.errors.rut}
                                    </HelperText>
                                )}
                                <TextInput
                                    label="Contraseña"
                                    value={formik.values.password}
                                    onChangeText={formik.handleChange('password')}
                                    onBlur={() => formik.handleBlur('password')}
                                    mode="outlined"
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    left={<TextInput.Icon icon="lock" />}
                                    right={
                                        <TextInput.Icon
                                            icon={showPassword ? 'eye-off' : 'eye'}
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    }
                                    style={styles.input}
                                    error={Boolean(
                                        formik.touched.password && formik.errors.password,
                                    )}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <HelperText
                                        type="error"
                                        visible={true}
                                        style={styles.errorText}
                                    >
                                        {formik.errors.password}
                                    </HelperText>
                                )}
                                <View style={styles.actions}>
                                    <Button
                                        mode="contained"
                                        onPress={() => formik.handleSubmit()}
                                        style={styles.loginButton}
                                        contentStyle={styles.buttonContent}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Cargando…' : 'Iniciar sesión'}
                                    </Button>
                                </View>
                                <View style={styles.bottomRow}>
                                    <Button
                                        mode="text"
                                        onPress={() => console.log('Forgot password')}
                                        style={styles.forgotButton}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Button>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                </View>
            </KeyboardAvoidingView>
            {isLoading && <Loading />}
        </SafeAreaView>
    );
};
