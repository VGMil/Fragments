import { Wallet } from "./wallet.entity";
import { Prisma } from "src/generated/prisma/client";

export abstract class WalletRepository {
    abstract findAll(tx?: Prisma.TransactionClient): Promise<Wallet[]>;
    abstract findAllByUserId(userId: string, tx?: Prisma.TransactionClient): Promise<Wallet[]>;
    abstract findOne(userId: string, walletId: string, tx?: Prisma.TransactionClient): Promise<Wallet | null>;
    abstract create(userId: string, currencyId: number, tx?: Prisma.TransactionClient): Promise<Wallet>;
    abstract updateBalance(walletId: string, amount: number, tx?: Prisma.TransactionClient): Promise<Wallet>;
    abstract delete(userId: string, walletId: string, tx?: Prisma.TransactionClient): Promise<void>;
}
