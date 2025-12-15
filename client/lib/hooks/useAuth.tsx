import { useState } from 'react';
import { Alert } from 'react-native';
import { authApi } from '../services/api/endpoints/auth.service';
import { session } from '../services/session/session.class';

interface AuthHook {
    loading: boolean;
    signIn: (email: string, password: string, payload: () => void) => Promise<void>;
    signUp: (name: string, lastname: string, email: string, password: string, payload: () => void) => Promise<void>;
    logout: (payload: () => void) => Promise<void>;
}


export const useAuth = (): AuthHook => {
    const [loading, setLoading] = useState(false);
    const signIn = async (email: string, password: string, payload: any) => {
        try {
            setLoading(true);
            const data = await authApi.signIn(email, password);
            if (data) {
                session.setToken(data);
                payload();
            }
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al iniciar sesión';
            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (name: string, lastname: string, email: string, password: string, payload: any) => {
        try {
            setLoading(true);
            await authApi.signUp(name, lastname, email, password);
            payload();
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al registrarse';
            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async (payload: any) => {
        session.clear();
        authApi.clearToken();
        payload();
    };

    return {
        signIn,
        signUp,
        logout,
        loading,
    };
};
