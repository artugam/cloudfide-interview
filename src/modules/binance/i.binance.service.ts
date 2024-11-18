export type FetchHistoricalDataParams = {
  symbol: string;
  startTime: number;
  endTime: number;
  interval:
    | '1s'
    | '1m'
    | '3m'
    | '5m'
    | ' 15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '6h'
    | '8h'
    | '12h'
    | 'd1'
    | '3d'
    | '1w'
    | '1M';
};

type KlineData = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
];

export type FetchHistoricalDataResponse = KlineData[][];

export interface IBinanceService {
  fetchHistoricalData(
    args: FetchHistoricalDataParams,
  ): Promise<FetchHistoricalDataResponse>;
}
