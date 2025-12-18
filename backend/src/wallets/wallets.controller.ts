import { Controller, Get, Body, Param, Request, UseGuards, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
@UseGuards(SupabaseAuthGuard)
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @Get()
    findAll() {
        return this.walletsService.findAll();
    }

    @Get('my-wallets')
    findMyWallets(@Request() req) {
        return this.walletsService.findAllByUserId(req.user.sub);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
        return this.walletsService.findOne(req.user.sub, id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Request() req, @Body() updateWalletDto: UpdateWalletDto) {
        return this.walletsService.update(req.user.sub, id, updateWalletDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
        return this.walletsService.remove(req.user.sub, id);
    }
}

