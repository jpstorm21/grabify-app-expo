import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, IconButton, Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper';

import { styles } from './styles';

interface Product {
    id: number;
    name: string;
}

interface ProductSearchModalProps {
    visible: boolean;
    onDismiss: () => void;
    searchInput: string;
    onSearchChange: (text: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    showDropdown: boolean;
    filteredProducts: Product[];
    onSelectProduct: (product: Product) => void;
}

export const ProductSearchModal: React.FC<ProductSearchModalProps> = ({
    visible,
    onDismiss,
    searchInput,
    onSearchChange,
    onFocus,
    onBlur,
    showDropdown,
    filteredProducts,
    onSelectProduct,
}) => {
    const theme = useTheme();

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    styles.modalContent,
                    { backgroundColor: theme.colors.surface },
                ]}
            >
                <View style={styles.modalHeader}>
                    <Text variant="headlineSmall">Buscar Producto</Text>
                    <IconButton icon="close" onPress={onDismiss} />
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        label="Buscar producto"
                        value={searchInput}
                        onChangeText={onSearchChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        mode="outlined"
                        style={styles.searchInput}
                    />
                    {showDropdown && filteredProducts.length > 0 && (
                        <ScrollView
                            style={styles.productDropdown}
                            keyboardShouldPersistTaps="always"
                        >
                            {filteredProducts.map((product) => (
                                <Button
                                    key={product.id}
                                    onPress={() => onSelectProduct(product)}
                                    style={styles.dropdownItem}
                                    textColor={theme.colors.onSurface}
                                >
                                    {product.name}
                                </Button>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </Modal>
        </Portal>
    );
};
