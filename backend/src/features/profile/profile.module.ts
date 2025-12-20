import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { GetAllCurrenciesUseCase } from './application/get-all-currencies.use-case';
import { UpdateProfileUseCase } from './application/update-profile.use-case';
import { GetMyProfileUseCase } from './application/get-my-profile.use-case';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [ProfileController],
    providers: [
        GetAllCurrenciesUseCase,
        UpdateProfileUseCase,
        GetMyProfileUseCase
    ],
})
export class ProfileModule { }
