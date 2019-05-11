import { NotificationService } from '@common/notifications/notification.service';
import { RequestNotificationState } from '../interfaces/request-notification-state.interface';
import { Request } from '../request.model';

export class AcceptedRequestState implements RequestNotificationState {
  constructor(private notificationService: NotificationService) {
    this.sendNotification = this.sendNotification.bind(this);
  }

  sendNotification(request: Request) {
    this.notificationService.sendNotification(
      request.event.creator,
      'Your Event has been matched with a Planner!',
      'Congratulations, A planner has chosen your event to organize. Go check the event page now!',
    );
  }
}
