import React from 'react';
import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import('../components/auth/Login'))
const Register = lazy(() => import('../components/auth/Register'))
const Products = lazy(() => import('../components/products/Products'))

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Login />} />
                <Route path="/register" index element={<Register />} />
                <Route path="/products" index element={<Products />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterComponent;