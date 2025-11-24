import { useFormik } from 'formik';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

import { globalStyles } from '@/constants';
import { authState } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/store/hooks';
import { styles } from './styles';

export const AccountInfoScreen: React.FC = () => {
    const theme = useTheme();

    const { user } = useAppSelector(authState);

    const [isEditing, setIsEditing] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().max(255, 'Máximo 255 caracteres').required('El nombre es requerido'),
        email: Yup.string()
            .email('El email no es válido')
            .max(255, 'Máximo 255 caracteres')
            .required('El email es requerido'),
        contactPhone: Yup.string()
            .max(20, 'Máximo 20 caracteres')
            .required('El teléfono es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            rut: user?.rut || '',
            email: user?.email || '',
            name: user?.name || '',
            contactPhone: user?.contactPhone || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('Datos del formulario:', values);
            setIsEditing(false);
        },
    });

    const handleActivateEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        formik.resetForm();
        setIsEditing(false);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text
                                variant="headlineMedium"
                                style={[styles.title, { color: theme.colors.onSurface }]}
                            >
                                Información de mi cuenta
                            </Text>
                        </View>

                        <View style={styles.formContainer}>
                            <TextInput
                                label="RUT"
                                value={formik.values.rut}
                                editable={false}
                                mode="outlined"
                                left={<TextInput.Icon icon="card-account-details" />}
                                style={styles.input}
                                disabled={true}
                            />
                            <TextInput
                                label="Nombre"
                                value={formik.values.name}
                                onChangeText={formik.handleChange('name')}
                                onBlur={() => formik.handleBlur('name')}
                                editable={isEditing}
                                disabled={!isEditing}
                                mode="outlined"
                                left={<TextInput.Icon icon="account" />}
                                style={styles.input}
                                error={Boolean(formik.touched.name && formik.errors.name)}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <HelperText type="error" visible={true} style={styles.errorText}>
                                    {formik.errors.name}
                                </HelperText>
                            )}
                            <TextInput
                                label="Email"
                                value={formik.values.email}
                                onChangeText={formik.handleChange('email')}
                                onBlur={() => formik.handleBlur('email')}
                                editable={isEditing}
                                disabled={!isEditing}
                                mode="outlined"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                left={<TextInput.Icon icon="email" />}
                                style={styles.input}
                                error={Boolean(formik.touched.email && formik.errors.email)}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <HelperText type="error" visible={true} style={styles.errorText}>
                                    {formik.errors.email}
                                </HelperText>
                            )}
                            <TextInput
                                label="Teléfono"
                                value={formik.values.contactPhone}
                                onChangeText={formik.handleChange('contactPhone')}
                                onBlur={() => formik.handleBlur('contactPhone')}
                                editable={isEditing}
                                disabled={!isEditing}
                                mode="outlined"
                                keyboardType="phone-pad"
                                left={<TextInput.Icon icon="phone" />}
                                style={styles.input}
                                error={Boolean(
                                    formik.touched.contactPhone && formik.errors.contactPhone,
                                )}
                            />
                            {formik.touched.contactPhone && formik.errors.contactPhone && (
                                <HelperText type="error" visible={true} style={styles.errorText}>
                                    {formik.errors.contactPhone}
                                </HelperText>
                            )}
                            <View style={styles.actions}>
                                {!isEditing ? (
                                    <Button
                                        mode="contained"
                                        onPress={handleActivateEdit}
                                        style={styles.editButton}
                                        contentStyle={styles.buttonContent}
                                        icon="pencil"
                                        buttonColor={theme.colors.primary}
                                    >
                                        Activar edición
                                    </Button>
                                ) : (
                                    <View style={styles.editActions}>
                                        <Button
                                            mode="outlined"
                                            onPress={handleCancel}
                                            style={styles.cancelButton}
                                            contentStyle={styles.buttonContent}
                                            buttonColor={theme.colors.tertiary}
                                            textColor={theme.colors.background}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            mode="contained"
                                            onPress={() => formik.handleSubmit()}
                                            disabled={!formik.isValid || !formik.dirty}
                                            style={styles.saveButton}
                                            contentStyle={styles.buttonContent}
                                            icon="content-save"
                                        >
                                            Guardar
                                        </Button>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
