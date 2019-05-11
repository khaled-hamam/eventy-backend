import { Request } from '../request.model';

export interface RequestNotificationState {
  sendNotification(request: Request);
}
