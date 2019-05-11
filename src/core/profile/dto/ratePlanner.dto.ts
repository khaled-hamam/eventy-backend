import { IsNumber, IsNotEmpty } from 'class-validator';

export class RatePlannerDTO {
  @IsNumber()
  @IsNotEmpty()
  public newRate: number;
}
