import { clientBackend } from '../../config';

export const getSuppliers = async (): Promise<ApiResponse<Supplier[]>> => {
    return await clientBackend.get('supplier');
};
