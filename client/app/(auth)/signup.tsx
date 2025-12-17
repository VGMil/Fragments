import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter, Link } from 'expo-router';
// import { api } from '../../services/api'; 
import { authStyles as styles } from '../../styles/auth.styles';
import { Window } from '../../components/Window';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';

import Logo from '../../assets/images/owner/logo.svg';
import { User, Mail, Lock } from 'lucide-react-native';
import { useAuth } from '@/lib/hooks/useAuth';
import { Screen } from '@/components/Screen';

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
            await signUp(name, lastname, email, password, () => router.replace('/login'));
        } catch (error) {
            alert('Falló el registro');
        }
    };

    return (
        <Screen>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.contentContainer}
                bottomOffset={120}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}

            >
                <Window title="NEW AGENT" hasExitButton={true} onExit={() => router.back()}>

                    <View style={{ gap: 15 }}>
                        <Field
                            label="NAME"
                            value={name}
                            onChangeText={setName}
                            placeholder="YOUR NAME"
                            icon={User}
                            required
                        />

                        <Field
                            label="LASTNAME"
                            value={lastname}
                            onChangeText={setLastname}
                            placeholder="YOUR LASTNAME"
                            icon={User}
                            required
                        />

                        <Field
                            label="EMAIL"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="user@example.com"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            icon={Mail}
                            required
                        />

                        <Field
                            label="PASSWORD"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="********"
                            secureTextEntry
                            icon={Lock}
                            required
                        />

                        <Button
                            title="CREATE ACCOUNT"
                            onPress={handleSignup}
                            loading={loading}
                            style={{ marginTop: 10 }}
                        />
                    </View>

                    <View style={styles.terminalLinkContainer}>
                        <Link href="/login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.terminalLinkText}>
                                    {'> YA_TIENES_CUENTA?'}
                                </Text>
                                <Text style={styles.terminalLinkDecoration}>
                                    {'-------------------'}
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </Window>
            </KeyboardAwareScrollView>
        </Screen>
    );
}
