import { createAction, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createPurchase } from '../../services';
import type { RootState } from '../store';

export const createPurchaseThunk = createAsyncThunk(
    'purchase/createPurchase',
    async (payload: PurchasePayload) => {
        return await createPurchase(payload);
    },
);

export interface PurchaseState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error | null;
    message: string | null;
}

const initialState: PurchaseState = {
    status: 'idle',
    error: null,
    message: null,
};

export const resetState = createAction('purchase/resetState');
export const clearError = createAction('purchase/clearError');
export const clearMessage = createAction('purchase/clearMessage');
export const clearStatus = createAction('purchase/clearStatus');

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPurchaseThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(
                createPurchaseThunk.fulfilled,
                (state, action: PayloadAction<ApiResponse<{ message: string }>>) => {
                    const { payload } = action;
                    state.status = 'succeeded';
                    state.message = payload.message;
                    state.error = null;
                },
            )
            .addCase(createPurchaseThunk.rejected, (state, { error }) => {
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

export const purchaseState = (state: RootState) => state.purchase;
export const purchaseReducer = purchaseSlice.reducer;
