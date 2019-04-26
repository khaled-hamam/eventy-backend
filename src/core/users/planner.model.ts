import { Request } from '@core/requests/request.model';
import { User, IUser } from './user.model';

interface IEventPlanner extends IUser {
  rating?: number;
  pendingRequests?: Request[];
}

export class EventPlanner extends User {
  public rating: number;
  public pendingRequests: Request[];

  public constructor(data: IEventPlanner) {
    super(data);

    Object.assign(this, {
      rating: 0,
      pendingRequests: [],
      ...data,
    });
  }
}
