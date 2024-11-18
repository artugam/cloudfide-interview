import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BinanceModule } from './modules/binance/binance.module';

@Module({
  imports: [BinanceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
