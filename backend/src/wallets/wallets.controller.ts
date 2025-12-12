import { Controller, Get, Post, Body, Param, Request, UseGuards, Patch, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
@UseGuards(SupabaseAuthGuard)
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @Post()
    create(@Body() createWalletDto: CreateWalletDto, @Request() req) {
        return this.walletsService.create(req.user.sub, createWalletDto);
    }

    @Get()
    findAll() {
        return this.walletsService.findAll();
    }

    @Get('my-wallets')
    findMyWallets(@Request() req) {
        return this.walletsService.findAllByUserId(req.user.sub);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.walletsService.findOne(req.user.sub, id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Request() req, @Body() updateWalletDto: UpdateWalletDto) {
        return this.walletsService.update(req.user.sub, id, updateWalletDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.walletsService.remove(req.user.sub, id);
    }
}

