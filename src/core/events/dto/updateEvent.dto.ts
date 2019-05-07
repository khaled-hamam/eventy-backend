import { ILocation } from '@core/events/interfaces/ilocation';
import { EventOptions } from '../interfaces/eventOptions';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEventDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @IsNotEmpty()
  public readonly location: ILocation;

  @IsString()
  @IsNotEmpty()
  public readonly type: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly budget: number;

  @IsNumber()
  @IsNotEmpty()
  public readonly attendeesLimit: number;

  public readonly eventOptions: EventOptions[];
}
