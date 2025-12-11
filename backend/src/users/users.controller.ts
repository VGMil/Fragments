
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
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
}
