import { createAction, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createStockMovement } from '../../services';
import type { RootState } from '../store';

export const createStockMovementThunk = createAsyncThunk(
    'stockMovement/createStockMovement',
    async (payload: StockMovementPayload) => {
        return await createStockMovement(payload);
    },
);

export interface StockMovementState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error | null;
    message: string | null;
}

const initialState: StockMovementState = {
    status: 'idle',
    error: null,
    message: null,
};

export const resetState = createAction('stockMovement/resetState');
export const clearError = createAction('stockMovement/clearError');
export const clearMessage = createAction('stockMovement/clearMessage');
export const clearStatus = createAction('stockMovement/clearStatus');

export const stockMovementSlice = createSlice({
    name: 'stockMovement',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createStockMovementThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(
                createStockMovementThunk.fulfilled,
                (state, action: PayloadAction<ApiResponse<{ message: string }>>) => {
                    const { payload } = action;
                    state.status = 'succeeded';
                    state.message = payload.message;
                    state.error = null;
                },
            )
            .addCase(createStockMovementThunk.rejected, (state, { error }) => {
                state.error = error as Error;
                state.status = 'failed';
            });
        builder.addCase(resetState, (state) => {
            state.status = 'idle';
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

export const stockMovementState = (state: RootState) => state.stockMovement;
export const stockMovementReducer = stockMovementSlice.reducer;
