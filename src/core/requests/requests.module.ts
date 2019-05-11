import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestRepository } from './request.repository';
import { RequestAutomationService } from './request-automation/request-automation.service';
import { EventsModule } from '@core/events/events.module';
import { FirstMatchStrategy } from './request-automation/assign-strategies/first-match-strategy';
import { RequestService } from './request.service';
import { RequestNotificationStateFactory } from './request-notification-state/request-state.factory';

@Module({
  imports: [EventsModule],
  controllers: [RequestsController],
  providers: [
    RequestRepository,
    RequestAutomationService,
    { provide: 'ASSIGN_STRATEGY', useClass: FirstMatchStrategy },
    RequestService,
    RequestNotificationStateFactory,
  ],
})
export class RequestsModule {}
