import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './modules/binance/binance.service';

@Controller()
export class AppController {
  constructor(protected readonly binanceService: BinanceService) {}

  @Get()
  getHello(): Promise<any> {
    //TODO any
    return this.binanceService.fetchTrades();
  }
}
