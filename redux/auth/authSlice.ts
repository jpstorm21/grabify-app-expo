import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import { RootState } from '@/redux/store';
import { checkSession, clearStorage, editAdmin, editEmployee, login, setItem } from '@/services';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: LoginFormValues, { rejectWithValue }) => {
        try {
            const response = await login({
                rut: userData.rut,
                password: userData.password,
            });

            setItem(ACCESS_TOKEN, response.data.accessToken);
            setItem(REFRESH_TOKEN, response.data.refreshToken);

            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const fecthCheckSession = createAsyncThunk(
    'auth/checkSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await checkSession();

            setItem(ACCESS_TOKEN, response.data.accessToken);
            setItem(REFRESH_TOKEN, response.data.refreshToken);

            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
        await clearStorage();
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const editUser = createAsyncThunk(
    'auth/editUser',
    async (payload: PayloadEditUser, { getState }) => {
        const state = getState() as RootState;
        if (state.auth.user?.type === 'admin') {
            return await editAdmin(payload);
        } else {
            return await editEmployee(payload);
        }
    },
);

export interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isAuthenticated: boolean;
    error: string | null;
    message: string | null;
    user: User | null;
}

const initialState: AuthState = {
    status: 'idle',
    isAuthenticated: false,
    error: null,
    message: null,
    user: null,
};

export const logout = createAction('auth/logout');
export const resetState = createAction('auth/resetState');
export const clearError = createAction('auth/clearError');
export const clearMessage = createAction('auth/clearMessage');
export const clearStatus = createAction('auth/clearStatus');

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.message = payload.message;
                state.error = null;
                state.user = {
                    email: payload.data.email,
                    rut: payload.data.rut,
                    name: payload.data.name,
                    id: payload.data.id,
                    type: payload.data.type,
                    createdAt: payload.data.createdAt,
                    contactPhone: payload.data.contactPhone,
                    vehicle: payload.data.vehicle,
                    photosPaths: payload.data.photosPaths || [],
                    warehouse: payload.data.warehouse || null,
                    level: payload.data.level || null,
                };
            })
            .addCase(loginUser.rejected, (state, { error }) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.error = error.message as string;
                state.message = null;
            });
        builder
            .addCase(fecthCheckSession.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(fecthCheckSession.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.error = null;
                state.user = {
                    email: payload.data.email,
                    rut: payload.data.rut,
                    name: payload.data.name,
                    id: payload.data.id,
                    type: payload.data.type,
                    createdAt: payload.data.createdAt,
                    contactPhone: payload.data.contactPhone,
                    vehicle: payload.data.vehicle,
                    photosPaths: payload.data.photosPaths || [],
                    warehouse: payload.data.warehouse || null,
                    level: payload.data.level || null,
                };
            })
            .addCase(fecthCheckSession.rejected, (state) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.error = 'La sesión ha expirado';
                state.message = null;
            });
        builder
            .addCase(editUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(
                editUser.fulfilled,
                (state, { payload }: { payload: ApiResponse<Admin | Employee> }) => {
                    state.status = 'succeeded';
                    if (state.user) {
                        state.user = {
                            ...state.user,
                            name: payload.data.name,
                            email: payload.data.email,
                            contactPhone: payload.data.contactPhone,
                        };
                    }
                },
            )
            .addCase(editUser.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error.message as string;
                state.message = null;
            });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.status = 'idle';
            state.user = null;
            state.error = null;
            state.message = null;
        });
        builder.addCase(resetState, (state) => {
            state.status = 'idle';
            state.error = null;
            state.message = null;
            state.user = null;
            state.isAuthenticated = false;
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

export const authState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
