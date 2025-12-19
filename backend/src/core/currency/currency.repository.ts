import { Currency } from "./currency.entity";
import { Prisma } from "src/generated/prisma/client";

export interface ICurrencyRepository {
    findAll(tx?: Prisma.TransactionClient): Promise<Currency[]>;
    findOne(id: number, tx?: Prisma.TransactionClient): Promise<Currency | null>;
    findByCode(code: string, tx?: Prisma.TransactionClient): Promise<Currency | null>;
}
