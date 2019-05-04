import { User } from '@core/users/user.model';
import { ILocation } from '@core/events/interfaces/ilocation';
import { EventOptions } from '../interfaces/eventOptions';
import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateEventDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @IsDate()
  @IsNotEmpty()
  public readonly date: Date;

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
