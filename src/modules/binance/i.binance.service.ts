import { Kline, KlinesParams } from 'binance/lib/types/shared';

export interface IBinanceService {
  fetchKlines(args: KlinesParams): Promise<Kline[]>;
}
