import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (username: string, password: string) => 
    api.post('/auth/login', { username, password });

export const signup = (name: string, username: string, password: string) => 
    api.post('/auth/signup', { name, username, password });

export const getCategories = () => 
    api.get('/categories');

export const incrementLinkClick = (categoryId: string, linkId: string) => 
    api.patch(`/categories/${categoryId}/links/${linkId}/click`);

export default api; 