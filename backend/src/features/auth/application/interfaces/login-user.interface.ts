
import { User } from "src/core/user/user.entity";

export interface ILoginUserInput {
    email: string;
    password: string;
}

export interface ILoginUserOutput {
    user: User;
    accessToken: string;
}