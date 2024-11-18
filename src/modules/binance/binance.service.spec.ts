import { BinanceService } from './binance.service';
import { Test } from '@nestjs/testing';

describe('Binance service', () => {
  let binanceService: BinanceService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [BinanceService],
    }).compile();

    binanceService = moduleRef.get(BinanceService);
  });

  describe('fetchKlines', () => {
    it('should return klines data', async () => {
      expect(
        await binanceService.fetchKlines({
          symbol: 'BTCUSDT',
          interval: '1s',
        }),
      ).not.toBe([]);
    });
  });
});
