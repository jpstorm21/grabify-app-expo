interface LoginFormValues {
    rut: string;
    password: string;
    userType: string;
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
    vehicles: Vehicle[];
    photosPaths: { path: string }[];
    warehouses: Warehouse[];
}

interface User {
    email: string;
    rut: string;
    name: string;
    id: number;
    type: string;
    createdAt: string;
    contactPhone: string;
    vehicles: Vehicle[];
    warehouses: Warehouse[];
    photos: string | null;
}
