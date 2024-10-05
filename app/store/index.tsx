// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import profilReducer from './profilSlice';
import messagesReducer from './messagesSlice'

export const store = configureStore({
    reducer: {
        profil: profilReducer,
        messages : messagesReducer,
    },
});

// Déclaration du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;