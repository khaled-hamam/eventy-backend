import { User } from '@core/users/user.model';
import { EventPlanner } from '@core/users/planner.model';
import { ILocation } from '@core/events/interfaces/ilocation';
import { EventOptions } from './interfaces/eventOptions';

export interface IEvent {
  id?: number;
  name: string;
  description: string;
  date: Date;
  location: ILocation;
  type: string;
  budget: number;
  attendeesLimit: number;
  eventOptions: EventOptions[];
  creator?: User;
  planner?: EventPlanner;
  photosURL?: string[];
}

export class Event {
  public id: number;
  public name: string;
  public description: string;
  public date: Date;
  public location: ILocation;
  public type: string;
  public budget: number;
  public attendeesLimit: number;
  public eventOptions: EventOptions[];
  public creator: User;
  public planner: EventPlanner;
  public photosURL: string[];

  public constructor(data: IEvent) {
    Object.assign(this, {
      name: '',
      description: '',
      type: '',
      budget: 0,
      attendeesLimit: 0,
      eventOptions: [],
      photosURL: [],
      ...data,
    });
  }
}
