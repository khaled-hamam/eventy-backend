import { Injectable, Inject, Scope } from '@nestjs/common';
import { User } from '@core/users/user.model';
import { INotificationService } from './interfaces/inotification-service.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class NotificationService implements INotificationService {
  private notificationStrategies: INotificationService[];

  public constructor(@Inject('DEFAULT_NOTIFICATION_STRATEGY') defaultStrategy: INotificationService) {
    this.notificationStrategies = [defaultStrategy];
  }

  public sendNotification(user: User, title: string, message: string) {
    this.notificationStrategies.forEach(strategy => strategy.sendNotification(user, title, message));
  }

  public addStrategy(notificationStrategy: INotificationService) {
    this.notificationStrategies.push(notificationStrategy);
  }

  public removeStrategy(notificationStrategy: INotificationService) {
    this.notificationStrategies = this.notificationStrategies.filter(
      strategy => strategy !== notificationStrategy,
    );
  }

  public clearStrategies() {
    this.notificationStrategies = [];
  }
}
