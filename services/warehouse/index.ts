import { clientBackend } from '../../config';

export const getWarehouses = async (): Promise<ApiResponse<Warehouse[]>> => {
    return await clientBackend.get('warehouse');
};
