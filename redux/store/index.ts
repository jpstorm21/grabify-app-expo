import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import {
    authReducer,
    productReducer,
    purchaseReducer,
    stockMovementReducer,
    uiReducer,
    warehouseReducer,
} from '..';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    product: productReducer,
    warehouse: warehouseReducer,
    purchase: purchaseReducer,
    stockMovement: stockMovementReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export const persistor = persistStore(store);
