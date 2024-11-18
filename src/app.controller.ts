import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './modules/binance/binance.service';
import Big from 'big.js';

type ResponseType = {
  items: Array<{
    date: string;
    closePrice: string;
  }>;
  summary?: {
    firstClosePrice: string;
    lastClosePrice: string;
    lowestClosePrice: string;
    highestClosePrice: string;
    status: 'increase' | 'decrease';
  };
};

@Controller()
export class AppController {
  constructor(protected readonly binanceService: BinanceService) {}

  @Get()
  async analyzePrice(): Promise<ResponseType> {
    const result = await this.binanceService.fetchKlines({
      symbol: 'BTCUSDT',
      startTime: 1730419200000,
      endTime: 1731801600000,
      interval: '1h',
    });
    if (!result.length) {
      return {
        items: [],
      };
    }

    const closePriceIndex = 5;
    const timestampIndex = 0;

    const items: ResponseType['items'] = [];
    let lowestClosePrice: Big = new Big(Number.MAX_VALUE);
    let highestClosePrice: Big = new Big(Number.MIN_VALUE);
    const firstPrice = result.at(0).at(closePriceIndex);
    const lastPrice = result.at(-1).at(closePriceIndex);

    for (const item of result) {
      const date = new Date(item.at(timestampIndex));
      const closePrice = item.at(closePriceIndex);
      const bigClosePrice = new Big(closePrice);
      items.push({
        date: date.toISOString(),
        closePrice: String(closePrice),
      });

      if (bigClosePrice.gt(highestClosePrice)) {
        highestClosePrice = bigClosePrice;
      }
      if (bigClosePrice.lt(lowestClosePrice)) {
        lowestClosePrice = bigClosePrice;
      }
    }

    return {
      summary: {
        firstClosePrice: String(firstPrice),
        lastClosePrice: String(lastPrice),
        lowestClosePrice: lowestClosePrice.toString(),
        highestClosePrice: highestClosePrice.toString(),
        status: new Big(firstPrice).gt(new Big(lastPrice))
          ? 'decrease'
          : 'increase', //or same?
      },
      items,
    };
  }
}
