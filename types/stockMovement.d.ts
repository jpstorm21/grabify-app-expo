interface StockMovementPayload {
    products: { id: number; quantity: number }[];
    originWarehouseId: number;
    destinationWarehouseId: number;
    author: string;
    date: string;
    comment?: string;
    initTime: string;
    finishTime: string;
}
