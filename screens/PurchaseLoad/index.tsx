import React from 'react';
import { ScrollView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    BarcodeScannerModal,
    DateSelector,
    Loading,
    ProductConfirmModal,
    ProductList,
    ProductSearchModal,
    WarehouseSelector,
} from '@/components';
import { globalStyles } from '@/constants';

import { usePurchaseLoad } from './hooks/usePurchaseLoad';
import { styles } from './styles';

export const PurchaseLoadScreen: React.FC = () => {
    const theme = useTheme();
    const {
        // Loading states
        isLoading,
        isProductsLoading,
        isPurchaseLoading,
        // Warehouse
        selectedWarehouse,
        warehouseInput,
        setWarehouseInput,
        showWarehouseDropdown,
        setShowWarehouseDropdown,
        filteredWarehouses,
        handleWarehouseSelect,
        clearWarehouse,
        // Date
        selectedDate,
        setSelectedDate,
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
        pendingNetPrice,
        setPendingNetPrice,
        // Actions
        openProductConfirmModal,
        confirmAddProduct,
        cancelProductConfirm,
        handleBarcodeScanned,
        updateProductQuantity,
        removeProduct,
        handleConfirm,
    } = usePurchaseLoad();

    const handleWarehouseFocus = () => {
        setShowWarehouseDropdown(true);
    };

    const handleWarehouseBlur = () => {
        setTimeout(() => setShowWarehouseDropdown(false), 200);
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
                    value={warehouseInput}
                    onChangeText={(text) => {
                        setWarehouseInput(text);
                        setShowWarehouseDropdown(true);
                    }}
                    onFocus={handleWarehouseFocus}
                    onBlur={handleWarehouseBlur}
                    onSelect={handleWarehouseSelect}
                    onClear={clearWarehouse}
                    showDropdown={showWarehouseDropdown}
                    filteredWarehouses={filteredWarehouses}
                />
                {selectedWarehouse !== null && (
                    <DateSelector
                        value={selectedDate.toISOString()}
                        onDateChange={setSelectedDate}
                    />
                )}
                {selectedWarehouse !== null && selectedDate && (
                    <ProductList
                        products={selectedProducts}
                        onUpdateQuantity={updateProductQuantity}
                        onRemove={removeProduct}
                        onOpenSearch={() => setShowProductModal(true)}
                        onOpenScanner={() => setShowScanner(true)}
                    />
                )}
                {selectedWarehouse !== null && selectedProducts.length > 0 && (
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
                netPrice={pendingNetPrice}
                onQuantityChange={setPendingQuantity}
                onNetPriceChange={setPendingNetPrice}
                onConfirm={confirmAddProduct}
                onCancel={cancelProductConfirm}
            />
            {(isLoading || isProductsLoading || isPurchaseLoading) && <Loading />}
        </SafeAreaView>
    );
};

export default PurchaseLoadScreen;
