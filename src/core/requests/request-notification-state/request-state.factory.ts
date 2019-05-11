import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationService } from '@common/notifications/notification.service';
import { RequestNotificationState } from '../interfaces/request-notification-state.interface';
import { NewRequestState } from './new-request.state';
import { AcceptedRequestState } from './accepted-request.state';

@Injectable()
export class RequestNotificationStateFactory {
  createState(type: string, notificationService: NotificationService): RequestNotificationState {
    switch (type) {
      case 'NEW_REQUEST':
        return new NewRequestState(notificationService);
      case 'ACCEPTED_REQUEST':
        return new AcceptedRequestState(notificationService);
      default:
        throw new NotFoundException('Request State not found.');
    }
  }
}
