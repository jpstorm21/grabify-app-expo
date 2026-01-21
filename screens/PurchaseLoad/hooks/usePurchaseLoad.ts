import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { SelectedProduct } from '@/components/ProductList';
import { notify } from '@/lib/toast';
import { authState } from '@/redux/auth/authSlice';
import { createPurchaseThunk, purchaseState } from '@/redux/purchase/purchaseSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { fecthSuppliers, supplierState } from '@/redux/supplier/supplierSlice';
import { fecthWarehousesThunk, warehouseState } from '@/redux/warehouse/warehouseSlice';
import { WAREHOUSE_TYPE } from '@/utils/warehouse';

export const usePurchaseLoad = () => {
    const dispatch = useAppDispatch();
    const { status: warehousesStatus, options: warehousesOptions } = useAppSelector(warehouseState);
    const {
        status: suppliersStatus,
        options: suppliersOptions,
        data: suppliersData,
    } = useAppSelector(supplierState);
    const { user } = useAppSelector(authState);
    const { status: purchaseStatus } = useAppSelector(purchaseState);

    const isLoading = warehousesStatus === 'loading';
    const isSuppliersLoading = suppliersStatus === 'loading';
    const isPurchaseLoading = purchaseStatus === 'loading';

    const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
    const [warehouseInput, setWarehouseInput] = useState('');
    const [showWarehouseDropdown, setShowWarehouseDropdown] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
    const [supplierInput, setSupplierInput] = useState('');
    const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
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
    const [pendingNetPrice, setPendingNetPrice] = useState<string>('');

    useEffect(() => {
        (async () => {
            await dispatch(fecthWarehousesThunk([WAREHOUSE_TYPE.WAREHOUSE]));
            await dispatch(fecthSuppliers());
        })();
    }, [dispatch]);

    const supplierProducts = useMemo(() => {
        if (!selectedSupplier) return [];
        const supplier = suppliersData.find((s) => s.id === selectedSupplier);
        if (!supplier) return [];
        return supplier.supplierProduct.map((sp) => ({
            id: sp.product.id,
            name: sp.product.name,
            shared: sp.product.shared,
        }));
    }, [selectedSupplier, suppliersData]);

    const productsOptions = useMemo(() => {
        return supplierProducts.map((p) => ({
            id: p.id,
            name: p.name,
        }));
    }, [supplierProducts]);

    const filteredWarehouses = warehousesOptions.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(warehouseInput.toLowerCase()),
    );

    const filteredSuppliers = suppliersOptions.filter((supplier) =>
        supplier.name.toLowerCase().includes(supplierInput.toLowerCase()),
    );

    const filteredProducts = productsOptions.filter((product) =>
        product.name.toLowerCase().includes(productSearchInput.toLowerCase()),
    );

    const findProductByBarcode = (barcode: string): ProductOptions | null => {
        const product = supplierProducts.find((p) => p.shared === barcode);
        if (product) {
            return { id: product.id, name: product.name };
        }
        return null;
    };

    const openProductConfirmModal = (productOption: ProductOptions) => {
        setPendingProduct(productOption);
        setPendingQuantity('1');
        setPendingNetPrice('');
        setShowProductConfirmModal(true);
        setProductSearchInput('');
        setShowProductDropdown(false);
        setShowProductModal(false);
    };

    const confirmAddProduct = () => {
        if (!pendingProduct) return;

        const quantity = parseInt(pendingQuantity, 10);
        const netPrice = parseFloat(pendingNetPrice);

        if (isNaN(quantity) || quantity <= 0) {
            Alert.alert('Error', 'La cantidad debe ser un número mayor a 0');
            return;
        }

        if (isNaN(netPrice) || netPrice < 0) {
            Alert.alert('Error', 'El precio neto debe ser un número válido mayor o igual a 0');
            return;
        }

        const existingProduct = selectedProducts.find((p) => p.id === pendingProduct.id);

        if (existingProduct) {
            setSelectedProducts(
                selectedProducts.map((p) =>
                    p.id === pendingProduct.id
                        ? { ...p, quantity: p.quantity + quantity, netPrice: netPrice.toString() }
                        : p,
                ),
            );
        } else {
            setSelectedProducts([
                ...selectedProducts,
                { ...pendingProduct, quantity, netPrice: netPrice.toString() },
            ]);
        }

        setShowProductConfirmModal(false);
        setPendingProduct(null);
        setPendingQuantity('1');
        setPendingNetPrice('');
    };

    const cancelProductConfirm = () => {
        setShowProductConfirmModal(false);
        setPendingProduct(null);
        setPendingQuantity('1');
        setPendingNetPrice('');
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

    const handleWarehouseSelect = (warehouse: { id: number; name: string }) => {
        setSelectedWarehouse(warehouse.id);
        setWarehouseInput(warehouse.name);
        setShowWarehouseDropdown(false);
        if (selectedSupplier) {
            clearSupplier();
        }
        if (selectedProducts.length > 0) {
            setSelectedProducts([]);
        }
    };

    const handleSupplierSelect = (supplier: { id: string; name: string }) => {
        setSelectedSupplier(supplier.id);
        setSupplierInput(supplier.name);
        setShowSupplierDropdown(false);
        if (selectedProducts.length > 0) {
            setSelectedProducts([]);
        }
    };

    const clearSupplier = () => {
        setSelectedSupplier(null);
        setSupplierInput('');
        setSelectedProducts([]);
    };

    const clearWarehouse = () => {
        setSelectedWarehouse(null);
        setWarehouseInput('');
        setSelectedProducts([]);
        setSelectedDate(new Date());
        clearSupplier();
    };

    const clearAll = () => {
        clearWarehouse();
        clearSupplier();
        setSelectedProducts([]);
        setSelectedDate(new Date());
        setComment('');
        setShowProductConfirmModal(false);
        setPendingProduct(null);
        setPendingQuantity('1');
        setPendingNetPrice('');
        setShowProductModal(false);
        setShowScanner(false);
        setShowProductDropdown(false);
        setShowWarehouseDropdown(false);
        setShowSupplierDropdown(false);
    };

    const handleConfirm = () => {
        if (!selectedWarehouse) {
            Alert.alert('Error', 'Debes seleccionar una bodega');
            return;
        }

        if (!selectedSupplier) {
            Alert.alert('Error', 'Debes seleccionar un proveedor');
            return;
        }

        if (selectedProducts.length === 0) {
            Alert.alert('Error', 'Debes agregar al menos un producto');
            return;
        }

        Alert.alert('Confirmar carga', '¿Estás seguro de que deseas cargar esta compra?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: async () => {
                    const selectedSupplierData = suppliersData.find((s) => s.id === selectedSupplier);

                    const purchaseData: PurchasePayload = {
                        warehouseId: selectedWarehouse,
                        author: user?.name || '',
                        date: selectedDate.toISOString(),
                        comment: comment,
                        products: selectedProducts.map((p) => ({
                            productId: +p.id,
                            quantity: p.quantity,
                            netPrice: parseFloat(p.netPrice || '0'),
                        })),
                        supplierDocument: selectedSupplierData?.rut || '',
                        supplierName: selectedSupplierData?.name || '',
                    };

                    const result = await dispatch(createPurchaseThunk(purchaseData));
                    if (result.meta.requestStatus === 'fulfilled') {
                        notify.success('Compra cargada correctamente');
                        clearAll();
                        router.push('/(tabs)/home');
                    } else {
                        notify.error('Error al cargar la compra');
                    }
                },
            },
        ]);
    };

    return {
        // Loading states
        isLoading,
        isSuppliersLoading,
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
        // Supplier
        selectedSupplier,
        supplierInput,
        setSupplierInput,
        showSupplierDropdown,
        setShowSupplierDropdown,
        filteredSuppliers,
        handleSupplierSelect,
        clearSupplier,
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
    };
};
