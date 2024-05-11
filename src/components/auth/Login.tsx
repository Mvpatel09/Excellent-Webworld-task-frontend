import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Button, Container, Input, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { validationSchemaLogin } from '../../validation/validation';
import { DataService } from '../../service/service';
import { login } from '../../redux/slice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchemaLogin,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                const { data } = await DataService.post("login", values);
                if (data.status === 200) {
                    dispatch(login({ token: data.data }));
                    toast.success(data.message);
                    navigate('/products');
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'An error occurred');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    fullWidth
                    type="email"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email"
                    error={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && <Typography variant="body2" color="error">{formik.errors.email}</Typography>}
                <br />
                <br />
                <Input
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Password"
                    error={formik.touched.password && Boolean(formik.errors.password)}
                />
                {formik.touched.password && <Typography variant="body2" color="error">{formik.errors.password}</Typography>}
                <br />
                <br />
                <Button disabled={formik.isSubmitting} type="submit" variant="contained">Submit</Button>
            </form>
            <br />
            <Typography variant="body1">Don't have an account? <Link to="/register">Register</Link></Typography>
        </Container>
    );
}

export default Login;
