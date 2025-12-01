interface Employee {
    id: number;
    rut: string;
    password: string;
    name: string;
    email: string;
    level: string;
    contactPhone: string;
    isBlocked?: boolean;
    createdAt?: Date;
    photosPaths?: PhotosPath[];
    vehicle?: Vehicle;
    warehouseEmployee?: { warehouse: Warehouse }[];
}
