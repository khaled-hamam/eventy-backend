import * as sendGrid from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { User } from '@core/users/user.model';
import { config } from '@config/sendgrid.config';
import { INotificationService } from '../interfaces/inotification-service.interface';

@Injectable()
export class SendGridMailAdapter implements INotificationService {
  sendNotification(user: User, title: string, message: string) {
    sendGrid.send({
      to: user.email,
      from: config.from,
      subject: title,
      text: message,
    });
  }
}
