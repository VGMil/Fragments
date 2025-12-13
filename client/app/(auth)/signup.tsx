import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter, Link } from 'expo-router';
// import { api } from '../../services/api'; 
import { authStyles as styles } from '../../styles/auth.styles';
import { Window } from '../../components/Window';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';

import Logo from '../../assets/images/owner/logo.svg';
import { User, Mail, Lock } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpScreen() {
    const router = useRouter();
    const { signUp, loading } = useAuth();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!email || !password || !name) {
            alert('Por favor completa los campos obligatorios');
            return;
        }

        try {
            await signUp(name, lastname, email, password);
        } catch (error) {
            alert('Falló el registro');
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
                <Window title="NEW PLAYER" hasExitButton={true} onExit={() => router.back()}>
                    <View style={styles.logo}>
                        <Logo width={80} height={80} color="#232336" />
                    </View>

                    <View style={{ gap: 15 }}>
                        <Field
                            label="NAME *"
                            value={name}
                            onChangeText={setName}
                            placeholder="YOUR NAME"
                            icon={User}
                        />

                        <Field
                            label="LASTNAME"
                            value={lastname}
                            onChangeText={setLastname}
                            placeholder="YOUR LASTNAME"
                            icon={User}
                        />

                        <Field
                            label="EMAIL *"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="user@example.com"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            icon={Mail}
                        />

                        <Field
                            label="PASSWORD *"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="********"
                            secureTextEntry
                            icon={Lock}
                        />

                        <Button
                            title="CREATE ACCOUNT"
                            onPress={handleSignup}
                            loading={loading}
                            style={{ marginTop: 10 }}
                        />
                    </View>

                    <View style={{ marginTop: 15, gap: 10 }}>
                        <Link href="/login" style={styles.link}>
                            <Text>Ya tienes una cuenta? &gt;</Text>
                        </Link>
                    </View>
                </Window>
            </KeyboardAwareScrollView>
        </View>
    );
}
