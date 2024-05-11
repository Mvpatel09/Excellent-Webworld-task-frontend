import React from 'react';
import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import('../components/auth/Login'))
const Register = lazy(() => import('../components/auth/Register'))
const Products = lazy(() => import('../components/products/Products'))
const Cart = lazy(() => import('../components/cart/Cart'))

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Login />} />
                <Route path="/register" index element={<Register />} />
                <Route path="/products" index element={<Products />} />
                <Route path="/cart" index element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterComponent;