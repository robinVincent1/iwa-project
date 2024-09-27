// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import profilReducer from './profilSlice';

export const store = configureStore({
    reducer: {
        profil: profilReducer,
    },
});

// Déclaration du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;