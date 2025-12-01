import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';

interface BarcodeScannerProps {
    onScan?: (code: string) => void;
    onClose?: () => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [lastCode, setLastCode] = useState<string | null>(null);

    if (!permission) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator />
                <Text style={{ marginTop: 8 }}>Cargando permisos de cámara…</Text>
            </View>
        );
    }

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
        const { type, data } = result;

        setScanned(true);
        setLastCode(data);

        if (onScan) {
            onScan(data);
            if (onClose) {
                setTimeout(() => {
                    onClose();
                }, 500);
            }
        } else {
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
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
            <View style={styles.bottomPanel}>
                <Text style={styles.instructions}>Apunta la cámara hacia el código de barras.</Text>
                {lastCode && (
                    <Text style={styles.lastCode}>
                        Último código: <Text style={styles.lastCodeValue}>{lastCode}</Text>
                    </Text>
                )}
                {scanned && !onScan && (
                    <Button title="Escanear otro código" onPress={() => setScanned(false)} />
                )}
                {onClose && <Button title="Cerrar" onPress={onClose} color="#e71d36" />}
            </View>
        </View>
    );
};
