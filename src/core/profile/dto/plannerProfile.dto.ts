import { EventPlanner } from '@core/users/planner.model';

export class UserProfileDTO {
  public username: string;
  public email: string;
  public name: string;
  public mobile: string;
  public pictureURL: string;
  public events: Event[];
  public role: 'planner' | 'creator';
  public rating?: number;
  public pendingRequests?: Request[];

  public constructor(data: EventPlanner) {
    Object.assign(this, {
      email: '',
      username: '',
      name: '',
      mobile: '',
      pictureURL: '',
      events: [],
      role: '',
      rating: '',
      pendingRequests: [],
      ...data,
    });
  }
}
