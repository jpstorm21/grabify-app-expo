interface PurchasePayload {
    products: { productId: number; quantity: number; netPrice: number }[];
    warehouseId: number;
    author: string;
    date: string;
}
