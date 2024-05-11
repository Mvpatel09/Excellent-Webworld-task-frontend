import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { validationSchemaLogin } from '../../validation/validation';
import { DataService } from '../../service/service';
import { login } from '../../redux/slice';
import { Button, Input } from '@mui/material';

const Login = () => {
    interface FormValues {
        email: string;
        password: string;
    }
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchemaLogin,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            DataService.post("login", values)
                .then(({ data }) => {
                    if (data.status === 200) {
                        dispatch(login({ token: data.data }));
                        toast.success(data.message);
                    }
                    navigate('/products');
                })
                .catch((error: any) => {
                    toast.error(error?.response?.data?.message);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <h1>Login</h1>
                <Input type="email"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email" />
                <p className="error">{formik.errors.email}</p>

                <br />
                <br />
                <Input onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password" />
                <p className="error">{formik.errors.password}</p>

                <br />
                <br />
                <Button disabled={formik.isSubmitting} type='submit'>Submit</Button>
            </form>
            <br />
            <Link to="/register">Register</Link>
        </>
    )
}

export default Login