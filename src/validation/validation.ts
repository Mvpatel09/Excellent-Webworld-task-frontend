import * as Yup from 'yup';

interface LoginValues {
    email: string;
    password: string;
}

interface RegisterValues {
    email: string;
    password: string;
    fullName: string;
}

export const validationSchemaLogin = Yup.object<LoginValues>({
    email: Yup.string()
        .strict(true)
        .trim('This field is not accept space')
        .min(6, 'Enter valid email')
        .max(50, 'Enter valid email')
        .email('Enter valid email address')
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Enter valid email address')

        .required('Enter email'),
    password: Yup.string()
        .strict(true)
        .trim('This field is not accept space')
        .min(8, 'Password should be minimum of 4 characters long ')
        .max(32, 'Password should be maximum of 32 characters long')
        .required('Enter  password'),
});

export const validationSchemaRegister = Yup.object<RegisterValues>({
    email: Yup.string()
        .strict(true)
        .trim('This field is not accept space')
        .min(6, 'Enter valid email')
        .max(50, 'Enter valid email')
        .email('Enter valid email address')
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Enter valid email address')

        .required('Enter email'),
    password: Yup.string()
        .strict(true)
        .trim('This field is not accept space')
        .min(8, 'Password should be minimum of 8 characters long ')
        .max(32, 'Password should be maximum of 32 characters long')
        .required('Enter  password'),
    fullName: Yup.string()
        .strict(true)
        .trim('This field is not accept space')
        .min(4, 'Password should be minimum of 4 characters long ')
        .max(32, 'Password should be maximum of 32 characters long')
        .required('Enter  password'),
});