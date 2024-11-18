import { KlineInterval } from 'binance/lib/types/shared';
import { IsOptional, IsString } from 'class-validator';

export class AnalysisQueryParams {
  @IsString()
  symbol: string;

  @IsString()
  interval: KlineInterval;

  @IsString()
  @IsOptional()
  startTime?: number;

  @IsString()
  @IsOptional()
  endTime?: number;
}
