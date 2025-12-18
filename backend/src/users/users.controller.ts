
import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus, Req, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';
import { SupabaseService } from 'src/supabase/supabase.service';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private supabaseService: SupabaseService,
    ) { }

    @Post('signup')
    async signup(@Body() signUpUserDto: SignUpUserDto) {
        try {
            const { user } = await this.supabaseService.signUp(signUpUserDto);

            if (!user) {
                throw new Error('No se pudo crear el usuario en Supabase.');
            }

            const existingDbUser = await this.usersService.findOne(user.id);
            if (existingDbUser) {
                throw new ConflictException('El usuario ya existe.');
            }

            return await this.usersService.create({
                id: user.id,
                email: signUpUserDto.email,
                name: signUpUserDto.name,
                lastname: signUpUserDto.lastname,
                role: 'USER',
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Error al registrar el usuario',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post('signin')
    async signin(@Body() signInDto: SignInUserDto) {
        try {
            return await this.supabaseService.signIn(signInDto.email, signInDto.password);
        } catch (error) {
            throw new HttpException(
                error.message || 'Error al iniciar sesión',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @UseGuards(SupabaseAuthGuard)
    @Post('logout')
    async logout(@Req() req) {
        try {
            const token = req.headers.authorization.split('Bearer ')[1];
            await this.supabaseService.signOut(token);
            return { message: 'Sesión cerrada exitosamente' };
        } catch (error) {
            throw new HttpException(
                error.message || 'Error al cerrar sesión',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    @UseGuards(SupabaseAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(SupabaseAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get('me')
    findOneMe(@Req() req) {
        const userUID = req.user.id;
        return this.usersService.findOne(userUID);
    }
}
