import { Injectable } from '@nestjs/common';
import { IBinanceService } from './i.binance.service';
import { MainClient } from 'binance';
import { Kline, KlinesParams } from 'binance/lib/types/shared';

@Injectable()
export class BinanceService implements IBinanceService {
  protected readonly client: MainClient;
  constructor() {
    this.client = new MainClient({
      baseUrl: 'https://api.binance.com', //Could be .env value
    });
  }

  async fetchKlines(args: KlinesParams): Promise<Kline[]> {
    return this.client
      .getKlines({
        symbol: args.symbol,
        interval: args.interval,
        startTime: args.startTime,
        endTime: args.endTime,
      })
      .catch((e) => {
        console.error(e); //I would create here a more generic request inteceptor for logging and error handling purpose
        return [];
      });
  }
}
