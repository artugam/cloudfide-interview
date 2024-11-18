import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BinanceService {
  constructor(private readonly httpService: HttpService) {}

  async fetchTrades(symbol = 'BTCUSDT') {
    return this.httpService.axiosRef
      .get(`/api/v3/trades?symbol=${symbol}`)
      .then((res) => res.data)
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }
}
