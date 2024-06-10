import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = () => {
    return axiosInstance.get('/products');
};

export const createProduct = (product: any) => {
    return axiosInstance.post('/products', product);
};

export const getCategories = () => {
    return axiosInstance.get('/products/categories');
};

export const getProductsByCategory = (category: string) => {
    return axiosInstance.get(`/products/category/${category}`);
};
