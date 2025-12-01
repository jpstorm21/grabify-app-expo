interface LoginFormValues {
    rut: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    email: string;
    rut: string;
    name: string;
    id: number;
    type: string;
    createdAt: string;
    contactPhone: string;
    vehicle: Vehicle | null;
    photosPaths: { path: string }[];
    warehouse: Warehouse[];
    level: string | null;
}

interface User {
    email: string;
    rut: string;
    name: string;
    id: number;
    type: string;
    createdAt: string;
    contactPhone: string;
    vehicle: Vehicle | null;
    photosPaths: { path: string }[];
    warehouse: Warehouse[];
    level: string | null;
}

interface PayloadEditUser {
    id: number;
    rut: string;
    name: string;
    email: string;
    contactPhone: string;
    level?: string;
}
