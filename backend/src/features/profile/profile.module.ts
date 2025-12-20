import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { GetAllCurrenciesUseCase } from './application/get-all-currencies.use-case';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [ProfileController],
    providers: [
        GetAllCurrenciesUseCase
    ],
})
export class ProfileModule { }
