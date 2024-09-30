import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfilState {
    profil_notifications: number;
    isLoggedIn: boolean; // Ajout de la variable isLoggedIn
}

const initialState: ProfilState = {
    profil_notifications: 78,
    isLoggedIn: false, // État initial pour isLoggedIn
};

const profilSlice = createSlice({
    name: 'profil',
    initialState,
    reducers: {
        setProfilNotifications(state, action: PayloadAction<number>) {
            state.profil_notifications = action.payload;
        },
        login(state) { // Action pour la connexion
            state.isLoggedIn = true;
        },
        logout(state) { // Action pour la déconnexion
            state.isLoggedIn = false;
        },
    },
});

export const { setProfilNotifications, login, logout } = profilSlice.actions; // Exporter les actions
export default profilSlice.reducer;
