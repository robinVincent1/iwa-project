// src/store/navBarSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface NavBarState {
    visible: boolean;
}

const initialState: NavBarState = {
    visible: true,
};

const navBarSlice = createSlice({
    name: 'navBar',
    initialState,
    reducers: {
        showNavBar(state) {
            state.visible = true;
        },
        hideNavBar(state) {
            state.visible = false;
        },
    },
});

export const { showNavBar, hideNavBar } = navBarSlice.actions;
export default navBarSlice.reducer;