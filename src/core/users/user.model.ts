import { Event } from '@core/events/event.model';

export interface IUser {
  email: string;
  name?: string;
  password: string;
  mobile?: string;
  pictureURL?: string;
  events?: Event[];
}

export class User {
  public email: string;
  public name: string;
  public password: string;
  public mobile: string;
  public pictureURL: string;
  public events: Event[];

  public constructor(data: IUser) {
    Object.assign(this, {
      email: '',
      name: '',
      password: '',
      mobile: '',
      pictureURL: '',
      events: [],
      ...data,
    });
  }
}
