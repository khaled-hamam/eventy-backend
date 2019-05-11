import { Request } from '@core/requests/request.model';
import { User, IUser } from './user.model';

interface IEventPlanner extends IUser {
  rating?: number;
  ratingCount?: number;
  pendingRequests?: Request[];
}

export class EventPlanner extends User {
  public rating: number;
  public ratingCount: number;
  public pendingRequests: Request[];

  public constructor(data: IEventPlanner) {
    super(data);

    Object.assign(this, {
      rating: 0,
      ratingCount: 0,
      pendingRequests: [],
      ...data,
    });
  }
}
