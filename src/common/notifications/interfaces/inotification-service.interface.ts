import { User } from '@core/users/user.model';

export interface INotificationService {
  sendNotification: (user: User, title: string, message: string) => void;
}
