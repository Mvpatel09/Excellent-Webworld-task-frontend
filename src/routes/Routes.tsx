import React from 'react';
import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import('../components/auth/Login'))
const Register = lazy(() => import('../components/auth/Register'))

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Login />} />
                <Route path="/register" index element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterComponent;