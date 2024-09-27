// src/store/profilSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfilState {
    profil_notifications: number;
}

const initialState: ProfilState = {
    profil_notifications: 78,
};

const profilSlice = createSlice({
    name: 'profil',
    initialState,
    reducers: {
        setProfilNotifications(state, action: PayloadAction<number>) {
            state.profil_notifications = action.payload;
        },
    },
});

export const { setProfilNotifications } = profilSlice.actions;
export default profilSlice.reducer;