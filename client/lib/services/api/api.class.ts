import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export class ApiService {
    private api: AxiosInstance = axiosInstance;

    constructor() {
        if (!API_URL) {
            console.warn('⚠️ EXPO_PUBLIC_API_URL no está definido. Las peticiones pueden fallar.');
        }
    }

    setToken(token: string) {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    getToken() {
        return this.api.defaults.headers.common['Authorization'];
    }
    clearToken() {
        delete this.api.defaults.headers.common['Authorization'];
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.get<T>(url, config);
        return response.data;
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.post<T>(url, data, config);
        return response.data;
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.put<T>(url, data, config);
        return response.data;
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.delete<T>(url, config);
        return response.data;
    }
}

