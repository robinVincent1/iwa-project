import { legacy_createStore as createStore, applyMiddleware,Action } from 'redux';
import {thunk} from 'redux-thunk';

//Declaration of states
export interface RootState {
    profil_notifications: number;
}

//States initisalisation
const initialState = {
    profil_notifications: 78,
};

//Action on the states
function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SET_PROFIL_NOTIFICATIONS':
            return { ...state, profil_notifications: action.payload };
        default:
            return state;
    }
}

export const store = createStore(rootReducer, applyMiddleware(thunk));