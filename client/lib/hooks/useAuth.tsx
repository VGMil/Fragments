import { useState } from 'react';
import { authApi } from '../services/auth/auth.service';
import { useSession } from './useSession';

interface AuthHook {
    loading: boolean;
    signIn: (email: string, password: string) => Promise<string>;
    signUp: (name: string, lastname: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuth = (): AuthHook => {
    const { saveSession, removeSession } = useSession();
    const [loading, setIsLoading] = useState(false);

    const signIn = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const data = await authApi.signIn(email, password);
            if (data?.accessToken) {
                return data.accessToken;
            }
            throw new Error('No se recibió un token de sesión');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Error al iniciar sesión';
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (name: string, lastname: string, email: string, password: string) => {
        try {
            setIsLoading(true);
            await authApi.signUp(name, lastname, email, password);

        } catch (error: any) {
            const message = error.response?.data?.message || 'Error al registrarse';
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await authApi.logout();
        } catch (error: any) {
            const message = error.response?.data?.message || 'Error al cerrar sesión';
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signIn,
        signUp,
        logout,
        loading,
    };
};
