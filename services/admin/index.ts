import { clientBackend } from '../../config';

export const editAdmin = async (payload: PayloadEditUser): Promise<ApiResponse<Admin>> => {
    const { id, rut, name, email, contactPhone, level } = payload;

    return await clientBackend.patch(`admin/${id}`, {
        rut,
        name,
        email,
        contactPhone,
        level,
    });
};
