import { createAction, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getSuppliers } from '../../services';
import type { RootState } from '../store';

export const fecthSuppliers = createAsyncThunk('supplier/getSuppliers', async () => {
    return await getSuppliers();
});

export interface SupplierState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    data: Supplier[];
    options: SupplierOptions[];
    error: Error | null;
    message: string | null;
}

const initialState: SupplierState = {
    status: 'idle',
    data: [],
    options: [],
    error: null,
    message: null,
};

export const resetState = createAction('supplier/resetState');
export const clearError = createAction('product/clearError');
export const clearMessage = createAction('supplier/clearMessage');
export const clearStatus = createAction('supplier/clearStatus');
export const clearSupplier = createAction('supplier/clearSupplier');

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fecthSuppliers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(
                fecthSuppliers.fulfilled,
                (state, action: PayloadAction<ApiResponse<Supplier[]>>) => {
                    const { payload } = action;
                    state.status = 'succeeded';
                    state.message = payload.message;
                    state.data = payload.data;
                    state.options = payload.data.map((supplier) => ({
                        id: supplier.id,
                        name: supplier.name,
                    }));
                },
            )
            .addCase(fecthSuppliers.rejected, (state, { error }) => {
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
    },
});

export const supplierState = (state: RootState) => state.supplier;
export const supplierReducer = supplierSlice.reducer;
