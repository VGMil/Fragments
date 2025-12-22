export interface AuthOptions {
    signIn: (email: string, password: string) => Promise<SignInResponse>;
    signUp: (name: string, lastname: string, email: string, password: string) => Promise<SignUpResponse>;
    logout: () => Promise<LogoutResponse>;
}
export interface Response {
    user: {
        id: string;
        email: string;
        name: string;
        lastname: string;
    },
    accessToken: string;
}

export interface SignInResponse extends Response { }
export interface SignUpResponse extends Response { }
export interface LogoutResponse extends Response { }

