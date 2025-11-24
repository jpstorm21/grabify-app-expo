import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import { clearStorage, getItem, setItem } from '@/services/asyncStorage';

const LOCAL_BASE_URL =
    Platform.OS === 'android' ? 'http://192.168.1.92:4000/' : 'http://192.168.1.92:4000/';

export const clientBackend = axios.create({
    baseURL: `${LOCAL_BASE_URL}`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
    },
});

clientBackend.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const headers = config.headers as RequestHeaders;
    const accessToken = await getItem(ACCESS_TOKEN);
    const refreshToken = await getItem(REFRESH_TOKEN);

    if (accessToken) {
        headers.access_token = accessToken;
    }

    if (refreshToken) {
        headers.refresh_token = refreshToken;
    }

    return config;
});

clientBackend.interceptors.response.use(
    async (response: AxiosResponse) => {
        const headers = response.headers as ResponseHeaders;
        const accessToken = headers.access_token;
        const refreshToken = headers.refresh_token;

        if (accessToken && refreshToken) {
            await setItem(ACCESS_TOKEN, accessToken);
            await setItem(REFRESH_TOKEN, refreshToken);
        }

        return response.data;
    },
    async (error: AxiosError<ApiError>) => {
        const { response } = error;
        if (response?.status === 403) {
            await clearStorage();
        }

        return Promise.reject(response?.data);
    },
);

export default clientBackend;
