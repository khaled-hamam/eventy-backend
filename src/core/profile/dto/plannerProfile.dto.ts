import { EventPlanner } from '@core/users/planner.model';
import { UserProfileDTO } from './userProfile.dto';

export class PlannerProfileDTO extends UserProfileDTO {
  public rating?: number;
  public ratingCount?: number;
  public pendingRequests?: Request[];

  public constructor(data: EventPlanner) {
    super(data);
    Object.assign(this, {
      email: '',
      username: '',
      name: '',
      mobile: '',
      pictureURL: '',
      events: [],
      role: 'planner',
      rating: 0,
      ratingCount: 0,
      pendingRequests: [],
      ...data,
    });
  }
}
