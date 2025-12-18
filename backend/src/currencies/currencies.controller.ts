import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) { }

    @Get()
    findAll() {
        return this.currenciesService.findAll();
    }

    @Get('id/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.currenciesService.findOne(id);
    }

    @Get('code/:code')
    findOneByCode(@Param('code') code: string) {
        return this.currenciesService.findOneByCode(code);
    }

}

