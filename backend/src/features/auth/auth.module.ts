
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './application/login-user.use-case';
import { RegisterUseCase } from './application/register-user.use-case';

import { SupabaseAuthGuard } from './guards/supabase-auth.guard';

@Module({
    controllers: [AuthController],
    providers: [
        LoginUseCase,
        RegisterUseCase,
        SupabaseAuthGuard
    ],
    exports: [
        LoginUseCase,
        RegisterUseCase,
        SupabaseAuthGuard
    ]
})
export class AuthModule { }
