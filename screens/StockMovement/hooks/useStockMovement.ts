import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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

type ProductInfo = { id: number; name: string; shared: string };

const getProductFromWarehouseProduct = (wp: any): Product => {
    return wp.product || wp;
};

const extractProductsFromWarehouse = (warehouse: Warehouse): ProductInfo[] => {
    return warehouse.warehouseProduct.map((wp) => {
        const product = getProductFromWarehouseProduct(wp);
        return {
            id: product.id,
            name: product.name,
            shared: product.shared,
        };
    });
};

const getProductsFromUserWarehouses = (
    userWarehouses: Warehouse[],
    warehousesData: Warehouse[],
): ProductInfo[] => {
    const allProducts = new Map<number, ProductInfo>();
    userWarehouses.forEach((userWarehouse) => {
        const warehouseData = warehousesData.find((w) => String(w.id) === String(userWarehouse.id));
        if (warehouseData) {
            warehouseData.warehouseProduct.forEach((wp) => {
                const product = getProductFromWarehouseProduct(wp);
                if (!allProducts.has(product.id)) {
                    allProducts.set(product.id, {
                        id: product.id,
                        name: product.name,
                        shared: product.shared,
                    });
                }
            });
        }
    });
    return Array.from(allProducts.values());
};

const getAdminAvailableProducts = (
    destinationWarehouse: Warehouse | null,
    isDestinationVending: boolean,
    productsData: Product[],
): ProductInfo[] => {
    if (isDestinationVending && destinationWarehouse) {
        return extractProductsFromWarehouse(destinationWarehouse);
    }
    return productsData.map((p) => ({
        id: p.id,
        name: p.name,
        shared: p.shared,
    }));
};

const getEmployeeAvailableProducts = (
    originWarehouse: Warehouse | null,
    destinationWarehouse: Warehouse | null,
    isOriginVehicle: boolean,
    isDestinationVehicle: boolean,
    isDestinationVending: boolean,
    userWarehouses: Warehouse[],
    warehousesData: Warehouse[],
): ProductInfo[] => {
    if (isDestinationVending && destinationWarehouse) {
        return extractProductsFromWarehouse(destinationWarehouse);
    }

    const isWarehouseToVehicle =
        originWarehouse?.kind === WAREHOUSE_TYPE.WAREHOUSE && isDestinationVehicle;

    if (isWarehouseToVehicle) {
        return getProductsFromUserWarehouses(userWarehouses, warehousesData);
    }

    if (isOriginVehicle && destinationWarehouse) {
        return extractProductsFromWarehouse(destinationWarehouse);
    }

    return getProductsFromUserWarehouses(userWarehouses, warehousesData);
};

const getAdminOriginWarehouses = (warehousesData: Warehouse[]): Warehouse[] => {
    return warehousesData.filter((warehouse) => warehouse.kind !== WAREHOUSE_TYPE.VENDING);
};

const getEmployeeOriginWarehouses = (warehousesData: Warehouse[]): Warehouse[] => {
    const bodegas = warehousesData.filter(
        (warehouse) => warehouse.kind === WAREHOUSE_TYPE.WAREHOUSE,
    );
    const transport = warehousesData.filter(
        (warehouse) => warehouse.kind === WAREHOUSE_TYPE.TRANSPORT,
    );
    return [...bodegas, ...transport];
};

const getAdminDestinationWarehouses = (warehousesData: Warehouse[]): Warehouse[] => {
    return warehousesData;
};

const getEmployeeDestinationWarehouses = (
    warehousesData: Warehouse[],
    userWarehouses: Warehouse[],
): Warehouse[] => {
    const warehouseIds = userWarehouses.map((w) => String(w.id));
    const userWarehousesList = warehousesData.filter((warehouse) =>
        warehouseIds.includes(String(warehouse.id)),
    );
    const allTransport = warehousesData.filter(
        (warehouse) => warehouse.kind === WAREHOUSE_TYPE.TRANSPORT,
    );
    return [...allTransport, ...userWarehousesList];
};

const getAdminRequiredProducts = (
    destinationWarehouse: Warehouse | null,
    isDestinationVending: boolean,
): { id: number; name: string }[] => {
    if (!isDestinationVending || !destinationWarehouse) {
        return [];
    }
    return destinationWarehouse.warehouseProduct.map((wp) => {
        const product = getProductFromWarehouseProduct(wp);
        return { id: product.id, name: product.name };
    });
};

const getEmployeeRequiredProducts = (
    originWarehouse: Warehouse | null,
    destinationWarehouse: Warehouse | null,
    isOriginVehicle: boolean,
    isDestinationVehicle: boolean,
    userWarehouses: Warehouse[],
    warehousesData: Warehouse[],
): { id: number; name: string }[] => {
    const isWarehouseToVehicle =
        originWarehouse?.kind === WAREHOUSE_TYPE.WAREHOUSE && isDestinationVehicle;

    if (isWarehouseToVehicle) {
        const allRequiredProducts = new Map<number, string>();
        userWarehouses.forEach((userWarehouse) => {
            const warehouseData = warehousesData.find(
                (w) => String(w.id) === String(userWarehouse.id),
            );
            if (warehouseData) {
                warehouseData.warehouseProduct.forEach((wp) => {
                    const product = getProductFromWarehouseProduct(wp);
                    if (!allRequiredProducts.has(product.id)) {
                        allRequiredProducts.set(product.id, product.name);
                    }
                });
            }
        });
        return Array.from(allRequiredProducts.entries()).map(([id, name]) => ({ id, name }));
    }

    if (isOriginVehicle && destinationWarehouse) {
        return destinationWarehouse.warehouseProduct.map((wp) => {
            const product = getProductFromWarehouseProduct(wp);
            return { id: product.id, name: product.name };
        });
    }

    return [];
};

export const useStockMovement = () => {
    const dispatch = useAppDispatch();
    const { status: warehousesStatus, data: warehousesData } = useAppSelector(warehouseState);
    const { status: productsStatus, data: productsData } = useAppSelector(productState);
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

    const [initTime] = useState<string>(new Date().toISOString());
    const [pendingFailedProducts, setPendingFailedProducts] = useState<{
        products: { id: number; name: string }[];
        comment: string;
    } | null>(null);

    const isAdmin = user?.type === 'admin';
    const isEmployee = user?.type === 'employee';
    const userWarehouses = useMemo(() => user?.warehouse || [], [user?.warehouse]);

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

    const originWarehouse = useMemo(() => {
        if (!selectedOriginWarehouse) return null;
        return warehousesData.find((w) => +w.id === selectedOriginWarehouse);
    }, [selectedOriginWarehouse, warehousesData]);

    const destinationWarehouse = useMemo(() => {
        if (!selectedDestinationWarehouse) return null;
        return warehousesData.find((w) => +w.id === selectedDestinationWarehouse);
    }, [selectedDestinationWarehouse, warehousesData]);

    const isDestinationVending = destinationWarehouse?.kind === WAREHOUSE_TYPE.VENDING;
    const isOriginVehicle = originWarehouse?.kind === WAREHOUSE_TYPE.TRANSPORT;
    const isDestinationVehicle = destinationWarehouse?.kind === WAREHOUSE_TYPE.TRANSPORT;

    const availableProducts = useMemo(() => {
        if (isAdmin) {
            return getAdminAvailableProducts(
                destinationWarehouse ?? null,
                isDestinationVending,
                productsData,
            );
        }

        if (isEmployee) {
            return getEmployeeAvailableProducts(
                originWarehouse ?? null,
                destinationWarehouse ?? null,
                isOriginVehicle,
                isDestinationVehicle,
                isDestinationVending,
                userWarehouses,
                warehousesData,
            );
        }

        return productsData.map((p) => ({
            id: p.id,
            name: p.name,
            shared: p.shared,
        }));
    }, [
        isAdmin,
        isEmployee,
        destinationWarehouse,
        isDestinationVending,
        productsData,
        originWarehouse,
        isOriginVehicle,
        isDestinationVehicle,
        userWarehouses,
        warehousesData,
    ]);

    const productsOptions = useMemo(() => {
        return availableProducts.map((p) => ({
            id: p.id,
            name: p.name,
        }));
    }, [availableProducts]);

    const filteredOriginWarehouses = useMemo(() => {
        const availableWarehouses = isAdmin
            ? getAdminOriginWarehouses(warehousesData)
            : getEmployeeOriginWarehouses(warehousesData);

        return availableWarehouses
            .filter((warehouse) =>
                warehouse.name.toLowerCase().includes(originWarehouseInput.toLowerCase()),
            )
            .map((warehouse) => ({
                id: +warehouse.id,
                name: warehouse.name,
            }));
    }, [warehousesData, originWarehouseInput, isAdmin]);

    const filteredDestinationWarehouses = useMemo(() => {
        const availableWarehouses = isAdmin
            ? getAdminDestinationWarehouses(warehousesData)
            : getEmployeeDestinationWarehouses(warehousesData, userWarehouses);

        return availableWarehouses
            .filter((warehouse) =>
                warehouse.name.toLowerCase().includes(destinationWarehouseInput.toLowerCase()),
            )
            .map((warehouse) => ({
                id: +warehouse.id,
                name: warehouse.name,
            }));
    }, [warehousesData, destinationWarehouseInput, isAdmin, userWarehouses]);

    const filteredProducts = productsOptions.filter((product) =>
        product.name.toLowerCase().includes(productSearchInput.toLowerCase()),
    );

    const findProductByBarcode = (barcode: string): ProductOptions | null => {
        const product = availableProducts.find((p) => p.shared === barcode);
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
        if (selectedProducts.length > 0) {
            setSelectedProducts([]);
        }
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
        setPendingFailedProducts(null);
    };

    const validateRequiredProducts = (): { id: number; name: string }[] => {
        if (isAdmin) {
            return getAdminRequiredProducts(destinationWarehouse ?? null, isDestinationVending);
        }

        if (isEmployee) {
            return getEmployeeRequiredProducts(
                originWarehouse ?? null,
                destinationWarehouse ?? null,
                isOriginVehicle,
                isDestinationVehicle,
                userWarehouses,
                warehousesData,
            );
        }

        return [];
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

        if (pendingFailedProducts && comment.trim() !== '') {
            confirmStockMovement(pendingFailedProducts.products, comment.trim());
            setPendingFailedProducts(null);
            return;
        }

        const requiredProductsInfo = validateRequiredProducts();

        if (requiredProductsInfo.length > 0) {
            const selectedProductIds = selectedProducts.map((p) => p.id);
            const missingProducts = requiredProductsInfo.filter(
                (product) => !selectedProductIds.includes(product.id),
            );

            if (missingProducts.length > 0) {
                const missingProductNames = missingProducts.map((p) => p.name).join('\n');

                Alert.alert(
                    'Productos faltantes',
                    `Debes agregar al menos 1 cantidad de cada producto requerido.\n\nProductos faltantes:\n${missingProductNames}`,
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Continuar de todas formas',
                            onPress: () => {
                                setPendingFailedProducts({
                                    products: missingProducts,
                                    comment: '',
                                });
                                Alert.alert(
                                    'Comentario requerido',
                                    'Por favor, agrega un comentario en el campo "Comentario" explicando por qué continúas sin todos los productos requeridos, luego presiona "Confirmar" nuevamente.',
                                    [
                                        {
                                            text: 'Entendido',
                                            onPress: () => {},
                                        },
                                    ],
                                );
                            },
                        },
                    ],
                );
                return;
            }
        }

        confirmStockMovement([], '');
    };

    const confirmStockMovement = (
        missingProducts: { id: number; name: string }[],
        failedComment: string,
    ) => {
        if (missingProducts.length > 0 && !failedComment) {
            Alert.alert(
                'Comentario requerido',
                'Debes agregar un comentario explicando por qué continúas sin todos los productos requeridos.',
            );
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
                        if (!selectedOriginWarehouse || !selectedDestinationWarehouse) {
                            return;
                        }

                        const finishTime = new Date().toISOString();

                        const stockMovementData: StockMovementPayload = {
                            originWarehouseId: selectedOriginWarehouse,
                            destinationWarehouseId: selectedDestinationWarehouse,
                            date: selectedDate.toISOString(),
                            comment: comment || '',
                            products: selectedProducts.map((p) => ({
                                id: +p.id,
                                quantity: p.quantity,
                            })),
                            author: user?.name || '',
                            initTime: initTime,
                            finishTime: finishTime,
                            productsFailed:
                                missingProducts.length > 0 && failedComment
                                    ? missingProducts.map((p) => ({
                                          id: p.id,
                                          quantity: 1,
                                          comment: failedComment,
                                      }))
                                    : [],
                        };

                        const result = await dispatch(createStockMovementThunk(stockMovementData));
                        if (result.meta.requestStatus === 'fulfilled') {
                            notify.success('Movimiento de stock realizado correctamente');
                            clearAll();
                            router.push('/(tabs)/home');
                        } else {
                            const error: any = result;
                            notify.error(
                                error.error.message || 'Error al realizar el movimiento de stock',
                            );
                        }
                    },
                },
            ],
        );
    };

    return {
        isLoading,
        isProductsLoading,
        isStockMovementLoading,
        selectedOriginWarehouse,
        originWarehouseInput,
        setOriginWarehouseInput,
        showOriginWarehouseDropdown,
        setShowOriginWarehouseDropdown,
        filteredOriginWarehouses,
        handleOriginWarehouseSelect,
        clearOriginWarehouse,
        selectedDestinationWarehouse,
        destinationWarehouseInput,
        setDestinationWarehouseInput,
        showDestinationWarehouseDropdown,
        setShowDestinationWarehouseDropdown,
        filteredDestinationWarehouses,
        handleDestinationWarehouseSelect,
        clearDestinationWarehouse,
        selectedDate,
        setSelectedDate,
        comment,
        setComment,
        selectedProducts,
        filteredProducts,
        productSearchInput,
        setProductSearchInput,
        showProductDropdown,
        setShowProductDropdown,
        showProductModal,
        setShowProductModal,
        showScanner,
        setShowScanner,
        showProductConfirmModal,
        pendingProduct,
        pendingQuantity,
        setPendingQuantity,
        openProductConfirmModal,
        confirmAddProduct,
        cancelProductConfirm,
        handleBarcodeScanned,
        updateProductQuantity,
        removeProduct,
        handleConfirm,
    };
};
