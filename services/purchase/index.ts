import { clientBackend } from '../../config';

export const createPurchase = async (
    payload: PurchasePayload,
): Promise<ApiResponse<{ message: string }>> => {
    return await clientBackend.post('purchase', payload);
};
