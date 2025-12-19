import { Wallet } from "./wallet.entity";
import { Prisma } from "src/generated/prisma/client";

export interface IWalletRepository {
    findAll(tx?: Prisma.TransactionClient): Promise<Wallet[]>;
    findAllByUserId(userId: string, tx?: Prisma.TransactionClient): Promise<Wallet[]>;
    findOne(userId: string, walletId: string, tx?: Prisma.TransactionClient): Promise<Wallet | null>;
    create(userId: string, currencyId: number, tx?: Prisma.TransactionClient): Promise<Wallet>;
    updateBalance(walletId: string, amount: number, tx?: Prisma.TransactionClient): Promise<Wallet>;
    delete(userId: string, walletId: string, tx?: Prisma.TransactionClient): Promise<void>;
}
