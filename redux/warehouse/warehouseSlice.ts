import { createAction, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getWarehouses } from '../../services';
import type { RootState } from '../store';

export const fecthWarehousesThunk = createAsyncThunk('warehouse/getWarehouses', async () => {
    return await getWarehouses();
});

export interface WarehouseState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    data: Warehouse[];
    error: Error | null;
    message: string | null;
    options: WarehouseOptions[];
}

const initialState: WarehouseState = {
    status: 'idle',
    data: [],
    error: null,
    message: null,
    options: [],
};

export const resetState = createAction('warehouse/resetState');
export const clearError = createAction('warehouse/clearError');
export const clearMessage = createAction('warehouse/clearMessage');
export const clearStatus = createAction('warehouse/clearStatus');

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fecthWarehousesThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(
                fecthWarehousesThunk.fulfilled,
                (state, action: PayloadAction<ApiResponse<Warehouse[]>>) => {
                    const { payload } = action;
                    state.status = 'succeeded';
                    state.message = payload.message;
                    state.data = payload.data;
                    state.options = payload.data.map((warehouse: Warehouse) => ({
                        id: +warehouse.id,
                        name: warehouse.name,
                    }));
                },
            )
            .addCase(fecthWarehousesThunk.rejected, (state, { error }) => {
                state.error = error as Error;
                state.status = 'failed';
            });
        builder.addCase(resetState, (state) => {
            state.status = 'idle';
            state.data = [];
            state.error = null;
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

export const warehouseState = (state: RootState) => state.warehouse;
export const warehouseReducer = warehouseSlice.reducer;
