import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendGridMailAdapter } from './strategies/send-grid-mail.adapter';

@Module({
  providers: [
    NotificationService,
    { provide: 'DEFAULT_NOTIFICATION_STRATEGY', useClass: SendGridMailAdapter },
  ],
  exports: [NotificationService],
})
export class NotificationsModule {}
