import { Module, Global } from '@nestjs/common';
import { UserRepository } from './user/user.repository';
import { CurrencyRepository } from './currency/currency.repository';
import { UsersService } from './user/user.service';
import { CurrenciesService } from './currency/currency.service';
import { WalletRepository } from './wallet/wallet.repository';
import { WalletService } from './wallet/wallet.service';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: UserRepository,
            useClass: UsersService
        },
        {
            provide: CurrencyRepository,
            useClass: CurrenciesService
        },
        {
            provide: WalletRepository,
            useClass: WalletService
        }
    ],
    exports: [
        UserRepository,
        CurrencyRepository,
        WalletRepository
    ],
})
export class CoreModule { }
