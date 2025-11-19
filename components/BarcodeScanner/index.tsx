import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';

export const BarcodeScanner: React.FC = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [lastCode, setLastCode] = useState<string | null>(null);

    // 1) Estado inicial: aún cargando estado del permiso
    if (!permission) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator />
                <Text style={{ marginTop: 8 }}>Cargando permisos de cámara…</Text>
            </View>
        );
    }

    // 2) Si no está concedido, pedimos permiso
    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>
                    Necesitamos permiso para usar la cámara y escanear códigos.
                </Text>
                <Button title="Dar permiso" onPress={requestPermission} />
            </View>
        );
    }

    const handleBarcodeScanned = (result: BarcodeScanningResult) => {
        const { type, data } = result; // raw incluye info extra (bounds, etc.)

        setScanned(true);
        setLastCode(data);

        // Aquí haces lo que quieras con el código
        Alert.alert(
            'Código escaneado',
            `Tipo: ${type}\nDato: ${data}`,
            [
                {
                    text: 'Escanear de nuevo',
                    onPress: () => setScanned(false),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={styles.container}>
            {/* Vista de cámara ocupando toda la pantalla */}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                // Limitas qué tipos de códigos quieres leer (puedes ajustar la lista)
                barcodeScannerSettings={{
                    barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'],
                }}
                // Truco para evitar lecturas múltiples seguidas:
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />

            {/* Overlay inferior con info y botón para reescanear */}
            <View style={styles.bottomPanel}>
                <Text style={styles.instructions}>Apunta la cámara hacia el código de barras.</Text>

                {lastCode && (
                    <Text style={styles.lastCode}>
                        Último código: <Text style={styles.lastCodeValue}>{lastCode}</Text>
                    </Text>
                )}

                {scanned && (
                    <Button title="Escanear otro código" onPress={() => setScanned(false)} />
                )}
            </View>
        </View>
    );
};
