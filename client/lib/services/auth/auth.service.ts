import { ApiService } from "../api/api.service";
import { AuthOptions, SignInResponse, LogoutResponse, SignUpResponse } from "./auth.types";
import { session } from "../session/session.service";

class AuthApi implements AuthOptions {
    private api: ApiService
    constructor() {
        this.api = new ApiService(() => session.getToken());
    }

    async signIn(email: string, password: string): Promise<SignInResponse> {
        const response = await this.api.post<SignInResponse>('/auth/login', { email, password });
        return response;
    }

    async signUp(name: string, lastname: string, email: string, password: string): Promise<SignUpResponse> {
        const response = await this.api.post<SignUpResponse>('/auth/register', { name, lastname, email, password });
        return response;
    }

    async logout(): Promise<LogoutResponse> {
        const response = await this.api.post<LogoutResponse>('/auth/logout');
        return response;
    }
}

export const authApi = new AuthApi();
