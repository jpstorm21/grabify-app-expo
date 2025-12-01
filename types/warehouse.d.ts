interface Warehouse {
    id: string;
    name: string;
    kind: WarehouseType;
    description: string;
    createdAt: string;
    warehouseProduct: WarehouseProduct[];
}

interface WarehouseOptions {
    id: number;
    name: string;
}
