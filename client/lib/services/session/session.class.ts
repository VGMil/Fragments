import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

class Session {
    private token: string;
    private user: any;

    constructor() {
        this.token = '';
        this.user = null;
    }

    async setToken(token: string): Promise<void> {
        this.token = token;
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem('token', token);
        } else {
            await SecureStore.setItemAsync('token', token);
        }
    }

    async setUser(user: any): Promise<void> {
        this.user = user;
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
            await SecureStore.setItemAsync('user', JSON.stringify(user));
        }
    }

    async getToken(): Promise<string | null> {
        if (Platform.OS === 'web') {
            return await AsyncStorage.getItem('token');
        } else {
            return await SecureStore.getItemAsync('token');
        }
    }

    async getUser(): Promise<string | null> {
        if (Platform.OS === 'web') {
            return await AsyncStorage.getItem('user');
        } else {
            return await SecureStore.getItemAsync('user');
        }
    }

    async clear() {
        this.token = '';
        this.user = null;
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
        } else {
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('user');
        }
    }
}

export const session = new Session();

