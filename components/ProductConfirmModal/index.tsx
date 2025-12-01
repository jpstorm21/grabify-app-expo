import React from 'react';
import { View } from 'react-native';
import { Button, IconButton, Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper';

import { styles } from './styles';

interface Product {
    id: number;
    name: string;
}

interface ProductConfirmModalProps {
    visible: boolean;
    product: Product | null;
    quantity: string;
    netPrice: string;
    onQuantityChange: (quantity: string) => void;
    onNetPriceChange: (price: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
    showNetPrice?: boolean;
}

export const ProductConfirmModal: React.FC<ProductConfirmModalProps> = ({
    visible,
    product,
    quantity,
    netPrice,
    onQuantityChange,
    onNetPriceChange,
    onConfirm,
    onCancel,
    showNetPrice = true,
}) => {
    const theme = useTheme();

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onCancel}
                contentContainerStyle={[
                    styles.modalContent,
                    { backgroundColor: theme.colors.surface },
                ]}
            >
                <View style={styles.modalHeader}>
                    <Text variant="headlineSmall">Agregar Producto</Text>
                    <IconButton icon="close" onPress={onCancel} />
                </View>
                {product && (
                    <View style={styles.container}>
                        <Text variant="titleMedium" style={styles.productName}>
                            {product.name}
                        </Text>
                        <TextInput
                            label="Cantidad"
                            value={quantity}
                            onChangeText={onQuantityChange}
                            keyboardType="numeric"
                            mode="outlined"
                            style={styles.input}
                        />
                        {showNetPrice && (
                            <TextInput
                                label="Precio Neto"
                                value={netPrice}
                                onChangeText={onNetPriceChange}
                                keyboardType="decimal-pad"
                                mode="outlined"
                                style={styles.input}
                            />
                        )}
                        <View style={styles.buttons}>
                            <Button mode="outlined" onPress={onCancel} style={styles.buttonCancel}>
                                Cancelar
                            </Button>
                            <Button
                                mode="contained"
                                onPress={onConfirm}
                                style={styles.buttonAdd}
                                buttonColor={theme.colors.primary}
                            >
                                Agregar
                            </Button>
                        </View>
                    </View>
                )}
            </Modal>
        </Portal>
    );
};
