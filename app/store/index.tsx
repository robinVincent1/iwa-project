// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import profilReducer from './profilSlice';
import navBarReducer from './navbarSlice';

export const store = configureStore({
    reducer: {
        profil: profilReducer,
        navBar: navBarReducer,
    },
});

// Déclaration du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;