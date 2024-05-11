import { createSlice } from '@reduxjs/toolkit';

const UserSliceData = createSlice({
    name: 'user',
    initialState: {
        token: '',
        cart: []
    },
    reducers: {
        logout: (state) => {
            state.token = '';
        },
        login: (state, { payload }) => {
            state.token = payload.token;
            localStorage.setItem('token', payload.token);
        },

    },
});

export const { logout, login } = UserSliceData.actions;

export default UserSliceData.reducer;
