import { Currency } from "./currency.entity";
import { Prisma } from "src/generated/prisma/client";

export abstract class CurrencyRepository {
    abstract findAll(tx?: Prisma.TransactionClient): Promise<Currency[]>;
    abstract findOne(id: number, tx?: Prisma.TransactionClient): Promise<Currency | null>;
    abstract findByCode(code: string, tx?: Prisma.TransactionClient): Promise<Currency | null>;
}
