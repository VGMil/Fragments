
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginUseCase } from './application/login-user.use-case';
import { RegisterUseCase } from './application/register-user.use-case';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginData: LoginUserDto) {
        return this.loginUseCase.execute(loginData);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async register(@Body() registerData: RegisterUserDto) {
        return this.registerUseCase.execute(registerData);
    }
}
