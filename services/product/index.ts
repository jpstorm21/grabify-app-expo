import { clientBackend } from '../../config';

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
    return await clientBackend.get('product');
};

export const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
    return await clientBackend.get(`product/${id}`);
};
