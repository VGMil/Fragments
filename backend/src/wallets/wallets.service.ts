import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

interface WalletService {
    create(data: CreateWalletDto, tx?: Prisma.TransactionClient): Promise<any>;
    findAll(tx?: Prisma.TransactionClient): Promise<any[]>;
    findAllByUserId(userId: string, tx?: Prisma.TransactionClient): Promise<any[]>;
    findOne(userId: string, id: string, tx?: Prisma.TransactionClient): Promise<any>;
    update(userId: string, id: string, updateWalletDto: UpdateWalletDto, tx?: Prisma.TransactionClient): Promise<any>;
    remove(userId: string, id: string, tx?: Prisma.TransactionClient): Promise<any>;
}

@Injectable()
export class WalletsService implements WalletService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateWalletDto, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        const existingWallet = await client.wallet.findUnique({
            where: {
                userId_currencyId: {
                    userId: data.userId,
                    currencyId: data.currencyId,
                },
            },
        });

        if (existingWallet) {
            throw new ConflictException('El usuario ya tiene una wallet para esta moneda');
        }

        return client.wallet.create({
            data: {
                userId: data.userId,
                currencyId: data.currencyId,
                balance: 0,
            },
        });
    }

    findAll(tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.wallet.findMany();
    }

    findAllByUserId(userId: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.wallet.findMany({
            where: { userId },
            include: { currency: true },
        });
    }

    findOne(userId: string, id: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.wallet.findUnique({
            where: { id, userId },
            include: { currency: true },
        });
    }

    async update(userId: string, id: string, updateWalletDto: UpdateWalletDto, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        const wallet = await this.findOne(userId, id);

        if (!wallet) {
            throw new NotFoundException('Wallet no encontrada');
        }

        const currentBalance = Number(wallet.balance);
        if (currentBalance + (updateWalletDto.balance || 0) < 0) {
            throw new BadRequestException('Saldo insuficiente');
        }

        return client.wallet.update({
            where: { id, userId },
            data: {
                balance: {
                    increment: updateWalletDto.balance || 0
                }
            },
        });
    }

    remove(userId: string, id: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.wallet.delete({
            where: { id, userId },
        });
    }
}
