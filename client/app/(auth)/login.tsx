import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
// import { api } from '../../services/api'; // Integración pendiente
import { authStyles as styles } from '../../styles/auth.styles';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingresa correo y contraseña');
            return;
        }

        setLoading(true);
        try {
            console.log('Login attempt:', email);
            // TODO: Conectar con backend real
            // const response = await api.post('/users/signin', { email, password });

            setTimeout(() => {
                setLoading(false);
                Alert.alert('Info', 'Simulando login exitoso. Falta conectar API.');
                // router.replace('/');
            }, 1000);

        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Falló el inicio de sesión');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fragments</Text>
            <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ejemplo@correo.com"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Ingresar</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>¿No tienes cuenta? </Text>
                    <Link href="/signup" asChild>
                        <TouchableOpacity>
                            <Text style={styles.link}>Regístrate</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}