import { Event } from '@core/events/event.model';

export interface IUser {
  username: string;
  email: string;
  fullName?: string;
  password: string;
  mobile?: string;
  pictureURL?: string;
  events?: Event[];
}

export class User {
  public username: string;
  public email: string;
  public fullName: string;
  public password: string;
  public mobile: string;
  public pictureURL: string;
  public events: Event[];

  public constructor(data: IUser) {
    Object.assign(this, {
      username: '',
      email: '',
      fullName: '',
      password: '',
      mobile: '',
      pictureURL: '',
      events: [],
      ...data,
    });
  }
}
