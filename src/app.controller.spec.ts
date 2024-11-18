import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { BinanceService } from './modules/binance/binance.service';
import { Kline } from 'binance/lib/types/shared';

describe('AppController test', () => {
  let appController: AppController;
  let binanceService: BinanceService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [BinanceService],
    }).compile();

    binanceService = moduleRef.get(BinanceService);
    appController = moduleRef.get(AppController);
  });

  describe('analyzePrice', () => {
    it('should return analysed prices', async () => {
      const callResult: Kline[] = [
        [
          1730419200000,
          '70292.01000000',
          '71632.95000000',
          '68820.14000000',
          '69496.01000000',
          '38301.86755000',
          1730505599999,
          '2677358022.00497000',
          4569271,
          '18044.16220000',
          '1261663986.75969040',
          '0',
        ],
        [
          1730505600000,
          '69496.00000000',
          '69914.37000000',
          '69000.14000000',
          '69374.74000000',
          '10521.67243000',
          1730591999999,
          '731232427.63115480',
          1603561,
          '5227.50713000',
          '363370734.81580110',
          '0',
        ],
        [
          1730592000000,
          '69374.74000000',
          '69391.00000000',
          '67478.73000000',
          '68775.99000000',
          '24995.70243000',
          1730678399999,
          '1709666206.40620230',
          3668029,
          '12277.58177000',
          '839939073.13895770',
          '0',
        ],
      ];

      const toBe = {
        summary: {
          firstClosePrice: '38301.86755000',
          lastClosePrice: '24995.70243000',
          lowestClosePrice: '10521.67243000',
          highestClosePrice: '38301.86755000',
          status: 'decrease',
        },
        items: [
          {
            date: new Date(1730419200000).toISOString(),
            closePrice: '38301.86755000',
          },
          {
            date: new Date(1730505600000).toISOString(),
            closePrice: '10521.67243000',
          },
          {
            date: new Date(1730592000000).toISOString(),
            closePrice: '24995.70243000',
          },
        ],
      };

      jest
        .spyOn(binanceService, 'fetchKlines')
        .mockImplementation(() => Promise.resolve(callResult));

      expect(
        await appController.analyzePrice({
          symbol: 'BTCUSDT',
          interval: '1s',
        }),
      ).toEqual(toBe);
    });
  });
});
