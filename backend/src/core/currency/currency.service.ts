
import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { CurrenciesMapper } from './currencies.mapper';
import { CurrencyRepository } from './currency.repository';
import { Currency } from './currency.entity';
import { PrismaProvider } from 'src/infrastructure/prisma/prisma.provider';

@Injectable()
export class CurrenciesService extends CurrencyRepository {
    constructor(
        private readonly prisma: PrismaProvider
    ) {
        super();
    }

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
