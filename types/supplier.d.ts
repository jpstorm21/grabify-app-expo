interface Supplier {
    id: string;
    rut: string;
    name: string;
    contactPhone: string;
    createdAt: string;
    supplierProduct: SupplierProduct[];
}

interface SupplierProduct {
    supplier: string;
    product: Product;
}

interface SupplierOptions {
    id: string;
    name: string;
}
