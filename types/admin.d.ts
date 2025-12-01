interface Admin {
    id: number;
    rut: string;
    name: string;
    email: string;
    contactPhone: string;
    password: string;
    isBlocked?: boolean;
    createdAt?: Date;
}
