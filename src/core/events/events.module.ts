import { EventRepository } from './event.repository';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { UsersModule } from '@core/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [EventsController],
  providers: [EventRepository],
  exports: [EventRepository],
})
export class EventsModule {}
