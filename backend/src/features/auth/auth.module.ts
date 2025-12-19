
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './application/login-user.use-case';
import { RegisterUseCase } from './application/register-user.use-case';

@Module({
    controllers: [AuthController],
    providers: [
        LoginUseCase,
        RegisterUseCase
    ],
    exports: [
        LoginUseCase,
        RegisterUseCase
    ]
})
export class AuthModule { }
