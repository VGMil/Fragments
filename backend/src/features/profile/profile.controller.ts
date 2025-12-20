import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { GetAllCurrenciesUseCase } from './application/get-all-currencies.use-case';
import { UpdateProfileUseCase } from './application/update-profile.use-case';
import { GetMyProfileUseCase } from './application/get-my-profile.use-case';
import { UpdateUserDto } from 'src/core/user/update-user.dto';
import { Request } from 'express';

@Controller('profile')
@UseGuards(SupabaseAuthGuard)
export class ProfileController {

    constructor(
        private readonly getAllCurrenciesUseCase: GetAllCurrenciesUseCase,
        private readonly updateProfileUseCase: UpdateProfileUseCase,
        private readonly getMyProfileUseCase: GetMyProfileUseCase
    ) { }

    @Get('currencies')
    async getCurrencies(@Req() req: Request) {
        const userId = (req as any).user.sub;
        return this.getAllCurrenciesUseCase.execute(userId);
    }

    @Get('me')
    async getProfile(@Req() req: Request) {
        const userId = (req as any).user.sub;
        return this.getMyProfileUseCase.execute(userId);
    }

    @Patch('me')
    async updateProfile(@Req() req: Request, @Body() body: UpdateUserDto) {
        const userId = (req as any).user.sub;
        return this.updateProfileUseCase.execute(userId, body);
    }
}
