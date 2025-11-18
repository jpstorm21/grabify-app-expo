import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface UiState {
    appName: string;
}

const initialState: UiState = {
    appName: 'GrabifyApp',
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {},
});

export const uiState = (state: RootState) => state.ui;
export const uiReducer = uiSlice.reducer;
