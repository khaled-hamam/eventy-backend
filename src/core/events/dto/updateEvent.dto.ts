import { ILocation } from '@core/events/interfaces/ilocation';
import { EventOptions } from '../interfaces/eventOptions';

export class UpdateEventDTO {
  public readonly name: string;
  public readonly description: string;
  public readonly location: ILocation;
  public readonly type: string;
  public readonly budget: number;
  public readonly attendeesLimit: number;
  public readonly eventOptions: EventOptions[];
}
