import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { GetAllCurrenciesUseCase } from './application/get-all-currencies.use-case';
import { Request } from 'express';

@Controller('profile')
@UseGuards(SupabaseAuthGuard)
export class ProfileController {

    constructor(
        private readonly getAllCurrenciesUseCase: GetAllCurrenciesUseCase
    ) { }

    @Get('currencies')
    async getCurrencies(@Req() req: Request) {
        const userId = (req as any).user.sub;
        return this.getAllCurrenciesUseCase.execute(userId);
    }
}
