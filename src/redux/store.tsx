import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, slice)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
})
export const persistor = persistStore(store)