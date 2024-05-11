import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { validationSchemaRegister } from '../../validation/validation';
import { DataService } from '../../service/service';
import { login } from '../../redux/slice';
import { Button, Input } from '@mui/material';

const Register = () => {
    interface FormValues {
        email: string;
        password: string;
        fullName: string;
    }

    const navigate = useNavigate();

    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: '',
            fullName: ''
        },
        validationSchema: validationSchemaRegister,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            DataService.post("sign-up", values)
                .then(({ data }) => {
                    toast.success(data.message);
                    navigate('/');
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

                <h1>Register</h1>
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
                    value={formik.values.fullName}
                    id="fullName"
                    name="fullName"
                    placeholder="Full name" />
                <p className="error">{formik.errors.fullName}</p>

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
            <Link to="/">Login</Link>
        </>
    )
}

export default Register