import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: string, createWalletDto: CreateWalletDto) {
        const existingWallet = await this.prisma.wallet.findUnique({
            where: {
                userId_currencyId: {
                    userId,
                    currencyId: createWalletDto.currencyId,
                },
            },
        });

        if (existingWallet) {
            throw new ConflictException('El usuario ya tiene una wallet para esta moneda');
        }

        return this.prisma.wallet.create({
            data: {
                userId,
                currencyId: createWalletDto.currencyId,
            },
        });
    }

    findAll() {
        return this.prisma.wallet.findMany();
    }

    findAllByUserId(userId: string) {
        return this.prisma.wallet.findMany({
            where: { userId },
            include: { currency: true },
        });
    }

    findOne(userId: string, id: string) {
        return this.prisma.wallet.findUnique({
            where: { id, userId },
            include: { currency: true },
        });
    }

    async update(userId: string, id: string, updateWalletDto: UpdateWalletDto) {
        const wallet = await this.findOne(userId, id);

        if (!wallet) {
            throw new NotFoundException('Wallet no encontrada');
        }

        const currentBalance = Number(wallet.balance);
        if (currentBalance + (updateWalletDto.balance || 0) < 0) {
            throw new BadRequestException('Saldo insuficiente');
        }

        return this.prisma.wallet.update({
            where: { id, userId },
            data: {
                balance: {
                    increment: updateWalletDto.balance || 0
                }
            },
        });
    }

    remove(userId: string, id: string) {
        return this.prisma.wallet.delete({
            where: { id, userId },
        });
    }
}
