import { User } from './../../users/user.model';

export class UserProfileDTO {
  public username: string;
  public email: string;
  public fullName: string;
  public mobile: string;
  public pictureURL: string;
  public events: Event[];
  public role: 'planner' | 'creator';

  public constructor(data: User) {
    Object.assign(this, {
      email: '',
      username: '',
      fullName: '',
      mobile: '',
      pictureURL: '',
      events: [],
      role: '',
      ...data,
    });
  }
}
