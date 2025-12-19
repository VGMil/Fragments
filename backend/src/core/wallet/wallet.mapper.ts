import { Wallet as PrismaWallet } from "src/generated/prisma/client";
import { Wallet } from "./wallet.entity";

export class WalletMapper {
    static toDomain(prismaWallet: PrismaWallet): Wallet {
        return new Wallet(
            prismaWallet.id,
            prismaWallet.userId,
            prismaWallet.currencyId,
            prismaWallet.balance.toNumber()
        );
    }

    static toDomainofSupabase(wallet: any): Wallet {
        return new Wallet(
            wallet.id,
            wallet.userId,
            wallet.currencyId,
            wallet.balance
        );
    }
}
