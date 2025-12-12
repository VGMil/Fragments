import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
// import { api } from '../../services/api'; // Integración pendiente
import { authStyles as styles } from '../../styles/auth.styles';

export default function SignUpScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!email || !password || !name) {
            Alert.alert('Error', 'Por favor completa los campos obligatorios');
            return;
        }

        setLoading(true);
        try {
            console.log('Signup attempt:', email);
            // TODO: Conectar con backend real
            // const response = await api.post('/users/signup', { ... });

            setTimeout(() => {
                setLoading(false);
                Alert.alert('Info', 'Simulando registro exitoso. Falta conectar API.');
            }, 1000);

        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Falló el registro');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Crear Cuenta</Text>
                <Text style={styles.subtitle}>Únete a Fragments hoy</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Nombre *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tu nombre"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Apellido</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tu apellido"
                        placeholderTextColor="#999"
                        value={lastname}
                        onChangeText={setLastname}
                    />

                    <Text style={styles.label}>Correo Electrónico *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ejemplo@correo.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Contraseña *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Al menos 6 caracteres"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Registrarme</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
                        <Link href="/login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>Ingresa aquí</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
