import { ApiService } from "../api.class";

interface AuthCases {
    signIn: SignInResponse;
    signUp: SignUpResponse;
    signOut: SignOutResponse;
}
interface SignInResponse {
    session: {
        access_token: string;
        expires_at: string;
    };
}
interface SignUpResponse {
    session: {
        access_token: string;
        expires_at: string;
    };
}
interface SignOutResponse {
    session: {
        access_token: string;
        expires_at: string;
    };
}

class AuthApi extends ApiService {
    private token: string;

    constructor() {
        super();
        this.token = '';
    }

    async signIn(email: string, password: string): Promise<string | null> {
        const response = await this.post<AuthCases['signIn']>('/users/signin', { email, password });
        this.token = response.session?.access_token;
        if (this.token && this.token.length > 0) {
            this.setToken(this.token);
        }
        return this.token;
    }

    async signUp(name: string, lastname: string, email: string, password: string): Promise<void> {
        await this.post<AuthCases['signUp']>('/users/signup', { name, lastname, email, password });
    }

    async signOut(): Promise<void> {
        await this.post<AuthCases['signOut']>('/users/signout');
    }
}

export const authApi = new AuthApi();
