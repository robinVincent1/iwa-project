import { legacy_createStore as createStore, applyMiddleware,Action } from 'redux';
import {thunk} from 'redux-thunk';

//Declaration of states
export interface RootState {
    testState: string;
}

//States initisalisation
const initialState = {
    testState: 'test'
};

//Action on the states
function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SET_TEST_STATE':
            return { ...state, testState: action.payload };
        default:
            return state;
    }
}

export const store = createStore(rootReducer, applyMiddleware(thunk));