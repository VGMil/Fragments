import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "src/core/currency/currency.repository";
import { WalletRepository } from "src/core/wallet/wallet.repository";
import { IGetAllCurrencies } from "./interfaces/get-all-currencies.interface";

@Injectable()
export class GetAllCurrenciesUseCase {
    constructor(
        private readonly walletRepository: WalletRepository,
        private readonly currencyRepository: CurrencyRepository,
    ) { }

    async execute(userId: string): Promise<IGetAllCurrencies[]> {
        const wallets = await this.walletRepository.findAllByUserId(userId);
        if (!wallets) {
            throw new Error('No se encontraron wallets para el usuario');
        }

        const walletsWithCurrency = await Promise.all(
            wallets.map(async (wallet) => {
                const currency = await this.currencyRepository.findOne(wallet.currencyId);
                return {
                    id: wallet.id,
                    code: currency?.code!,
                    balance: wallet.balance,
                };
            })
        );
        return walletsWithCurrency;
    }
}