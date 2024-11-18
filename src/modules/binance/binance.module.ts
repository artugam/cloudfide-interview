import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BinanceService } from './binance.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.binance.com',
    }),
  ],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
