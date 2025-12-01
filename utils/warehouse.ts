export const WAREHOUSE_TYPE = {
    VENDING: 'vending',
    TRANSPORT: 'transporte',
    WAREHOUSE: 'bodega',
} as const;

export type WarehouseType = (typeof WAREHOUSE_TYPE)[keyof typeof WAREHOUSE_TYPE];

export const WAREHOUSE_TYPE_VALUES: WarehouseType[] = Object.values(WAREHOUSE_TYPE);
