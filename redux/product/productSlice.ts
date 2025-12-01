import { createAction, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getProductById, getProducts } from '../../services';
import type { RootState } from '../store';

export const fecthProducts = createAsyncThunk('product/getProducts', async () => {
    return await getProducts();
});

export const fecthProductById = createAsyncThunk('product/getProductById', async (id: number) => {
    return await getProductById(id);
});

export interface ProductState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    data: Product[];
    product: Product | null;
    options: ProductOptions[];
    error: Error | null;
    message: string | null;
}

const initialState: ProductState = {
    status: 'idle',
    data: [],
    options: [],
    product: null,
    error: null,
    message: null,
};

export const resetState = createAction('product/resetState');
export const clearError = createAction('product/clearError');
export const clearMessage = createAction('product/clearMessage');
export const clearStatus = createAction('product/clearStatus');
export const clearProduct = createAction('product/clearProduct');

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fecthProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(
                fecthProducts.fulfilled,
                (state, action: PayloadAction<ApiResponse<Product[]>>) => {
                    const { payload } = action;
                    state.status = 'succeeded';
                    state.message = payload.message;
                    state.data = payload.data;
                    state.options = payload.data.map((product) => ({
                        id: product.id,
                        name: product.name,
                    }));
                },
            )
            .addCase(fecthProducts.rejected, (state, { error }) => {
                state.error = error as Error;
                state.status = 'failed';
            });
        builder
            .addCase(fecthProductById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(
                fecthProductById.fulfilled,
                (state, action: PayloadAction<ApiResponse<Product>>) => {
                    const { payload } = action;
                    state.status = 'succeeded';
                    state.message = payload.message;
                    state.product = payload.data;
                },
            )
            .addCase(fecthProductById.rejected, (state, { error }) => {
                state.error = error as Error;
                state.status = 'failed';
            });
        builder.addCase(resetState, (state) => {
            state.status = 'idle';
            state.data = [];
            state.error = null;
            state.message = null;
        });
        builder.addCase(clearError, (state) => {
            state.error = null;
        });
        builder.addCase(clearMessage, (state) => {
            state.message = null;
        });
        builder.addCase(clearStatus, (state) => {
            state.status = 'idle';
        });
        builder.addCase(clearProduct, (state) => {
            state.product = null;
        });
    },
});

export const productState = (state: RootState) => state.product;
export const productReducer = productSlice.reducer;
