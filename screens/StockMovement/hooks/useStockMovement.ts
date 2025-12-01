import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { SelectedProduct } from '@/components/ProductList';
import { notify } from '@/lib/toast';
import { authState } from '@/redux/auth/authSlice';
import { fecthProducts, productState } from '@/redux/product/productSlice';
import {
    createStockMovementThunk,
    stockMovementState,
} from '@/redux/stockMovement/stockMovementSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { fecthWarehousesThunk, warehouseState } from '@/redux/warehouse/warehouseSlice';
import { WAREHOUSE_TYPE } from '@/utils/warehouse';

export const useStockMovement = () => {
    const dispatch = useAppDispatch();
    const { status: warehousesStatus, data: warehousesData } = useAppSelector(warehouseState);
    const {
        status: productsStatus,
        options: productsOptions,
        data: productsData,
    } = useAppSelector(productState);
    const { user } = useAppSelector(authState);
    const { status: stockMovementStatus } = useAppSelector(stockMovementState);

    const isLoading = warehousesStatus === 'loading';
    const isProductsLoading = productsStatus === 'loading';
    const isStockMovementLoading = stockMovementStatus === 'loading';

    const [selectedOriginWarehouse, setSelectedOriginWarehouse] = useState<number | null>(null);
    const [originWarehouseInput, setOriginWarehouseInput] = useState('');
    const [showOriginWarehouseDropdown, setShowOriginWarehouseDropdown] = useState(false);

    const [selectedDestinationWarehouse, setSelectedDestinationWarehouse] = useState<number | null>(
        null,
    );
    const [destinationWarehouseInput, setDestinationWarehouseInput] = useState('');
    const [showDestinationWarehouseDropdown, setShowDestinationWarehouseDropdown] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [comment, setComment] = useState<string>('');

    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [productSearchInput, setProductSearchInput] = useState('');
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [showProductConfirmModal, setShowProductConfirmModal] = useState(false);

    const [pendingProduct, setPendingProduct] = useState<ProductOptions | null>(null);
    const [pendingQuantity, setPendingQuantity] = useState<string>('1');

    useEffect(() => {
        (async () => {
            await dispatch(
                fecthWarehousesThunk([
                    WAREHOUSE_TYPE.WAREHOUSE,
                    WAREHOUSE_TYPE.TRANSPORT,
                    WAREHOUSE_TYPE.VENDING,
                ]),
            );
            await dispatch(fecthProducts());
        })();
    }, [dispatch]);

    const filteredOriginWarehouses = warehousesData
        .filter((warehouse) => warehouse.kind !== WAREHOUSE_TYPE.VENDING)
        .filter((warehouse) =>
            warehouse.name.toLowerCase().includes(originWarehouseInput.toLowerCase()),
        )
        .map((warehouse) => ({
            id: +warehouse.id,
            name: warehouse.name,
        }));

    const filteredDestinationWarehouses = warehousesData
        .filter((warehouse) =>
            warehouse.name.toLowerCase().includes(destinationWarehouseInput.toLowerCase()),
        )
        .map((warehouse) => ({
            id: +warehouse.id,
            name: warehouse.name,
        }));

    const filteredProducts = productsOptions.filter((product) =>
        product.name.toLowerCase().includes(productSearchInput.toLowerCase()),
    );

    const findProductByBarcode = (barcode: string): ProductOptions | null => {
        const product = productsData.find((p) => p.shared === barcode);
        if (product) {
            return { id: product.id, name: product.name };
        }
        return null;
    };

    const openProductConfirmModal = (productOption: ProductOptions) => {
        setPendingProduct(productOption);
        setPendingQuantity('1');
        setShowProductConfirmModal(true);
        setProductSearchInput('');
        setShowProductDropdown(false);
        setShowProductModal(false);
    };

    const confirmAddProduct = () => {
        if (!pendingProduct) return;

        const quantity = parseInt(pendingQuantity, 10);

        if (isNaN(quantity) || quantity <= 0) {
            Alert.alert('Error', 'La cantidad debe ser un número mayor a 0');
            return;
        }

        const existingProduct = selectedProducts.find((p) => p.id === pendingProduct.id);

        if (existingProduct) {
            setSelectedProducts(
                selectedProducts.map((p) =>
                    p.id === pendingProduct.id ? { ...p, quantity: p.quantity + quantity } : p,
                ),
            );
        } else {
            setSelectedProducts([
                ...selectedProducts,
                { id: pendingProduct.id, name: pendingProduct.name, quantity },
            ]);
        }

        setShowProductConfirmModal(false);
        setPendingProduct(null);
        setPendingQuantity('1');
    };

    const cancelProductConfirm = () => {
        setShowProductConfirmModal(false);
        setPendingProduct(null);
        setPendingQuantity('1');
    };

    const handleBarcodeScanned = (code: string) => {
        const product = findProductByBarcode(code);
        if (product) {
            openProductConfirmModal(product);
        } else {
            Alert.alert(
                'Producto no encontrado',
                `No se encontró un producto con el código: ${code}`,
            );
        }
    };

    const updateProductQuantity = (productId: number, delta: number) => {
        setSelectedProducts(
            selectedProducts.map((p) => {
                if (p.id === productId) {
                    const newQuantity = p.quantity + delta;
                    return { ...p, quantity: Math.max(1, newQuantity) };
                }
                return p;
            }),
        );
    };

    const removeProduct = (productId: number) => {
        setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
    };

    const handleOriginWarehouseSelect = (warehouse: { id: number; name: string }) => {
        setSelectedOriginWarehouse(warehouse.id);
        setOriginWarehouseInput(warehouse.name);
        setShowOriginWarehouseDropdown(false);
        if (selectedProducts.length > 0) {
            setSelectedProducts([]);
        }
    };

    const clearOriginWarehouse = () => {
        setSelectedOriginWarehouse(null);
        setOriginWarehouseInput('');
        setSelectedProducts([]);
    };

    const handleDestinationWarehouseSelect = (warehouse: { id: number; name: string }) => {
        setSelectedDestinationWarehouse(warehouse.id);
        setDestinationWarehouseInput(warehouse.name);
        setShowDestinationWarehouseDropdown(false);
    };

    const clearDestinationWarehouse = () => {
        setSelectedDestinationWarehouse(null);
        setDestinationWarehouseInput('');
    };

    const clearAll = () => {
        clearDestinationWarehouse();
        clearOriginWarehouse();
        setSelectedProducts([]);
        setShowProductConfirmModal(false);
        setPendingProduct(null);
        setPendingQuantity('1');
        setProductSearchInput('');
        setShowProductDropdown(false);
        setShowProductModal(false);
        setShowScanner(false);
        setSelectedDate(new Date());
        setComment('');
    };

    const handleConfirm = () => {
        if (!selectedOriginWarehouse) {
            Alert.alert('Error', 'Debes seleccionar una bodega de origen');
            return;
        }

        if (!selectedDestinationWarehouse) {
            Alert.alert('Error', 'Debes seleccionar una bodega de destino');
            return;
        }

        if (selectedProducts.length === 0) {
            Alert.alert('Error', 'Debes agregar al menos un producto');
            return;
        }

        Alert.alert(
            'Confirmar movimiento',
            '¿Estás seguro de que deseas realizar este movimiento de stock?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const stockMovementData: StockMovementPayload = {
                            originWarehouseId: selectedOriginWarehouse,
                            destinationWarehouseId: selectedDestinationWarehouse,
                            date: selectedDate.toISOString(),
                            // comment: comment || undefined,
                            products: selectedProducts.map((p) => ({
                                id: +p.id,
                                quantity: p.quantity,
                            })),
                            author: user?.name || '',
                        };

                        const result = await dispatch(createStockMovementThunk(stockMovementData));
                        if (result.meta.requestStatus === 'fulfilled') {
                            notify.success('Movimiento de stock realizado correctamente');
                            clearAll();
                            router.push('/(tabs)/home');
                        } else {
                            notify.error('Error al realizar el movimiento de stock');
                        }
                    },
                },
            ],
        );
    };

    return {
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
    };
};
