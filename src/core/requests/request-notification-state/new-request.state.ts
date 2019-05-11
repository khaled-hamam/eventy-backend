import { NotificationService } from '@common/notifications/notification.service';
import { RequestNotificationState } from '../interfaces/request-notification-state.interface';
import { Request } from '../request.model';

export class NewRequestState implements RequestNotificationState {
  constructor(private notificationService: NotificationService) {
    this.sendNotification = this.sendNotification.bind(this);
  }

  sendNotification(request: Request) {
    this.notificationService.sendNotification(
      request.planner,
      'You Received a New Request!',
      'Congratulations, You received a new Event Request, go to EVENTY to check it now!',
    );
  }
}
