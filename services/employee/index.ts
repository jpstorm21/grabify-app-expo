import { clientBackend } from '../../config';

export const editEmployee = async (payload: PayloadEditUser): Promise<ApiResponse<Employee>> => {
    const { id, rut, name, email, level, contactPhone } = payload;

    return await clientBackend.patch(`employee/${id}`, {
        rut,
        name,
        email,
        level,
        contactPhone,
    });
};
