import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter, Link } from 'expo-router';

import { authStyles as styles } from '../../styles/auth.styles';
import { Window } from '../../components/Window';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';

import { Mail, Lock, Gem } from 'lucide-react-native';
import { useAuth } from '@/lib/hooks/useAuth';

import { Screen } from '../../components/Screen';
import { CRTTransition } from '../../components/CRTTransition';
import { LoginLoader } from '../../components/auth/LoginLoader';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loading } = useAuth();
    const [isExiting, setIsExiting] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const nextRoute = React.useRef<any>(null);

    const handleNavigate = (route: string) => {
        nextRoute.current = route;
        setIsExiting(true);
    };

    const handleLogin = async () => {
        setIsLoggingIn(true);
    };
    if (isLoggingIn) {
        return <LoginLoader visible={isLoggingIn} email={email} password={password} onComplete={() => setIsLoggingIn(false)} />;
    }
    return (
        <CRTTransition
            isExiting={isExiting}
            onExitComplete={() => {
                if (nextRoute.current) {
                    router.replace(nextRoute.current);
                }
            }}
        >
            <Screen>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.contentContainer}
                    bottomOffset={120}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Window title="// USER_AUTH v1.0" hasExitButton={true} onExit={() => router.back()}>

                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Gem size={64} color="#00FFFF" style={{ marginBottom: 10 }} />
                            <Text style={styles.loginSubtitle}>
                                {'FRAGMENTS SYSTEM'}
                            </Text>
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
                                title="LOGIN"
                                onPress={handleLogin}
                                loading={loading}
                                style={{ marginTop: 10, marginHorizontal: 25 }}
                            />
                        </View>

                        <View style={{ marginVertical: 15, gap: 5 }}>
                            <View style={[styles.terminalLinkContainer, { marginTop: 0, marginBottom: 10 }]}>
                                <TouchableOpacity onPress={() => handleNavigate('/not-found')}>
                                    <Text style={styles.terminalLinkText}>{'> OLVIDASTE_TU_PASSWORD?'}</Text>
                                    <Text style={styles.terminalLinkDecoration}>{'---------------------'}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handleNavigate('/signup')}>
                                <Text style={styles.link}>{'> REGISTRAR NUEVO AGENTE?'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Window>
                </KeyboardAwareScrollView>
            </Screen>
        </CRTTransition>
    );
}