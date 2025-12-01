import React from 'react';
import { View } from 'react-native';
import { IconButton, Modal, Portal, Text } from 'react-native-paper';

import { BarcodeScanner } from '@/components';
import { styles } from './styles';

interface BarcodeScannerModalProps {
    visible: boolean;
    onDismiss: () => void;
    onScan: (code: string) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
    visible,
    onDismiss,
    onScan,
}) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.scannerModal}
            >
                <View style={styles.scannerContainer}>
                    <View style={styles.scannerHeader}>
                        <Text variant="headlineSmall" style={styles.scannerTitle}>
                            Escanear Código
                        </Text>
                        <IconButton icon="close" onPress={onDismiss} iconColor="#fff" />
                    </View>
                    <BarcodeScanner onScan={onScan} onClose={onDismiss} />
                </View>
            </Modal>
        </Portal>
    );
};
