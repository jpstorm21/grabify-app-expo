import React from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import { formatCLP } from '@/utils/price';
import { styles } from './styles';

export interface SelectedProduct {
    id: number;
    name: string;
    quantity: number;
    netPrice?: string;
}

interface ProductListProps {
    products: SelectedProduct[];
    onUpdateQuantity: (productId: number, delta: number) => void;
    onRemove: (productId: number) => void;
    onOpenSearch: () => void;
    onOpenScanner: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
    products,
    onUpdateQuantity,
    onRemove,
    onOpenSearch,
    onOpenScanner,
}) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant="titleLarge" style={styles.title}>
                    Lista Productos
                </Text>
                <View style={styles.headerButtons}>
                    <IconButton icon="magnify" size={24} onPress={onOpenSearch} />
                    <IconButton icon="camera" size={24} onPress={onOpenScanner} />
                </View>
            </View>
            {products.length === 0 ? (
                <Text
                    variant="bodyMedium"
                    style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
                >
                    No hay productos agregados
                </Text>
            ) : (
                products.map((product) => (
                    <View key={product.id} style={styles.productItem}>
                        <Text variant="bodyLarge" style={styles.productName}>
                            {product.name}
                            {product.netPrice && ` - ${formatCLP(Number(product.netPrice))}`}
                        </Text>
                        <View style={styles.productControls}>
                            <IconButton
                                icon="minus"
                                size={20}
                                onPress={() => onUpdateQuantity(product.id, -1)}
                            />
                            <Text variant="bodyLarge" style={styles.quantityText}>
                                {product.quantity}
                            </Text>
                            <IconButton
                                icon="plus"
                                size={20}
                                onPress={() => onUpdateQuantity(product.id, 1)}
                            />
                            <IconButton
                                icon="delete"
                                size={20}
                                iconColor={theme.colors.error}
                                onPress={() => onRemove(product.id)}
                            />
                        </View>
                    </View>
                ))
            )}
        </View>
    );
};
