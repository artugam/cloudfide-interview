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

export interface IBinanceService {
  fetchHistoricalData(args: FetchHistoricalDataParams): Promise<any>; //TODO
}
