import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { WalletMapper } from './wallet.mapper';
import { IWalletRepository } from './wallet.repository';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService implements IWalletRepository {
    constructor(private prisma: PrismaService) { }

    async findAll(tx?: Prisma.TransactionClient): Promise<Wallet[]> {
        const client = tx || this.prisma;
        const wallets = await client.wallet.findMany();
        return wallets.map(wallet => WalletMapper.toDomain(wallet));
    }

    async findAllByUserId(userId: string, tx?: Prisma.TransactionClient): Promise<Wallet[]> {
        const client = tx || this.prisma;
        const wallets = await client.wallet.findMany({
            where: { userId }
        });
        return wallets.map(wallet => WalletMapper.toDomain(wallet));
    }

    async findOne(userId: string, walletId: string, tx?: Prisma.TransactionClient): Promise<Wallet | null> {
        const client = tx || this.prisma;
        const wallet = await client.wallet.findFirst({
            where: { id: walletId, userId }
        });
        return wallet ? WalletMapper.toDomain(wallet) : null;
    }

    async create(userId: string, currencyId: number, tx?: Prisma.TransactionClient): Promise<Wallet> {
        const client = tx || this.prisma;
        const wallet = await client.wallet.create({
            data: {
                userId,
                currencyId,
                balance: 0
            }
        });
        return WalletMapper.toDomain(wallet);
    }

    async updateBalance(walletId: string, amount: number, tx?: Prisma.TransactionClient): Promise<Wallet> {
        const client = tx || this.prisma;
        const wallet = await client.wallet.update({
            where: { id: walletId },
            data: { balance: amount }
        });
        return WalletMapper.toDomain(wallet);
    }

    async delete(userId: string, walletId: string, tx?: Prisma.TransactionClient): Promise<void> {
        const client = tx || this.prisma;
        const wallet = await client.wallet.findFirst({ where: { id: walletId, userId } });
        if (wallet) {
            await client.wallet.delete({ where: { id: walletId } });
        }
    }
}
