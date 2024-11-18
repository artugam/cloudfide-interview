import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './modules/binance/binance.service';

@Controller()
export class AppController {
  constructor(protected readonly binanceService: BinanceService) {}

  @Get()
  async analyzePrice(): Promise<any> {
    return this.binanceService.fetchKlines({
      symbol: 'BTCUSDT',
      startTime: 1730419200000,
      endTime: 1731801600000,
      interval: '1h',
    });
  }
}
