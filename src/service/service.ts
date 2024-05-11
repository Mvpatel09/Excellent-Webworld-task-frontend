import axios, { AxiosError, AxiosResponse } from 'axios';

const API = 'http://localhost:3000/api/';

const DataService = axios.create({
    baseURL: API,
});

DataService.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);
DataService.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/';
        }
        return Promise.reject(error);
    },
);

export { DataService };