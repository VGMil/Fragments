
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Currency, Prisma } from 'src/generated/prisma/client';


interface CurrencyService {
    findAll(tx?: Prisma.TransactionClient): Promise<Currency[]>;
    findOne(id: number, tx?: Prisma.TransactionClient): Promise<Currency | null>;
    findOneByCode(code: string, tx?: Prisma.TransactionClient): Promise<Currency | null>;
}

@Injectable()
export class CurrenciesService implements CurrencyService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.currency.findMany();
    }
    findOne(id: number, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.currency.findUnique({
            where: { id }
        });
    }
    findOneByCode(code: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.currency.findUnique({ where: { code } });
    }
}
