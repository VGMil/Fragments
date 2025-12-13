import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const DEV_API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;


if (!API_URL) {
    console.warn('⚠️ EXPO_PUBLIC_API_URL no está definido. Las peticiones pueden fallar.');
}

export const api = axios.create({
    baseURL: Platform.OS === 'web' ? API_URL : DEV_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
