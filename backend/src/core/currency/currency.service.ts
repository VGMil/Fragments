
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { CurrenciesMapper } from './currencies.mapper';
import { ICurrencyRepository } from './currency.repository';
import { Currency } from './currency.entity';

@Injectable()
export class CurrenciesService implements ICurrencyRepository {
    constructor(private prisma: PrismaService) { }

    async findAll(tx?: Prisma.TransactionClient): Promise<Currency[]> {
        const client = tx || this.prisma;
        const currencies = await client.currency.findMany();
        return currencies.map(currency => CurrenciesMapper.toDomain(currency));
    }

    async findOne(id: number, tx?: Prisma.TransactionClient): Promise<Currency | null> {
        const client = tx || this.prisma;
        const currency = await client.currency.findUnique({
            where: { id },
        });
        return currency ? CurrenciesMapper.toDomain(currency) : null;
    }

    async findByCode(code: string, tx?: Prisma.TransactionClient): Promise<Currency | null> {
        const client = tx || this.prisma;
        const currency = await client.currency.findUnique({
            where: { code },
        });
        return currency ? CurrenciesMapper.toDomain(currency) : null;
    }
}
