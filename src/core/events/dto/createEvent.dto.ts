import { User } from '@core/users/user.model';
import { ILocation } from '@core/events/interfaces/ilocation';
import { EventOptions } from '../interfaces/eventOptions';

export class CreateEventDTO {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  public readonly date: Date;
  public readonly location: ILocation;
  public readonly type: string;
  public readonly budget: number;
  public readonly attendeesLimit: number;
  public readonly eventOptions: EventOptions[];
  public readonly creator: User;
}
