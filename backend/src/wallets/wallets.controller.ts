import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('wallets')
@UseGuards(SupabaseAuthGuard)
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @Post()
    create(@Body() createWalletDto: CreateWalletDto, @Request() req) {
        return this.walletsService.create(createWalletDto, req.user.sub);
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
    findOne(@Param('id') id: string) {
        return this.walletsService.findOne(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    //   return this.walletsService.update(id, updateWalletDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.walletsService.remove(id);
    // }
}

