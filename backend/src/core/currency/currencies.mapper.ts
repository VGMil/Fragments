
import { Currency as PrismaCurrency } from "src/generated/prisma/client";
import { Currency } from "./currency.entity";

export class CurrenciesMapper {
    static toDomain(prismaCurrency: PrismaCurrency): Currency {
        return new Currency(
            prismaCurrency.id,
            prismaCurrency.code,
            prismaCurrency.name,
            prismaCurrency.isTradable
        );
    }
}
