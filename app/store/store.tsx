import { legacy_createStore as createStore, applyMiddleware, Action } from 'redux';
import { thunk } from 'redux-thunk';

// Déclaration des états
export interface RootState {
    profil_notifications: number;
    isAuthenticated: boolean;  // Ajout de l'état d'authentification
}

// Initialisation des états
const initialState: RootState = {
    profil_notifications: 78,
    isAuthenticated: false,  // Par défaut, l'utilisateur est déconnecté
};

// Action sur les états
function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SET_PROFIL_NOTIFICATIONS':
            return { ...state, profil_notifications: action.payload };
        case 'LOGIN':  // Action pour se connecter
            return { ...state, isAuthenticated: true };
        case 'LOGOUT': // Action pour se déconnecter
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
}

export const store = createStore(rootReducer, applyMiddleware(thunk));
