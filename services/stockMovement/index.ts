import { clientBackend } from '../../config';

export const createStockMovement = async (
    payload: StockMovementPayload,
): Promise<ApiResponse<{ message: string }>> => {
    return await clientBackend.post('stock-movement', payload);
};
