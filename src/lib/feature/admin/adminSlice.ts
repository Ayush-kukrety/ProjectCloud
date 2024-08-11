import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        logged: false,
        name: '',
        email: '',
    },
    reducers: {
        adminLogin: (state, actions) => {
            state.logged = true;
            const { details } = actions.payload
            state.name = details.name;
            state.email = details.email;
        },
        adminLogout: (state) => {
            sessionStorage.clear();
            state.logged = false;
        }
    }
})

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;