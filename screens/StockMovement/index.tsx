import React from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DateSelector, Loading } from '@/components';
import { globalStyles } from '@/constants';

import { BarcodeScannerModal } from '../PurchaseLoad/components/BarcodeScannerModal';
import { ProductConfirmModal } from '../PurchaseLoad/components/ProductConfirmModal';
import { ProductList } from '../PurchaseLoad/components/ProductList';
import { ProductSearchModal } from '../PurchaseLoad/components/ProductSearchModal';
import { WarehouseSelector } from '../PurchaseLoad/components/WarehouseSelector';
import { useStockMovement } from './hooks/useStockMovement';
import { styles } from './styles';

export const StockMovementScreen: React.FC = () => {
    const theme = useTheme();
    const {
        // Loading states
        isLoading,
        isProductsLoading,
        isStockMovementLoading,
        // Origin Warehouse
        selectedOriginWarehouse,
        originWarehouseInput,
        setOriginWarehouseInput,
        showOriginWarehouseDropdown,
        setShowOriginWarehouseDropdown,
        filteredOriginWarehouses,
        handleOriginWarehouseSelect,
        clearOriginWarehouse,
        // Destination Warehouse
        selectedDestinationWarehouse,
        destinationWarehouseInput,
        setDestinationWarehouseInput,
        showDestinationWarehouseDropdown,
        setShowDestinationWarehouseDropdown,
        filteredDestinationWarehouses,
        handleDestinationWarehouseSelect,
        clearDestinationWarehouse,
        // Date and comment
        selectedDate,
        setSelectedDate,
        comment,
        setComment,
        // Products
        selectedProducts,
        filteredProducts,
        productSearchInput,
        setProductSearchInput,
        showProductDropdown,
        setShowProductDropdown,
        // Modals
        showProductModal,
        setShowProductModal,
        showScanner,
        setShowScanner,
        showProductConfirmModal,
        pendingProduct,
        pendingQuantity,
        setPendingQuantity,
        // Actions
        openProductConfirmModal,
        confirmAddProduct,
        cancelProductConfirm,
        handleBarcodeScanned,
        updateProductQuantity,
        removeProduct,
        handleConfirm,
    } = useStockMovement();

    const handleOriginWarehouseFocus = () => {
        setShowOriginWarehouseDropdown(true);
    };

    const handleOriginWarehouseBlur = () => {
        setTimeout(() => setShowOriginWarehouseDropdown(false), 200);
    };

    const handleDestinationWarehouseFocus = () => {
        setShowDestinationWarehouseDropdown(true);
    };

    const handleDestinationWarehouseBlur = () => {
        setTimeout(() => setShowDestinationWarehouseDropdown(false), 200);
    };

    const handleProductSearchFocus = () => {
        setShowProductDropdown(true);
    };

    const handleProductSearchBlur = () => {
        setTimeout(() => setShowProductDropdown(false), 200);
    };

    const handleProductSearchChange = (text: string) => {
        setProductSearchInput(text);
        setShowProductDropdown(true);
    };

    const handleProductSearchDismiss = () => {
        setShowProductModal(false);
        setProductSearchInput('');
        setShowProductDropdown(false);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="always"
            >
                <WarehouseSelector
                    value={originWarehouseInput}
                    onChangeText={(text) => {
                        setOriginWarehouseInput(text);
                        setShowOriginWarehouseDropdown(true);
                    }}
                    onFocus={handleOriginWarehouseFocus}
                    onBlur={handleOriginWarehouseBlur}
                    onSelect={handleOriginWarehouseSelect}
                    onClear={clearOriginWarehouse}
                    showDropdown={showOriginWarehouseDropdown}
                    filteredWarehouses={filteredOriginWarehouses}
                    label="Desde"
                />
                <WarehouseSelector
                    value={destinationWarehouseInput}
                    onChangeText={(text) => {
                        setDestinationWarehouseInput(text);
                        setShowDestinationWarehouseDropdown(true);
                    }}
                    onFocus={handleDestinationWarehouseFocus}
                    onBlur={handleDestinationWarehouseBlur}
                    onSelect={handleDestinationWarehouseSelect}
                    onClear={clearDestinationWarehouse}
                    showDropdown={showDestinationWarehouseDropdown}
                    filteredWarehouses={filteredDestinationWarehouses}
                    label="Hacia"
                />
                {selectedOriginWarehouse !== null && selectedDestinationWarehouse !== null && (
                    <DateSelector
                        value={selectedDate.toISOString()}
                        onDateChange={setSelectedDate}
                    />
                )}
                {selectedOriginWarehouse !== null &&
                    selectedDestinationWarehouse !== null &&
                    selectedDate && (
                        <TextInput
                            label="Comentario (opcional)"
                            value={comment}
                            onChangeText={setComment}
                            mode="outlined"
                            multiline
                            numberOfLines={3}
                            style={{ marginTop: 16 }}
                        />
                    )}
                {selectedOriginWarehouse !== null &&
                    selectedDestinationWarehouse !== null &&
                    selectedDate && (
                        <ProductList
                            products={selectedProducts}
                            onUpdateQuantity={updateProductQuantity}
                            onRemove={removeProduct}
                            onOpenSearch={() => setShowProductModal(true)}
                            onOpenScanner={() => setShowScanner(true)}
                        />
                    )}
                {selectedOriginWarehouse !== null &&
                    selectedDestinationWarehouse !== null &&
                    selectedProducts.length > 0 && (
                        <Button
                            mode="contained"
                            onPress={handleConfirm}
                            style={styles.confirmButton}
                            buttonColor={theme.colors.primary}
                        >
                            Confirmar
                        </Button>
                    )}
            </ScrollView>
            <ProductSearchModal
                visible={showProductModal}
                onDismiss={handleProductSearchDismiss}
                searchInput={productSearchInput}
                onSearchChange={handleProductSearchChange}
                onFocus={handleProductSearchFocus}
                onBlur={handleProductSearchBlur}
                showDropdown={showProductDropdown}
                filteredProducts={filteredProducts}
                onSelectProduct={openProductConfirmModal}
            />
            <BarcodeScannerModal
                visible={showScanner}
                onDismiss={() => setShowScanner(false)}
                onScan={handleBarcodeScanned}
            />
            <ProductConfirmModal
                visible={showProductConfirmModal}
                product={pendingProduct}
                quantity={pendingQuantity}
                netPrice=""
                onQuantityChange={setPendingQuantity}
                onNetPriceChange={() => {}}
                onConfirm={confirmAddProduct}
                onCancel={cancelProductConfirm}
                showNetPrice={false}
            />
            {(isLoading || isProductsLoading || isStockMovementLoading) && <Loading />}
        </SafeAreaView>
    );
};

export default StockMovementScreen;
