import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  FetchHistoricalDataParams,
  IBinanceService,
} from './i.binance.service';

@Injectable()
export class BinanceService implements IBinanceService {
  constructor(private readonly httpService: HttpService) {}

  async fetchHistoricalData(args: FetchHistoricalDataParams): Promise<any> {
    const url = `/api/v3/klines?symbol=${args.symbol}&startTime=${args.startTime}&endTime=${args.endTime}&interval=${args.interval}`;

    return this.httpService.axiosRef
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        console.error(e); //TODO error handling
        throw e;
      });
  }
}
