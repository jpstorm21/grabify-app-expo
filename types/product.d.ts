interface Product {
    id: number;
    shared: string;
    name: string;
    description: string;
    brand: string;
    net: string;
    sale: string;
    stockUnit: string;
    stockMin: string;
    stockMax: string;
    profitMin: string;
    profitMax: string;
    widthSize: number;
    depthSize: number;
    photosPaths: PhotosPath[];
    visible: boolean;
    category: Category;
    createdAt: string;
    updatedAt: string;
}

interface PhotosPath {
    path: string;
}

interface ProductOptions {
    id: number;
    name: string;
}
