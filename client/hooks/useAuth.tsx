import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { api } from '../services/api';
import { Alert, Platform } from 'react-native';

interface AuthHook {
    loading: boolean;
    signIn: (email: string, password: string, payload: () => void) => Promise<void>;
    signUp: (name: string, lastname: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}


export const useAuth = (): AuthHook => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const saveToken = async (token: string) => {
        if (Platform.OS === 'web') {
            localStorage.setItem('token', token);
        } else {
            await SecureStore.setItemAsync('token', token);
        }
    };

    const deleteToken = async () => {
        if (Platform.OS === 'web') {
            localStorage.removeItem('token');
        } else {
            await SecureStore.deleteItemAsync('token');
        }
    };

    const signIn = async (email: string, password: string, payload: any) => {
        try {
            setLoading(true);
            const { data } = await api.post('/users/signin', { email, password });

            // Unify response check
            const token = data.session?.access_token || data.access_token;

            if (token) {
                await saveToken(token);
                // Configurar el token en los headers por defecto para futuras peticiones
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                payload();
            }
            else {
                Alert.alert('Error', 'Error al iniciar sesión: No token');
            }
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al iniciar sesión';
            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (name: string, lastname: string, email: string, password: string) => {
        try {
            setLoading(true);
            await api.post('/users/signup', {
                name,
                lastname,
                email,
                password,
            })
            router.replace('/login');
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al registrarse';
            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await deleteToken();
        router.replace('/login');
    };

    return {
        signIn,
        signUp,
        logout,
        loading,
    };
};
