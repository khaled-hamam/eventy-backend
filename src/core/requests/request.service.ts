import { Injectable, Inject } from '@nestjs/common';
import { NotificationService } from '@common/notifications/notification.service';
import { RequestManager } from '@common/mediators/request-manager.mediator';
import { RequestNotificationStateFactory } from './request-notification-state/request-state.factory';

@Injectable()
export class RequestService {
  constructor(
    @Inject('REQUEST_MANAGER') private readonly requestManager: RequestManager,
    private readonly notificationService: NotificationService,
    private readonly stateFactory: RequestNotificationStateFactory,
  ) {
    this.initSubscriptions();
  }

  private initSubscriptions() {
    const subscriptions = ['NEW_REQUEST', 'ACCEPTED_REQUEST'] as const;
    subscriptions.forEach(subscription => {
      this.requestManager.subscribe(
        subscription as typeof subscriptions[number],
        this.stateFactory.createState(subscription, this.notificationService).sendNotification,
      );
    });
  }
}
