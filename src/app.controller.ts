import { Controller, Get, Query } from '@nestjs/common';
import { BinanceService } from './modules/binance/binance.service';
import Big from 'big.js';
import { AnalysisQueryParams } from './analysis.query-params';

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
    status: 'increase' | 'decrease' | 'same';
  };
};

@Controller()
export class AppController {
  constructor(protected readonly binanceService: BinanceService) {}

  @Get()
  async analyzePrice(
    @Query() query: AnalysisQueryParams,
  ): Promise<ResponseType> {
    const result = await this.binanceService.fetchKlines({
      symbol: query.symbol,
      startTime: query.startTime,
      endTime: query.endTime,
      interval: query.interval,
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
        status: new Big(firstPrice).eq(new Big(lastPrice))
          ? 'same'
          : new Big(firstPrice).gt(new Big(lastPrice))
            ? 'decrease'
            : 'increase', //or same?
      },
      items,
    };
  }
}
