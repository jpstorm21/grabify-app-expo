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
}
