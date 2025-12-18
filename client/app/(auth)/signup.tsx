import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter, Link } from 'expo-router';
// import { api } from '../../services/api'; 
import { authStyles as styles } from '../../styles/auth.styles';
import { Window } from '../../components/Window';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';
import { Switch } from '../../components/Switch';


import Logo from '../../assets/images/owner/logo.svg';
import { User, Mail, Lock } from 'lucide-react-native';
import { useAuth } from '@/lib/hooks/useAuth';
import { Screen } from '@/components/Screen';
import { CRTTransition } from '../../components/CRTTransition';

export default function SignUpScreen() {
    const router = useRouter();
    const { signUp, loading } = useAuth();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const [isExiting, setIsExiting] = useState(false);
    const nextRoute = React.useRef<any>(null);

    const handleNavigate = (route: string) => {
        nextRoute.current = route;
        setIsExiting(true);
    };

    const handleSignup = async () => {
        if (!email || !password || !name) {
            alert('Por favor completa los campos obligatorios');
            return;
        }

        try {
            await signUp(name, lastname, email, password);
            handleNavigate('/login');
        } catch (error) {
            alert('Falló el registro');
        }
    };

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
                                secureTextEntry={!showPassword}
                                icon={Lock}
                                required
                            />

                            <View style={{ marginTop: -25, marginBottom: 5 }}>
                                <Switch
                                    value={showPassword}
                                    onValueChange={setShowPassword}
                                    label="SHOW_PASSWORD?"
                                />
                            </View>

                            <Button
                                title="CREATE ACCOUNT"
                                onPress={handleSignup}
                                loading={loading}
                                style={{ marginTop: 10 }}
                            />
                        </View>

                        <View style={styles.terminalLinkContainer}>
                            <TouchableOpacity onPress={() => handleNavigate('/login')}>
                                <Text style={styles.terminalLinkText}>
                                    {'> YA_TIENES_CUENTA?'}
                                </Text>
                                <Text style={styles.terminalLinkDecoration}>
                                    {'-------------------'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Window>
                </KeyboardAwareScrollView>
            </Screen>
        </CRTTransition>
    );
}
