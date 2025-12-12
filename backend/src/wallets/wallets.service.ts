import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
    constructor(private readonly prisma: PrismaService) { }

    create(userId: string, createWalletDto: CreateWalletDto) {
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

    findOne(id: string) {
        return this.prisma.wallet.findUnique({
            where: { id },
            include: { currency: true },
        });
    }

    update(userId: string, id: string, updateWalletDto: UpdateWalletDto) {
        return this.prisma.wallet.update({
            where: { id, userId },
            data: updateWalletDto,
        });
    }

    remove(userId: string, id: string) {
        return this.prisma.wallet.delete({
            where: { id, userId },
        });
    }
}
