interface ApiError {
    message: string;
    status?: number;
    errors?: Record<string, string[]>;
}

interface RequestHeaders {
    access_token?: string;
    refresh_token?: string;
    'Cache-Control'?: string;
    Pragma?: string;
    Expires?: string;
}

interface ResponseHeaders {
    access_token?: string;
    refresh_token?: string;
}

interface ApiResponse<T> {
    statusCode: boolean;
    data: T;
    message: string;
    error: string | null;
}
