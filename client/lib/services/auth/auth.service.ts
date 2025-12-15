import { ApiService } from "../api/api.service";
import { AuthOptions, SignInResponse, LogoutResponse, SignUpResponse } from "./auth.types";
import { session } from "../session/session.service";

class AuthApi implements AuthOptions {
    private api: ApiService
    constructor() {
        this.api = new ApiService(() => session.getToken());
    }

    async signIn(email: string, password: string): Promise<SignInResponse> {
        const response = await this.api.post<SignInResponse>('/users/signin', { email, password });
        return response;
    }

    async signUp(name: string, lastname: string, email: string, password: string): Promise<SignUpResponse> {
        const response = await this.api.post<SignUpResponse>('/users/signup', { name, lastname, email, password });
        return response;
    }

    async logout(): Promise<LogoutResponse> {
        const response = await this.api.post<LogoutResponse>('/users/logout');
        return response;
    }
}

export const authApi = new AuthApi();
