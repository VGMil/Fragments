import { Alert } from 'react-native';
import { authApi } from '../services/auth/auth.service';
import { useSession } from './useSession';

interface AuthHook {
    loading: boolean;
    signIn: (email: string, password: string, payload: () => void) => Promise<void>;
    signUp: (name: string, lastname: string, email: string, password: string, payload: () => void) => Promise<void>;
    logout: (payload: () => void) => Promise<void>;
}

export const useAuth = (): AuthHook => {
    const { saveSession, removeSession, setIsLoading, isLoading } = useSession();

    const signIn = async (email: string, password: string, payload: any) => {
        try {
            setIsLoading(true);
            const data = await authApi.signIn(email, password);
            if (data?.session?.access_token) {
                await saveSession(data.session.access_token);
                payload();
            }
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al iniciar sesión';
            Alert.alert('Error', message);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (name: string, lastname: string, email: string, password: string, payload: any) => {
        try {
            setIsLoading(true);
            await authApi.signUp(name, lastname, email, password);
            payload();
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al registrarse';
            Alert.alert('Error', message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (payload: any) => {
        try {
            setIsLoading(true);
            await authApi.logout();
        } catch (error: any) {
            const message = error.response?.data?.message || 'Error al cerrar sesión';
            console.warn(message);
        } finally {
            await removeSession();
            payload();
            setIsLoading(false);
        }
    };

    return {
        signIn,
        signUp,
        logout,
        loading: isLoading,
    };
};
