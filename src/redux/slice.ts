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
            localStorage.clear();
            window.location.replace("/")
        },
        login: (state, { payload }) => {
            state.token = payload.token;
            localStorage.setItem('token', payload.token);
        },
        addQty: (state, { payload }) => {
            const getIndex = state.cart.findIndex((element) => element.id === payload.id);
            if (getIndex === -1) {
                state.cart = [...state?.cart, { ...payload, qty: 1 }];
            } else {
                state.cart[getIndex].qty += 1;
            }
        },
        minusQty: (state, { payload }) => {
            const getIndex = state.cart.findIndex((element) => element.id === payload.id);
            if (state.cart[getIndex]?.qty === 1) {
                state.cart = state.cart.filter((element) => element.id !== payload.id)
            } else {
                state.cart[getIndex].qty -= 1;
            }
        },
        removeProduct: (state, { payload }) => {
            state.cart = state.cart.filter((element) => element?.id !== payload.id)
        }
    },
});

export const { logout, login, addQty, minusQty, removeProduct } = UserSliceData.actions;

export default UserSliceData.reducer;
