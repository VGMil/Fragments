import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter, Link } from 'expo-router';
// import { api } from '../../services/api'; // Integración pendiente
import { authStyles as styles } from '../../styles/auth.styles';
import { Window } from '../../components/Window';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';

import Logo from '../../assets/images/owner/logo.svg';
import { Mail, Lock } from 'lucide-react-native';

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
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 50 }}
                bottomOffset={120}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Window title="LOGIN" hasExitButton={true} onExit={() => router.back()}>
                    <View style={styles.logo}>
                        <Logo width={80} height={80} color="#232336" />
                    </View>

                    <View style={{ gap: 15 }}>
                        <Field
                            label="EMAIL"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="user@example.com"
                            autoCapitalize="none"
                            icon={Mail}
                        />

                        <Field
                            label="PASSWORD"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="********"
                            secureTextEntry
                            icon={Lock}
                        />

                        <Button
                            title="START GAME"
                            onPress={handleLogin}
                            loading={loading}
                            style={{ marginTop: 10 }}
                        />
                    </View>

                    <View style={{ marginTop: 15, gap: 10 }}>
                        <Text style={styles.text}>Olvidaste tu contraseña?</Text>
                        <Link href="/signup" style={styles.link}>
                            <Text>Registrate &gt;</Text>
                        </Link>
                    </View>
                </Window>
            </KeyboardAwareScrollView>
        </View>
    );
}