import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class ApiService {
    private api: AxiosInstance;

    constructor(private getToken?: () => Promise<string | null>) {
        if (!API_URL) {
            console.warn('⚠️ EXPO_PUBLIC_API_URL no está definido. Las peticiones pueden fallar.');
        }
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (this.getToken) {
            this.api.interceptors.request.use(async (config) => {
                const token = await this.getToken!();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            });
        }
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

