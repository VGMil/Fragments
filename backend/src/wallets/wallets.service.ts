import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
    constructor(private readonly prisma: PrismaService) { }

    create(createWalletDto: CreateWalletDto, userId: string) {
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

    // update(id: string, updateWalletDto: UpdateWalletDto) {
    //   return `This action updates a #${id} wallet`;
    // }

    // remove(id: string) {
    //   return `This action removes a #${id} wallet`;
    // }
}
