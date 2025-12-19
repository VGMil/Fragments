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
}
