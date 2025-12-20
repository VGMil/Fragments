
import { User } from "src/core/user/user.entity";
import { Wallet } from "src/core/wallet/wallet.entity";

export interface IRegisterUserInput {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IRegisterUserOutput {
    user: User;
    wallet: Wallet[];
}