import { clientBackend } from '../../config';

export const login = async (payload: LoginFormValues): Promise<ApiResponse<LoginResponse>> => {
    const requestData = {
        rut: payload.rut,
        password: payload.password,
    };

    return await clientBackend.post('/auth/login', requestData);
};

export const checkSession = async (): Promise<ApiResponse<LoginResponse>> => {
    return await clientBackend.get('auth/check-session');
};
